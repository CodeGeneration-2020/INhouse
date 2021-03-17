import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit } from '@nestjs/common';

import algoliasearch, { SearchClient } from 'algoliasearch';

import { AnswersIndex } from './types';

import { DialogService } from './dialog.service';

import { GetAnswerDto } from './dto/get-answer.dto';

@Injectable()
export class AlgoliaDialogService
  extends DialogService
  implements OnModuleInit {
  private client: SearchClient;

  constructor(configService: ConfigService) {
    super();

    const appId = configService.get<string>('ALGOLIA_APP_ID');
    const apiKey = configService.get<string>('ALGOLIA_API_KEY');

    this.client = algoliasearch(appId, apiKey);
  }

  async onModuleInit() {
    const index = this.client.initIndex('answers');

    const settings = {
      searchableAttributes: ['question'],
    };

    await index.setSettings(settings).wait();
  }

  async getAnswer(getAnswerDto: GetAnswerDto) {
    const index = this.client.initIndex('answers');

    const { hits } = await index.search<AnswersIndex>(getAnswerDto.question, {
      hitsPerPage: 1,
    });

    return hits[0].answer;
  }
}
