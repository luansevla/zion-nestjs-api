import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'O Alvo - Quem não passa pelo processo jamais terá acesso ao regresso!';
  }
}
