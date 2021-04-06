import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { v4 } from 'uuid';

import {
  Recognizer,
  AudioConfig,
  SpeechConfig,
  SpeechRecognizer,
} from 'microsoft-cognitiveservices-speech-sdk';

import { FileService } from 'src/file/file.service';
import { MetricService } from 'src/metric/metric.service';
import { ParserService } from 'src/parser/parser.service';

import { cloneReadableStream } from 'src/shared/helpers';

import { SpeechRecognitionService } from './speech-recognition.service';

import { RecognizeInput } from './speech-recognition.types';

import {
  formatToWav,
  recognizeOnceAsync,
  convertToPushStream,
} from './microsoft-speech-recognition.helpers';

Recognizer.enableTelemetry(false);

@Injectable()
export class MicrosoftSpeechRecognitionService extends SpeechRecognitionService {
  constructor(
    private fileService: FileService,
    private configService: ConfigService,
    private metricService: MetricService,
    private parserService: ParserService,
  ) {
    super();
  }

  async recognize(input: RecognizeInput) {
    const subscriptionKey = this.configService.get<string>(
      'MICROSOFT_COGNITIVE_SUBSCRIPTION_KEY',
    );

    const region = this.configService.get<string>('MICROSOFT_COGNITIVE_REGION');

    const speechConfig = SpeechConfig.fromSubscription(subscriptionKey, region);

    speechConfig.speechRecognitionLanguage = 'en-US';

    const stream = formatToWav(input);

    const clonedStream = cloneReadableStream(stream);

    const pushStream = convertToPushStream(stream);

    const audioConfig = AudioConfig.fromStreamInput(pushStream);

    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    const { text } = await recognizeOnceAsync(recognizer);

    if (!text) {
      return {
        text: null,
        questions: [],
      };
    }

    setImmediate(async () => {
      const { id: fileId } = await this.fileService.upload({
        filename: `${v4()}.wav`,
        contentType: 'audio/wav',
        stream: clonedStream,
      });

      await this.metricService.trackRecognize({ fileId, text });
    });

    const questions = this.parserService.parseQuestions(text);

    return { text, questions };
  }
}
