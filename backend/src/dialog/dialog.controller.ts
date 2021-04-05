import {
  Body,
  Post,
  Query,
  UseGuards,
  Controller,
  UseInterceptors,
} from '@nestjs/common';

import { ParserService } from 'src/parser/parser.service';
import { TextAnalyzerService } from 'src/text-analyzer/text-analyzer.service';

import { MultipartFile } from 'src/shared/types';
import { File } from 'src/shared/decorators/file.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { MultipartGuard } from 'src/shared/guards/multipart.guard';
import { FilesInterceptor } from 'src/shared/interceptors/files.interceptor';

import { Dialog } from './types';

import { DialogService } from './dialog.service';

import { CreateOneDto } from './dto/create-one.dto';
import { CreateManyDto } from './dto/create-many.dto';
import { FindOneDto } from './dto/find-one.dto';
import { FindManyDto } from './dto/find-many.dto';
import { CreateManyWithTextDto } from './dto/create-many-with-text.dto';
import { CreateManyWithPdfDto } from './dto/create-many-with-pdf.dto';

@Controller('dialog')
export class DialogController {
  constructor(
    private dialogService: DialogService,
    private parserService: ParserService,
    private textAnalyzerService: TextAnalyzerService,
  ) {}

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

  @Post('create-many-with-text')
  @UseGuards(JwtAuthGuard)
  async createManyWithText(
    @Body()
    { relatedTo, text }: CreateManyWithTextDto,
  ) {
    const dialogs: Dialog[] = [];

    const alanyzedDialogs = await this.textAnalyzerService.analyze(text);

    // TODO: move to mapper
    for (const analyzedDialog of alanyzedDialogs) {
      const dialog: Dialog = {
        relatedTo,

        ...analyzedDialog,
      };

      dialogs.push(dialog);
    }

    return this.dialogService.createMany(dialogs);
  }

  @Post('create-many-with-pdf')
  @UseGuards(JwtAuthGuard, MultipartGuard)
  @UseInterceptors(FilesInterceptor)
  async createManyWithPdf(
    @Query()
    { relatedTo }: CreateManyWithPdfDto,

    @File('file')
    file: MultipartFile,
  ) {
    const buffer = await file.toBuffer();

    const articles = await this.parserService.parseArticles(buffer);

    const dialogs: Dialog[] = [];

    for (const { content } of articles) {
      const alanyzedDialogs = await this.textAnalyzerService.analyze(content);

      // TODO: move to mapper
      for (const analyzedDialog of alanyzedDialogs) {
        const dialog: Dialog = {
          relatedTo,

          ...analyzedDialog,
        };

        dialogs.push(dialog);
      }
    }

    return this.dialogService.createMany(dialogs);
  }
}
