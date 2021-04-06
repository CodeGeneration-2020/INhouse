import { Injectable } from '@nestjs/common';

import { parseArticles } from './articles/article.parser';
import { parseQuestions } from './questions/question.parser';

@Injectable()
export class ParserService {
  parseArticles(buffer: Buffer) {
    return parseArticles(buffer);
  }

  parseQuestions(text: string) {
    return parseQuestions(text);
  }
}
