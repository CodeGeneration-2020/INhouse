import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { Request } from '../types';

export const User = createParamDecorator(
  (field: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();

    return request.user;
  },
);
