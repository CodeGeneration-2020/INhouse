import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import fastifyMulipart from 'fastify-multipart';

import { AppModule } from './app.module';

const run = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);

  app.enableCors();

  app.enableShutdownHooks();

  app.register(fastifyMulipart);

  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get<string>('PORT');
  const address = configService.get<string>('ADDRESS');

  await app.listen(port, address);
};

run().catch((error) => {
  console.error(error);

  process.exit(-1);
});
