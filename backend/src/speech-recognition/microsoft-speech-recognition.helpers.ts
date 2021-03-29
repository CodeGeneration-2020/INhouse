import { spawn } from 'child_process';
import { Readable } from 'stream';

import {
  AudioInputStream,
  SpeechRecognizer,
  PushAudioInputStream,
  SpeechRecognitionResult,
} from 'microsoft-cognitiveservices-speech-sdk';

import { createDeferred, cloneReadableStream } from '../shared/helpers';

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

export const formatToWav = (stream: Readable): Readable => {
  const ffmpeg = spawn('ffmpeg', ffmpegArgs);

  cloneReadableStream(stream).pipe(ffmpeg.stdin);

  return ffmpeg.stdout;
};

export const convertToPushStream = (stream: Readable): PushAudioInputStream => {
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
  const deferred = createDeferred<SpeechRecognitionResult>();

  const clean = () => {
    recognizer.close();
  };

  recognizer.recognizeOnceAsync(
    (response) => {
      deferred.resolve(response);

      clean();
    },
    (error) => {
      deferred.reject(error);

      clean();
    },
  );

  return deferred.promise;
};
