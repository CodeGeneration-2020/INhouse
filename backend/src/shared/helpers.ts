import { Readable } from 'stream';

import { Deferred } from './deferred';

export const cloneReadableStream = (
  source: NodeJS.ReadableStream,
): NodeJS.ReadableStream => {
  const out = new Readable();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  out._read = () => {};

  source.on('data', (chunk: Buffer) => {
    out.push(chunk);
  });

  source.on('error', (error: Error) => {
    out.emit('error', error);
  });

  source.on('end', () => {
    out.push(null);
  });

  return out;
};

export const createDeferred = <T = any>() => new Deferred<T>();
