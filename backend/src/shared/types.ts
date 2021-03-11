import { FastifyRequest } from 'fastify';
import { MultipartFields } from 'fastify-multipart';

import { kFiles } from './constants';

export interface UserBody {
  id: string;
  username: string;
}

export interface Request extends FastifyRequest {
  [kFiles]: MultipartFields;

  user: UserBody;
}
