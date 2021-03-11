import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { kFiles } from '../constants';

import { Request } from '../types';

export const File = createParamDecorator(
  (field: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const files = request[kFiles];

    return files[field];
  },
);
