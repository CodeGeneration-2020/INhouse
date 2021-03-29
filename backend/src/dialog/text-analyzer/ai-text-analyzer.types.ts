export interface ShortqQuestionResponse {
  id: number;
  context: string;
  Question: string;
  Answer: string;
}

export interface ShortqResponse {
  statement: string;
  questions: ShortqQuestionResponse[];
}
