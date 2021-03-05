export type RecognizeInput = NodeJS.ReadableStream;

export abstract class SpeechRecognition {
  abstract recognize(input: RecognizeInput): Promise<string>;
}
