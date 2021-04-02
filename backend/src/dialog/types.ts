export interface Dialog {
  relatedTo: string;
  context: string;
  question: string;
  answer: string;
}

export interface SavedDialog extends Dialog {
  id: string;
}
