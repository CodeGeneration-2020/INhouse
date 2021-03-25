import { Dialog } from '../types';

export interface GetOptions {
  question: string;
}

export interface GetAllOptions {
  limit?: number;
  offset?: number;
}

export interface UploadOptions {
  dialogs: Dialog[];
}
