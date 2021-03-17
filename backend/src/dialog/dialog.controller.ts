import {
  Body,
  Post,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';

import { DialogService } from './dialog.service';

import { GetAnswerDto } from './dto/get-answer.dto';

import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';

@Controller('dialog')
export class DialogController {
  constructor(private dialogService: DialogService) {}

  @Post('get-answer')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  getAnswer(@Body() getAnswerDto: GetAnswerDto) {
    return this.dialogService.getAnswer(getAnswerDto);
  }
}
