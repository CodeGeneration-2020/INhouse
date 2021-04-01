import { Req, Body, Post, UseGuards, Controller } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user.schema';

import { Request } from 'src/shared/types';
import { LocalAuthGuard } from 'src/shared/guards/local-auth.guard';

import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';
import { plainToClass } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const user = await this.userService.create(body);

    return plainToClass(User, user, {
      groups: [user.role],
      excludeExtraneousValues: true,
    });
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() { user }: Request) {
    return this.authService.login({ user });
  }
}
