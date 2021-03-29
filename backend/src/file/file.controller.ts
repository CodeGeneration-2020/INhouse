import {
  Res,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
} from '@nestjs/common';

import { FileService } from './file.service';

import { DownloadDto } from './dto/download.dto';

import { Response } from '../shared/types';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('download')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async download(@Res() res: Response, @Body() { id }: DownloadDto) {
    const { file, stream } = await this.fileService.download({ id });

    res.type(file.contentType).send(stream);
  }
}
