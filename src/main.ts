import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  // Se crea una instancia de la aplicación de Nest (con plataforma express) y se
  // activa la protección CORS
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  // Se setea el validationPipe para poder hacer validaciones dentro de los dto
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Se lanza la aplicación en el puerto 3000
  await app.listen(3000);
}
bootstrap();
