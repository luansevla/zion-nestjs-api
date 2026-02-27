
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ user_id: string; access_token: string, username: string, email: string }> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (!user.status) {
      throw new UnauthorizedException('Por favor, confirme seu e-mail antes de fazer login.');
    }

    const payload = { sub: user._id.toString(), username: user.name, email: user.email };
    return {
      user_id: payload.sub,
      username: payload.username,
      email: payload.email,
      access_token: this.jwtService.sign(payload),
    };
  }
}
