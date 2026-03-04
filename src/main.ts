import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// 1. Transformamos em uma função que retorna a instância do servidor
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Resolve o bloqueio do Postman
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Zion API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 2. Condicional para rodar localmente no seu Windows
  if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    await app.listen(port);
  } else {
    // 3. Essencial para a Vercel: inicializa sem travar a porta e exporta o Express
    await app.init();
    return app.getHttpAdapter().getInstance();
  }
}

// 4. Exportamos a execução para que a Vercel encontre o "handler"
export default bootstrap();