import { Post, UseGuards, Controller, UseInterceptors } from '@nestjs/common';

import { MultipartFile } from 'src/shared/types';
import { File } from 'src/shared/decorators/file.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { MultipartGuard } from 'src/shared/guards/multipart.guard';
import { FilesInterceptor } from 'src/shared/interceptors/files.interceptor';

import { ParserService } from './parser.service';

@Controller('parser')
export class ParserController {
  constructor(private parserService: ParserService) {}

  @Post('parse-articles')
  @UseGuards(JwtAuthGuard, MultipartGuard)
  @UseInterceptors(FilesInterceptor)
  async pdf(@File('file') file: MultipartFile) {
    const buffer = await file.toBuffer();

    return this.parserService.parseArticles(buffer);
  }
}
