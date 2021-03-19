import { Injectable } from '@nestjs/common';

import { Dialog } from '../types';

import { TextAnalyzerService } from './text-analyzer.service';

@Injectable()
export class AITextAnalyzerService extends TextAnalyzerService {
  // TODO: use http service for fetch data from python api
  async analyze() {
    const dialogs: Dialog[] = [
      {
        context:
          'Sachin Ramesh Tendulkar is a former international cricketer from India and a former captain of the Indian national team.',
        question: 'What is Sachin Ramesh Tendulkar’s career?',
        answer: 'cricketer',
      },
      {
        context:
          'Sachin Ramesh Tendulkar is a former international cricketer from India and a former captain of the Indian national team.',
        question: 'Where is Sachin Ramesh Tendulkar from?',
        answer: 'india',
      },
      {
        context:
          'He is widely regarded as one of the greatest batsmen in the history of cricket.',
        question: 'What is the best cricketer?',
        answer: 'batsmen',
      },
    ];

    return dialogs;
  }
}
