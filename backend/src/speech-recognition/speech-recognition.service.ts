import { Injectable } from '@nestjs/common';

import {
  RecognizeInput,
  SpeechRecognition,
} from '../shared/services/speech-recognition';

@Injectable()
export class SpeechRecognitionService {
  constructor(private speechRecognition: SpeechRecognition) {}

  recognize(input: RecognizeInput) {
    return this.speechRecognition.recognize(input);
  }
}
