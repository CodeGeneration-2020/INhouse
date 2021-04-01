import {
  Type,
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';

import { map } from 'rxjs/operators';

import { plainToClass, ClassTransformOptions } from 'class-transformer';

import { Request } from '../types';

@Injectable()
export class SerializeInterceptor<T> implements NestInterceptor<T, T> {
  constructor(
    private cls: Type<T>,
    private options: ClassTransformOptions = {},
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler<T>) {
    const { user } = context.switchToHttp().getRequest<Request>();

    const options: ClassTransformOptions = {
      ...this.options,

      groups: [user.role],
      excludeExtraneousValues: true,
    };

    return next.handle().pipe(
      map((value) => {
        return plainToClass(this.cls, value, options);
      }),
    );
  }
}
