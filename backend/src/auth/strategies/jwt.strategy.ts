import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '../../user/user.service';

export interface JwtPayload {
  sub: string;
  username: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private userService: UserService;

  constructor(configService: ConfigService, userService: UserService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });

    this.userService = userService;
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOne(payload.username);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
