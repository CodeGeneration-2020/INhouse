import { spawn } from 'child_process';
import { Readable } from 'stream';

import * as ffmpegPath from 'ffmpeg-static';

import {
  ResultReason,
  AudioInputStream,
  SpeechRecognizer,
  CancellationReason,
  PushAudioInputStream,
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

export const runRecognizer = (
  recognizer: SpeechRecognizer,
): Promise<string> => {
  const deferred = createDeferred<string>();

  const messages: string[] = [];

  recognizer.recognized = (sender, event) => {
    if (event.result.reason !== ResultReason.RecognizedSpeech) {
      return;
    }

    messages.push(event.result.text);
  };

  recognizer.canceled = (sender, event) => {
    if (event.reason === CancellationReason.Error) {
      const error = new Error(`${event.errorCode}: ${event.errorDetails}`);

      deferred.reject(error);

      return;
    }

    deferred.resolve(messages.join(' '));
  };

  recognizer.startContinuousRecognitionAsync();

  return deferred.promise;
};
