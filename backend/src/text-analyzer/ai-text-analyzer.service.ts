import { Injectable, HttpService } from '@nestjs/common';

import { AnalyzedDialog } from './types';

import { TextAnalyzerService } from './text-analyzer.service';
import { Analyze, AnalyzeResult } from './text-analyzer.types';

import { ShortqResponse } from './ai-text-analyzer.types';

@Injectable()
export class AITextAnalyzerService extends TextAnalyzerService {
  private baseApiUrl = 'http://20.48.159.112:8085';

  constructor(private httpService: HttpService) {
    super();
  }

  async analyze(text: Analyze): Promise<AnalyzeResult> {
    const url = `${this.baseApiUrl}/shortq`;

    const { data } = await this.httpService
      .post<ShortqResponse>(url, {
        input_text: text,
      })
      .toPromise();

    if (Object.keys(data).length === 0) {
      return [];
    }

    const dialogs: AnalyzedDialog[] = [];

    for (const question of data.questions) {
      const dialog: AnalyzedDialog = {
        context: question.context,
        question: question.Question,
        answer: question.Answer,
      };

      dialogs.push(dialog);
    }

    return dialogs;
  }
}
