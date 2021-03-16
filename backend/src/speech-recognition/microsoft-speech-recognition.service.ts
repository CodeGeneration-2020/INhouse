import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  Recognizer,
  AudioConfig,
  SpeechConfig,
  SpeechRecognizer,
} from 'microsoft-cognitiveservices-speech-sdk';

import { RecognizeInput } from './types';

import { SpeechRecognitionService } from './speech-recognition.service';

import {
  formatToWav,
  recognizeOnceAsync,
  convertToPushStream,
} from './microsoft-speech-recognition.helpers';

Recognizer.enableTelemetry(false);

@Injectable()
export class MicrosoftSpeechRecognitionService extends SpeechRecognitionService {
  constructor(private configService: ConfigService) {
    super();
  }

  async recognize(input: RecognizeInput) {
    const subscriptionKey = this.configService.get<string>(
      'MICROSOFT_COGNITIVE_SUBSCRIPTION_KEY',
    );

    const region = this.configService.get<string>('MICROSOFT_COGNITIVE_REGION');

    const speechConfig = SpeechConfig.fromSubscription(subscriptionKey, region);

    speechConfig.speechRecognitionLanguage = 'en-US';

    const pushStream = convertToPushStream(formatToWav(input));

    const audioConfig = AudioConfig.fromStreamInput(pushStream);

    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    const { text } = await recognizeOnceAsync(recognizer);

    return text;
  }
}
