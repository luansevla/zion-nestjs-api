
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Realizar login e obter token JWT' })
  signIn(@Body() createAuthDto: CreateAuthDto) { // Use o DTO aqui
    return this.authService.signIn(createAuthDto.email, createAuthDto.password);
  }
}
