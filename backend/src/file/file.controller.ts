import { Res, Get, Query, UseGuards, Controller } from '@nestjs/common';

import { Response } from 'src/shared/types';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

import { FileService } from './file.service';

import { DownloadDto } from './dto/download.dto';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Get('download')
  @UseGuards(JwtAuthGuard)
  async download(@Query() { id }: DownloadDto, @Res() res: Response) {
    const { file, stream } = await this.fileService.download({ id });

    res.type(file.contentType);

    res.header(
      'Content-Disposition',
      `attachment; filename="${file.filename}"`,
    );

    res.send(stream);
  }
}
