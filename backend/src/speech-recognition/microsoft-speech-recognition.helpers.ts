import { spawn } from 'child_process';
import { Readable } from 'stream';

import * as ffmpegPath from 'ffmpeg-static';

import {
  AudioInputStream,
  SpeechRecognizer,
  PushAudioInputStream,
  SpeechRecognitionResult,
} from 'microsoft-cognitiveservices-speech-sdk';

import { createDeferred } from 'src/shared/helpers';

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
  const ffmpeg = spawn(ffmpegPath, ffmpegArgs);

  stream.on('data', (chunk: Buffer) => {
    ffmpeg.stdin.write(chunk);
  });

  stream.on('error', (error: Error) => {
    ffmpeg.stdin.emit('error', error);
  });

  stream.on('end', () => {
    ffmpeg.stdin.end();
  });

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
