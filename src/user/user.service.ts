import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;

    // Verifica se e-mail já existe
    const userExists = await this.userModel.findOne({ email });
    if (userExists) throw new ConflictException('E-mail já cadastrado');

    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
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