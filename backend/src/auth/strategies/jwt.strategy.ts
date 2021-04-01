import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from 'src/user/user.service';

import { JwtPayload } from '../auth.types';

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
    const user = await this.userService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
