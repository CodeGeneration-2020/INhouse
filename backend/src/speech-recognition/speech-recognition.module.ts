import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SpeechRecognitionController } from './speech-recognition.controller';
import { SpeechRecognitionService } from './speech-recognition.service';

import {
  SpeechRecognition,
  MicrosoftCognitiveSpeechRecognition,
} from '../shared/services/speech-recognition';

@Module({
  imports: [ConfigModule],
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
