import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { FastifyRequest } from 'fastify';

import { kFiles } from '../interceptors/files.interceptor';

export const File = createParamDecorator(
  (field: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();

    const files = request[kFiles];

    return files[field];
  },
);
