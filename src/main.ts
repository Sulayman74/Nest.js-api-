import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { ValidationPipe } from '@nestjs/common';

const PORT = 9090
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

  const { httpAdapter } = app.get(HttpAdapterHost);
  +  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  await app.listen(PORT, () => {
    console.log('the server is running on port : ' + '' + PORT);
  });
}
bootstrap();
