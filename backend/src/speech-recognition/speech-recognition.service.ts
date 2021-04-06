import { RecognizeInput, RecognizeResult } from './speech-recognition.types';

export abstract class SpeechRecognitionService {
  abstract recognize(input: RecognizeInput): Promise<RecognizeResult>;
}
