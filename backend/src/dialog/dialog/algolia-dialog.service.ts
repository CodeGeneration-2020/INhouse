import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit } from '@nestjs/common';

import algoliasearch, { SearchClient } from 'algoliasearch';

import { ApiService } from '../../metric/types';
import { MetricService } from '../../metric/metric.service';

import { Dialog } from '../types';

import { DialogService } from './dialog.service';
import { GetAnswerOptions, UploadDialogsOptions } from './dialog.service.types';

@Injectable()
export class AlgoliaDialogService
  extends DialogService
  implements OnModuleInit {
  private client: SearchClient;

  private metricService: MetricService;

  constructor(configService: ConfigService, metricService: MetricService) {
    super();

    const appId = configService.get<string>('ALGOLIA_APP_ID');
    const apiKey = configService.get<string>('ALGOLIA_API_KEY');

    this.client = algoliasearch(appId, apiKey);

    this.metricService = metricService;
  }

  async onModuleInit() {
    const index = this.client.initIndex('dialogs');

    const settings = {
      searchableAttributes: ['question'],
    };

    await index.setSettings(settings).wait();
  }

  async getAnswer({ question }: GetAnswerOptions) {
    const index = this.client.initIndex('dialogs');

    const { hits } = await index.search<Dialog>(question, {
      hitsPerPage: 1,
    });

    this.metricService.trackApiCall({
      service: ApiService.ALGOLIA,
      method: 'search',
    });

    const dialog = hits[0];

    return {
      context: dialog.context,
      question: dialog.question,
      answer: dialog.answer,
    };
  }

  async uploadDialogs({ dialogs }: UploadDialogsOptions) {
    const index = this.client.initIndex('dialogs');

    const options = { autoGenerateObjectIDIfNotExist: true };

    await index.saveObjects(dialogs, options).wait();

    this.metricService.trackApiCall({
      service: ApiService.ALGOLIA,
      method: 'save-objects',
    });
  }
}
