import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { kFiles } from '../constants';

import { Request } from '../types';

@Injectable()
export class FilesInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>();

    const file = await request.file();

    if (file === undefined) {
      throw new BadRequestException('files expected');
    }

    request[kFiles] = file.fields as any;

    return next.handle();
  }
}
