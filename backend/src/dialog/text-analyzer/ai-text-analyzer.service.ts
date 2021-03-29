import { Injectable, HttpService } from '@nestjs/common';

import { Dialog } from '../types';

import { AnalyzeOptions } from './text-analyzer.types';
import { TextAnalyzerService } from './text-analyzer.service';

import { ShortqResponse } from './ai-text-analyzer.types';

// TODO: move to service or config?
const baseUrl = 'http://20.48.159.112:8085';

@Injectable()
export class AITextAnalyzerService extends TextAnalyzerService {
  constructor(private httpService: HttpService) {
    super();
  }

  async analyze({ text }: AnalyzeOptions) {
    const url = `${baseUrl}/shortq`;

    const { data } = await this.httpService
      .post<ShortqResponse>(url, {
        input_text: text,
      })
      .toPromise();

    if (Object.keys(data).length === 0) {
      return [];
    }

    const dialogs: Dialog[] = [];

    for (const question of data.questions) {
      const dialog: Dialog = {
        context: question.context,
        question: question.Question,
        answer: question.Answer,
      };

      dialogs.push(dialog);
    }

    return dialogs;
  }
}
