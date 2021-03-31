import { UserDocument } from 'src/user/schemas/user.schema';

export interface JwtPayload {
  sub: string;
  username: string;
  iat: number;
  exp: number;
}

export interface ValidateCredentialsOptions {
  username: string;
  password: string;
}

export interface LoginOptions {
  user: UserDocument;
}
