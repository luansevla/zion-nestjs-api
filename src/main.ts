import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));


  const config = new DocumentBuilder()
    .setTitle('Zion NestJS API')
    .setDescription('Documentação da API de endereços - O Alvo')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  const port = 3000;
  await app.listen(port);

  console.log(`🚀 API rodando em: http://localhost:${port}/api/v1`);
  console.log(`📄 Documentação em: http://localhost:${port}/docs`);
}
bootstrap();