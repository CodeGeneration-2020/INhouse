import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  Recognizer,
  AudioConfig,
  SpeechConfig,
  SpeechRecognizer,
} from 'microsoft-cognitiveservices-speech-sdk';

import { RecognizeInput, SpeechRecognition } from './speech-recognition';

import {
  formatToWav,
  nodeStreamToPushStream,
} from './microsoft-cognitive.helpers';

Recognizer.enableTelemetry(false);

@Injectable()
export class MicrosoftCognitiveSpeechRecognition extends SpeechRecognition {
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

    const pushStream = nodeStreamToPushStream(formatToWav(input));

    const audioConfig = AudioConfig.fromStreamInput(pushStream);

    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    return new Promise<string>((resolve) => {
      recognizer.recognizeOnceAsync((response) => {
        resolve(response.text);

        recognizer.close();
      });
    });
  }
}
