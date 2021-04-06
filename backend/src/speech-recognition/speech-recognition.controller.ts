import { Post, UseGuards, Controller, UseInterceptors } from '@nestjs/common';

import { SpeechRecognitionService } from './speech-recognition.service';

import { MultipartFile } from 'src/shared/types';
import { File } from 'src/shared/decorators/file.decorator';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { MultipartGuard } from 'src/shared/guards/multipart.guard';
import { FilesInterceptor } from 'src/shared/interceptors/files.interceptor';

@Controller('speech-recognition')
export class SpeechRecognitionController {
  constructor(
    private readonly speechRecognitionService: SpeechRecognitionService,
  ) {}

  @Post('recognize')
  @UseGuards(JwtAuthGuard, MultipartGuard)
  @UseInterceptors(FilesInterceptor)
  async recognize(@File('input') { file }: MultipartFile) {
    return this.speechRecognitionService.recognize(file);
  }
}
