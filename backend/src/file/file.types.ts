import { Readable } from 'stream';

export interface UploadOptions {
  filename: string;
  contentType: string;
  stream: Readable;
}

export interface DownloadOptions {
  id: string;
}
