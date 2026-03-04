import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilita o CORS para que o Postman e o seu Frontend funcionem
  app.enableCors();
  
  // Configuração global de validação (importante para o DTO de OTP)
  app.useGlobalPipes(new ValidationPipe());

  // O SEGREDO: Só chama o listen se não estiver na Vercel
  if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
  } else {
    // Na Vercel, apenas inicializamos a aplicação
    await app.init();
  }
}

bootstrap();