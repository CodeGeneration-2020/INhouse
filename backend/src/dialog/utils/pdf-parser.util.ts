import { PdfReader } from 'pdfreader';

import { cloneBuffer, createDeferred } from '../../shared/helpers';

interface Line {
  text: string;
  fontSize: number;
}

export interface Article {
  title: string;
  content: string;
}

const SKIP_HEADER_Y = 1.577;
const SKIP_FOOTER_Y = 34.688;

export const parseArticles = async (input: Buffer): Promise<Article[]> => {
  const lines: Line[] = [];

  const reader = new PdfReader();

  const deferred = createDeferred<void>();

  const parser = (error: any, data: any) => {
    if (error) {
      deferred.reject(error);

      return;
    }

    if (data === undefined) {
      deferred.resolve();

      return;
    }

    const { y } = data;

    if (y === undefined) {
      return;
    }

    if (y <= SKIP_HEADER_Y) {
      return;
    }

    if (y >= SKIP_FOOTER_Y) {
      return;
    }

    const text = data.text?.trim();

    if (text === undefined || text.length === 0) {
      return;
    }

    const fontSize = data?.R?.[0]?.TS?.[1];

    if (fontSize === undefined) {
      return;
    }

    lines.push({
      text,
      fontSize,
    });
  };

  // Issue: https://github.com/modesty/pdf2json/issues/163
  reader.parseBuffer(cloneBuffer(input), parser);

  await deferred.promise;

  let article: Article;
  let titleFontSize: number;

  const articles: Article[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const previousLine = lines[i - 1];

    if (previousLine === undefined) {
      titleFontSize = line.fontSize;
    }

    if (line.fontSize === titleFontSize) {
      if (previousLine?.fontSize === line.fontSize) {
        article.title += ` ${line.text}`;

        continue;
      }

      article = {
        title: line.text,
        content: '',
      };

      articles.push(article);

      continue;
    }

    if (article.content.length > 0) {
      article.content += ' ';
    }

    article.content += line.text;
  }

  return articles;
};
