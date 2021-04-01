import { Req, Body, Post, UseGuards, Controller } from '@nestjs/common';

import { Request } from 'src/shared/types';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

import { UserService } from './user.service';

import { CreateDto } from './dto/create.dto';
import { GetDto } from './dto/get.dto';
import { GetAllDto } from './dto/get-all.dto';
import { EditDto } from './dto/edit.dto';
import { DeleteDto } from './dto/delete.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  create(@Body() body: CreateDto) {
    return this.userService.create(body);
  }

  @Post('get')
  @UseGuards(JwtAuthGuard)
  get(@Req() { user }: Request, @Body() body: GetDto) {
    const id = body?.id ?? user.id;

    return this.userService.get({ id });
  }

  @Post('get-all')
  @UseGuards(JwtAuthGuard)
  getAll(@Body() body: GetAllDto) {
    return this.userService.getAll(body);
  }

  @Post('edit')
  @UseGuards(JwtAuthGuard)
  edit(@Body() body: EditDto) {
    return this.userService.edit(body);
  }

  @Post('delete')
  @UseGuards(JwtAuthGuard)
  delete(@Body() body: DeleteDto) {
    return this.userService.delete(body);
  }
}
