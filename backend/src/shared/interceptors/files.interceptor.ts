import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { FastifyRequest } from 'fastify';

export const kFiles = Symbol('files');

@Injectable()
export class FilesInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const file = await request.file();

    if (file === undefined) {
      throw new BadRequestException('files expected');
    }

    request[kFiles] = file.fields;

    return next.handle();
  }
}
