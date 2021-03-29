import { Readable } from 'stream';

import { Multipart } from 'fastify-multipart';
import { FastifyRequest, FastifyReply } from 'fastify';

import { UserDocument } from '../user/schemas/user.schema';

import { kFiles } from './constants';

export type MultipartFile = Multipart<true> & {
  file: Readable;
};

export type MultipartFiles = Record<string, MultipartFile>;

export interface Request extends FastifyRequest {
  [kFiles]: MultipartFiles;

  user: UserDocument;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Response extends FastifyReply {}
