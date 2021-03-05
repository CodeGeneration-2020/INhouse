import { spawn } from 'child_process';

import {
  AudioInputStream,
  PushAudioInputStream,
} from 'microsoft-cognitiveservices-speech-sdk';

import { cloneReadableStream } from '../../helpers';

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

  cloneReadableStream(stream).pipe(ffmpeg.stdin);

  return cloneReadableStream(ffmpeg.stdout);
};

export const nodeStreamToPushStream = (
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
