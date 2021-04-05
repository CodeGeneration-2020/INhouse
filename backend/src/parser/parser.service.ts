import { Injectable } from '@nestjs/common';

import { parseArticles } from './articles/article.parser';

@Injectable()
export class ParserService {
  parseArticles(buffer: Buffer) {
    return parseArticles(buffer);
  }
}
