import { spawn } from 'child_process';

import {
  AudioInputStream,
  SpeechRecognizer,
  PushAudioInputStream,
  SpeechRecognitionResult,
} from 'microsoft-cognitiveservices-speech-sdk';

const ffmpegArgs = [
  '-i',
  'pipe:0',
  '-acodec',
  'pcm_s16le',
  '-ac',
  '1',
  '-ar',
  '16000',
  '-f',
  'wav',
  'pipe:1',
];

export const formatToWav = (
  stream: NodeJS.ReadableStream,
): NodeJS.ReadableStream => {
  const ffmpeg = spawn('ffmpeg', ffmpegArgs);

  stream.pipe(ffmpeg.stdin);

  return ffmpeg.stdout;
};

export const convertToPushStream = (
  stream: NodeJS.ReadableStream,
): PushAudioInputStream => {
  const pushStream = AudioInputStream.createPushStream();

  stream.on('data', (buffer: Buffer) => {
    pushStream.write(buffer.slice());
  });

  stream.on('close', () => {
    pushStream.close();
  });

  return pushStream;
};

export const recognizeOnceAsync = (
  recognizer: SpeechRecognizer,
): Promise<SpeechRecognitionResult> => {
  return new Promise((resolve, reject) => {
    const closeRecognizer = () => {
      recognizer.close();
    };

    const onResponse = (response: SpeechRecognitionResult) => {
      resolve(response);

      closeRecognizer();
    };

    const onError = (error: string) => {
      reject(error);

      closeRecognizer();
    };

    recognizer.recognizeOnceAsync(onResponse, onError);
  });
};
