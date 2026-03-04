import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilita o CORS para que o Postman e o seu Frontend funcionem
  app.enableCors();
  
 
  
  const config = new DocumentBuilder()
    .setTitle('Zion API')
    .setDescription('Documentação da API Zion - Fluxo de Recuperação de Senha')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Acesse via /api/docs

  app.useGlobalPipes(new ValidationPipe());

  // O SEGREDO: Só chama o listen se não estiver na Vercel
  if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 4000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
  } else {
    // Na Vercel, apenas inicializamos a aplicação
    await app.init();
  }
}

bootstrap();