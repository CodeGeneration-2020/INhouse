import {
  Req,
  Body,
  Post,
  UseGuards,
  Controller,
  UseInterceptors,
  ForbiddenException,
} from '@nestjs/common';

import { Request } from 'src/shared/types';
import { Role } from 'src/shared/role.enum';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { SerializeInterceptor } from 'src/shared/interceptors/serialize.interceptor';

import { UserService } from './user.service';
import { User } from './schemas/user.schema';

import { CreateDto } from './dto/create.dto';
import { GetDto } from './dto/get.dto';
import { GetAllDto } from './dto/get-all.dto';
import { EditDto } from './dto/edit.dto';
import { DeleteDto } from './dto/delete.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  @Roles([Role.ADMIN])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(new SerializeInterceptor(User))
  create(@Body() body: CreateDto) {
    return this.userService.create(body);
  }

  @Post('get')
  @Roles([Role.ADMIN, Role.PRE, Role.SDRE])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(new SerializeInterceptor(User))
  get(@Req() { user }: Request, @Body() body: GetDto) {
    if (body?.id !== undefined && user.role !== Role.ADMIN) {
      throw new ForbiddenException();
    }

    const id = body?.id ?? user.id;

    return this.userService.get({ id });
  }

  @Post('get-all')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new SerializeInterceptor(User))
  getAll(@Body() body: GetAllDto) {
    return this.userService.getAll(body);
  }

  @Post('edit')
  @Roles([Role.ADMIN])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(new SerializeInterceptor(User))
  edit(@Body() body: EditDto) {
    return this.userService.edit(body);
  }

  @Post('delete')
  @Roles([Role.ADMIN])
  @UseGuards(JwtAuthGuard, RoleGuard)
  delete(@Body() body: DeleteDto) {
    return this.userService.delete(body);
  }
}
