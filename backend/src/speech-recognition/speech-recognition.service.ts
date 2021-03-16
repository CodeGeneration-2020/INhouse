import { RecognizeInput } from './types';

export abstract class SpeechRecognitionService {
  abstract recognize(input: RecognizeInput): Promise<string>;
}
