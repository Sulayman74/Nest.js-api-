import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

/**
 * Fonction asynchrone qui permet de créer et de démarrer une application NestJS
 * qui utilise des pipelines de validation.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
 * Utilise la classe ValidationPipe pour valider les données entrantes.
 * @param {ValidationPipe} ValidationPipe La classe ValidationPipe.
 */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  await app.listen(9090);
}
bootstrap();
