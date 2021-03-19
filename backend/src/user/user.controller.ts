import {
  Body,
  Post,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserDocument } from './schemas/user.schema';

import { GetUserDto } from './dto/get-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { GetAllUsersDto } from './dto/get-all-users.dto';

import { User } from '../shared/decorators/user.decorator';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../shared/guards/local-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Post('get')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  get(@Body() getUserDto: GetUserDto, @User() user: UserDocument) {
    return this.userService.get({
      id: getUserDto?.id ?? user.id,
    });
  }

  @Post('get-all')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  getAll(@Body() getAllUsersDto: GetAllUsersDto) {
    return this.userService.getAll(getAllUsersDto);
  }

  @Post('edit')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  edit(@Body() editUserDto: EditUserDto) {
    return this.userService.edit(editUserDto);
  }

  @Post('delete')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  delete(@Body() deleteUserDto: DeleteUserDto) {
    return this.userService.delete(deleteUserDto);
  }
}
