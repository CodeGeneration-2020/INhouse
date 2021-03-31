import { Readable } from 'stream';

import { Deferred } from './deferred';

type Fn<A, R> = (...args: A[]) => R;

export const cloneReadableStream = (source: Readable): Readable => {
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

export const createDeferred = <T>() => new Deferred<T>();

export const cloneBuffer = (source: Buffer): Buffer => {
  const clone = Buffer.alloc(source.length);

  source.copy(clone);

  return clone;
};

export const lazyInit = <A, R>(fn: Fn<A, R>): Fn<A, R> => {
  let result: R;
  let called = false;

  return (...args: A[]): R => {
    if (!called) {
      result = fn(...args);

      called = true;
    }

    return result;
  };
};

export const assignExistProperties = <T, P extends keyof T>(
  target: T,
  source: Partial<T>,
  properties: P[],
) => {
  for (const property of properties) {
    const value = source[property];

    if (value === undefined) {
      continue;
    }

    target[property] = value;
  }

  return target;
};
