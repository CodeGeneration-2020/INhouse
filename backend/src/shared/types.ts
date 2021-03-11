import { FastifyRequest } from 'fastify';

export interface UserBody {
  id: string;
  username: string;
}

export interface Request extends FastifyRequest {
  user: UserBody;
}
