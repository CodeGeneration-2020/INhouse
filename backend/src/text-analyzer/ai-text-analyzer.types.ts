export interface ShortqResponse {
  statement: string;
  questions: {
    id: number;
    context: string;
    Question: string;
    Answer: string;
  }[];
}
