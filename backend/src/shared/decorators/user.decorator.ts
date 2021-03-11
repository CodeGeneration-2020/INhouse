import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { Request } from '../types';

export const User = createParamDecorator(
  (field: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    return request.user;
  },
);
