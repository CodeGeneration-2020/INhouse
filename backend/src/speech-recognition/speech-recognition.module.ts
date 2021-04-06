import { Module } from '@nestjs/common';

import { FileModule } from 'src/file/file.module';
import { MetricModule } from 'src/metric/metric.module';
import { ParserModule } from 'src/parser/parser.module';

import { SpeechRecognitionController } from './speech-recognition.controller';

import { SpeechRecognitionService } from './speech-recognition.service';
import { MicrosoftSpeechRecognitionService } from './microsoft-speech-recognition.service';

@Module({
  imports: [FileModule, MetricModule, ParserModule],
  controllers: [SpeechRecognitionController],
  providers: [
    {
      provide: SpeechRecognitionService,
      useClass: MicrosoftSpeechRecognitionService,
    },
  ],
})
export class SpeechRecognitionModule {}
