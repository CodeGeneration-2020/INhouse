import { Dialog } from '../types';

import { GetAnswerOptions, UploadDialogsOptions } from './dialog.service.types';

export abstract class DialogService {
  abstract getAnswer(options: GetAnswerOptions): Promise<Dialog>;

  abstract uploadDialogs(options: UploadDialogsOptions): Promise<void>;
}
