import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { FastifyRequest } from 'fastify';

@Injectable()
export class MultipartGuard implements CanActivate {
  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const isMultipart = request.isMultipart();

    if (!isMultipart) {
      throw new BadRequestException('multipart/form-data expected');
    }

    return true;
  }
}
