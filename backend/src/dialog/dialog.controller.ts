import { Body, Post, UseGuards, Controller } from '@nestjs/common';

import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

import { DialogService } from './dialog.service';

import { CreateOneDto } from './dto/create-one.dto';
import { CreateManyDto } from './dto/create-many.dto';
import { FindOneDto } from './dto/find-one.dto';
import { FindManyDto } from './dto/find-many.dto';

@Controller('dialog')
export class DialogController {
  constructor(private dialogService: DialogService) {}

  @Post('create-one')
  @UseGuards(JwtAuthGuard)
  createOne(@Body() { dialog }: CreateOneDto) {
    return this.dialogService.createOne(dialog);
  }

  @Post('create-many')
  @UseGuards(JwtAuthGuard)
  createMany(@Body() { dialogs }: CreateManyDto) {
    return this.dialogService.createMany(dialogs);
  }

  @Post('find-one')
  @UseGuards(JwtAuthGuard)
  findOne(@Body() body: FindOneDto) {
    return this.dialogService.findOne(body);
  }

  @Post('find-many')
  @UseGuards(JwtAuthGuard)
  findMany(@Body() body: FindManyDto) {
    return this.dialogService.findMany(body);
  }
}
