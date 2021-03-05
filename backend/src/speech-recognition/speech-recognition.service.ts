import { Injectable } from '@nestjs/common';

import {
  RecognizeInput,
  SpeechRecognition,
} from '../shared/services/speech-recognition';

@Injectable()
export class SpeechRecognitionService {
  constructor(private recognitionModule: SpeechRecognition) {}

  recognize(input: RecognizeInput) {
    return this.recognitionModule.recognize(input);
  }
}
