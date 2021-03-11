import { Post, UseGuards, Controller, UseInterceptors } from '@nestjs/common';

import { Multipart } from 'fastify-multipart';

import { SpeechRecognitionService } from './speech-recognition.service';

import { File } from '../shared/decorators/file.decorator';
import { MultipartGuard } from '../shared/guards/multipart.guard';
import { FilesInterceptor } from '../shared/interceptors/files.interceptor';

@Controller('speech-recognition')
export class SpeechRecognitionController {
  constructor(
    private readonly speechRecognitionService: SpeechRecognitionService,
  ) {}

  @Post('recognize')
  @UseGuards(MultipartGuard)
  @UseInterceptors(FilesInterceptor)
  async recognize(@File('input') input: Multipart) {
    const text = await this.speechRecognitionService.recognize(input.file);

    return { text };
  }
}
