
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ user_id: string; access_token: string , username: string, email: string}> {
    const user = await this.userService.findOneByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.name, email: user.email };
    return {
      user_id: payload.sub,
      username: payload.username,
      email: payload.email,
      access_token: this.jwtService.sign(payload),
    };
  }
}
