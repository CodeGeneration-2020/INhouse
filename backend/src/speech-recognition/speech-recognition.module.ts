import { Module } from '@nestjs/common';

import { FileModule } from '../file/file.module';
import { MetricModule } from '../metric/metric.module';

import { SpeechRecognitionController } from './speech-recognition.controller';

import { SpeechRecognitionService } from './speech-recognition.service';
import { MicrosoftSpeechRecognitionService } from './microsoft-speech-recognition.service';

@Module({
  imports: [FileModule, MetricModule],
  controllers: [SpeechRecognitionController],
  providers: [
    {
      provide: SpeechRecognitionService,
      useClass: MicrosoftSpeechRecognitionService,
    },
  ],
})
export class SpeechRecognitionModule {}
