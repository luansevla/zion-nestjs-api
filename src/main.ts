import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// 1. Mudamos para exportar a função bootstrap ou o app
export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Resolve o erro de rede local
  app.useGlobalPipes(new ValidationPipe());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Zion API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 2. Se não estiver em produção (Vercel), roda o listen
  if (process.env.NODE_ENV !== 'production') {
    await app.listen(process.env.PORT || 4000);
  } else {
    // Na Vercel, apenas inicializamos e retornamos a instância do Express
    await app.init();
    return app.getHttpAdapter().getInstance();
  }
}

// 3. O Pulo do Gato: Exportar para a Vercel encontrar o módulo
const server = bootstrap();
export default server;