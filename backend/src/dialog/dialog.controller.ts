import {
  Body,
  Post,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
  UseInterceptors,
} from '@nestjs/common';

import { Dialog } from './types';
import { parseArticles } from './utils/pdf-parser.util';

import { DialogService } from './dialog/dialog.service';
import { TextAnalyzerService } from './text-analyzer/text-analyzer.service';

import { GetAnswerDto } from './dto/get-answer.dto';

import { File } from '../shared/decorators/file.decorator';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { MultipartFile } from '../shared/types';
import { MultipartGuard } from '../shared/guards/multipart.guard';
import { FilesInterceptor } from '../shared/interceptors/files.interceptor';

@Controller('dialog')
export class DialogController {
  constructor(
    private dialogService: DialogService,
    private textAnalyzerService: TextAnalyzerService,
  ) {}

  @Post('get')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  getAnswer(@Body() getAnswerDto: GetAnswerDto) {
    return this.dialogService.get(getAnswerDto);
  }

  @Post('get-all')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  getAll(@Body() params: any) {
    return this.dialogService.getAll(params);
  }

  @Post('upload-with-pdf')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @UseGuards(MultipartGuard)
  @UseInterceptors(FilesInterceptor)
  async uploadWithPdf(@File('input') input: MultipartFile) {
    const pdfBuffer = await input.toBuffer();

    const articles = await parseArticles(pdfBuffer);

    const dialogs: Dialog[] = [];

    for (const article of articles) {
      const newDialogs = await this.textAnalyzerService.analyze({
        text: article.content,
      });

      dialogs.push(...newDialogs);
    }

    if (dialogs.length === 0) {
      return [];
    }

    return this.dialogService.upload({ dialogs });
  }
}
