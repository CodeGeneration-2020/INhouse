import { Dialog, SavedDialog } from '../types';

import { GetOptions, GetAllOptions, UploadOptions } from './dialog.types';

export abstract class DialogService {
  abstract get(options: GetOptions): Promise<Dialog>;

  abstract getAll(options: GetAllOptions): Promise<SavedDialog[]>;

  abstract upload(options: UploadOptions): Promise<SavedDialog[]>;
}
