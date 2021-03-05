import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SpeechRecognitionModule } from './speech-recognition/speech-recognition.module';

@Module({
  imports: [ConfigModule.forRoot(), SpeechRecognitionModule],
})
export class AppModule {}
