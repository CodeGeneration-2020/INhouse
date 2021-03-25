export interface Dialog {
  context: string;
  question: string;
  answer: string;
}

export interface SavedDialog extends Dialog {
  id: string;
}
