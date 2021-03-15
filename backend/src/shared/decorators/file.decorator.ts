import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { kFiles } from '../constants';

import { Request } from '../types';

export const File = createParamDecorator(
  (field: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();

    const files = request[kFiles];

    return files[field];
  },
);
