import { SavedDialog } from '../types';

import { AlgoliaSavedDialog } from './algolia-dialog.types';

export const toSavedDialog = (dialog: AlgoliaSavedDialog): SavedDialog => {
  return {
    id: dialog.objectID,
    context: dialog.context,
    question: dialog.question,
    answer: dialog.answer,
  };
};
