/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/delivery';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 5555;
  await app.listen(port);
  Logger.log(
    `🚀 Delivery API is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
