import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { Request } from '../types';

import { kFiles } from '../constants';

export const File = createParamDecorator(
  (field: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();

    const files = request[kFiles];

    return files[field];
  },
);
