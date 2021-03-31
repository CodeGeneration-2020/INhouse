import { Req, Body, Post, UseGuards, Controller } from '@nestjs/common';

import { UserService } from 'src/user/user.service';

import { Request } from 'src/shared/types';
import { LocalAuthGuard } from 'src/shared/guards/local-auth.guard';

import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.userService.create(body);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() { user }: Request) {
    return this.authService.login({ user });
  }
}
