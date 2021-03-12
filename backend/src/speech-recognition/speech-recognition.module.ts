import { Module } from '@nestjs/common';

import { SpeechRecognitionService } from './speech-recognition.service';
import { SpeechRecognitionController } from './speech-recognition.controller';

import {
  SpeechRecognition,
  MicrosoftCognitiveSpeechRecognition,
} from '../shared/services/speech-recognition';

@Module({
  controllers: [SpeechRecognitionController],
  providers: [
    SpeechRecognitionService,
    {
      provide: SpeechRecognition,
      useClass: MicrosoftCognitiveSpeechRecognition,
    },
  ],
})
export class SpeechRecognitionModule {}
