import { NestFactory } from '@nestjs/core';
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

  app.register(fastifyMulipart);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
};

run().catch((error) => {
  console.error(error);

  process.exit(-1);
});
