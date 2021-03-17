import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { UserDocument } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne({ username });

    if (!user) {
      return null;
    }

    // TODO: use bcrypt for salt passwords
    if (user.password !== password) {
      return null;
    }

    return user;
  }

  async login(user: UserDocument) {
    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
