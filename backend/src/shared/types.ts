import { FastifyRequest } from 'fastify';
import { MultipartFields } from 'fastify-multipart';

import { UserDocument } from '../user/schemas/user.schema';

import { kFiles } from './constants';

export interface Request extends FastifyRequest {
  [kFiles]: MultipartFields;

  user: UserDocument;
}
