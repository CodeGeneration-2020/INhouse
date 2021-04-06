import { Readable } from 'stream';

export type RecognizeInput = Readable;

export interface RecognizeResult {
  text: string;
  questions: string[];
}
