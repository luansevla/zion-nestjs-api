import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '982d1bd5578c8ec72ae5672470fc683fde3d906630f85e8a4b7b2ddafd6f888d',
    });
  }

  async validate(payload: any) {
    // O que for retornado aqui será anexado ao objeto req.user
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}