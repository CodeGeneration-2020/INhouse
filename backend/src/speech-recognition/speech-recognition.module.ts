import { Module } from '@nestjs/common';

import { SpeechRecognitionController } from './speech-recognition.controller';

import { SpeechRecognitionService } from './speech-recognition.service';
import { MicrosoftSpeechRecognitionService } from './microsoft-speech-recognition.service';

@Module({
  controllers: [SpeechRecognitionController],
  providers: [
    {
      provide: SpeechRecognitionService,
      useClass: MicrosoftSpeechRecognitionService,
    },
  ],
})
export class SpeechRecognitionModule {}
