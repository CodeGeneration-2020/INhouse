import { Readable, Writable } from 'stream';

import * as schema from 'gridfile';

import { Schema, Document } from 'mongoose';

export abstract class File {
  length: number;

  chunkSize: number;

  uploadDate: Date;

  readonly createdAt: Date;

  md5: string;

  filename: string;

  contentType: string;

  metadata: any;

  aliases: string[];

  abstract getUploadStream(): Writable;

  abstract getDownloadStream(): Readable;

  abstract upload(stream: Readable): FileDocument;

  abstract download(stream: Writable): FileDocument;
}

export type FileDocument = File & Document<File>;

export const FileSchema: Schema<FileDocument> = schema;
