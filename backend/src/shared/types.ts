import { Multipart } from 'fastify-multipart';
import { FastifyRequest } from 'fastify';

import { UserDocument } from '../user/schemas/user.schema';

import { kFiles } from './constants';

export type MultipartFile = Multipart;

export type MultipartFiles = Record<string, MultipartFile>;

export interface Request extends FastifyRequest {
  [kFiles]: MultipartFiles;

  user: UserDocument;
}
