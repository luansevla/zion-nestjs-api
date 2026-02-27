import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { info } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly mailerService: MailerService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const userExists = await this.userModel.findOne({ email });
    if (userExists) throw new ConflictException('E-mail já cadastrado');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const createdUser = new this.userModel({
      ...createUserDto,
      otp: otp,
      status: false,
      password: hashedPassword,
    });

    this.sendVerificationEmail(createdUser.email, createdUser.name, otp);

    console.log('ID gerado pelo Mongoose:', createdUser._id);

    try {
      return await createdUser.save();
    } catch (error) {
      console.error('Erro detalhado do Mongoose:', error);
      throw error;
    }
  }

  private async sendVerificationEmail(email: string, name: string, otp: string) {

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Bem-vindo ao APP do Alvo! Confirme seu e-mail',
        html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Olá, ${name}!</h2>
          <p>Seu código de verificação para validar seu e-mail é:</p>
          <h1 style="color: #4A90E2; letter-spacing: 5px;">${otp}</h1>
          <p><b>Insira este código no aplicativo para confirmar sua conta e aproveite!</b></p>
        </div>
      `,
      });

      console.log('E-mail enviado com sucesso!')

    } catch (error) {
      console.error('Falha ao enviar e-mail:', error);
    }
  }

  async activateUser(email: string, otp: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (user.status) {
      return { message: 'Este usuário já está ativo.' };
    }

    if (user.otp !== otp) {
      throw new UnauthorizedException('Código de verificação inválido.');
    }

    user.status = true;
    user.otp = "";
    await user.save();

    return {
      message: 'Conta ativada com sucesso! Você já pode realizar o login.',
    };
  }

  async findAll(): Promise<User[]> {
    return this.userModel
      .find()
      .populate('cell', 'name area')
      .populate('leader', 'name email')
      .exec();
  }

  async findOneByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel
      .findOne({ email })
      .select('+password') // O '+' força o Mongoose a trazer a senha apenas nesta consulta
      .exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel
      .findById(id)
      .populate('cell leader')
      .exec();
    if (!user) throw new NotFoundException(`Usuário ${id} não encontrado`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updated = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Usuário ${id} não encontrado`);
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.userModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Usuário ${id} não encontrado`);
    return { message: 'Usuário removido com sucesso' };
  }
}