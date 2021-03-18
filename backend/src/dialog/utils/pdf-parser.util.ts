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

    const { text } = data;

    if (text === undefined) {
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

  for (const line of lines) {
    if (article === undefined) {
      titleFontSize = line.fontSize;
    }

    if (line.fontSize >= titleFontSize) {
      article = {
        title: line.text.trim(),
        content: '',
      };

      articles.push(article);

      continue;
    }

    article.content += line.text.trimLeft();
  }

  return articles;
};
