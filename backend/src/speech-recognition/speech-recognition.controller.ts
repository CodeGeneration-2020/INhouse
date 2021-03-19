import {
  Post,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';

import { SpeechRecognitionService } from './speech-recognition.service';

import { File } from '../shared/decorators/file.decorator';
import { MultipartFile } from '../shared/types';
import { MultipartGuard } from '../shared/guards/multipart.guard';
import { FilesInterceptor } from '../shared/interceptors/files.interceptor';

@Controller('speech-recognition')
export class SpeechRecognitionController {
  constructor(
    private readonly speechRecognitionService: SpeechRecognitionService,
  ) {}

  @Post('recognize')
  @HttpCode(HttpStatus.OK)
  @UseGuards(MultipartGuard)
  @UseInterceptors(FilesInterceptor)
  async recognize(@File('input') input: MultipartFile) {
    const text = await this.speechRecognitionService.recognize(input.file);

    return { text };
  }
}
