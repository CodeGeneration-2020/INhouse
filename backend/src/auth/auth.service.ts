import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { UserService } from 'src/user/user.service';

import { ValidateCredentialsOptions, LoginOptions } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateCredentials({
    username,
    password,
  }: ValidateCredentialsOptions) {
    const user = await this.userService.findOne({ username });

    if (!user) {
      return null;
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
      return null;
    }

    return user;
  }

  async login({ user }: LoginOptions) {
    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
