import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit } from '@nestjs/common';

import algoliasearch, { SearchClient } from 'algoliasearch';

import { ApiService } from '../../metric/types';
import { MetricService } from '../../metric/metric.service';

import { Dialog, SavedDialog } from '../types';

import { DialogService } from './dialog.service';
import { GetOptions, GetAllOptions, UploadOptions } from './dialog.types';

import { toSavedDialog } from './algolia-dialog.helpers';

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

    await index.setSettings({
      searchableAttributes: ['question'],
    });
  }

  async get({ question }: GetOptions) {
    const index = this.client.initIndex('dialogs');

    const { hits } = await index.search<Dialog>(question, {
      hitsPerPage: 1,
      searchableAttributes: ['question'],
    });

    this.metricService.trackApiCall({
      service: ApiService.ALGOLIA,
      method: 'search',
    });

    const dialog = hits[0];

    return {
      context: dialog?.context ?? 'Not found',
      question: dialog?.question ?? question,
      answer: dialog?.answer ?? 'Not found',
    };
  }

  async getAll({ search, paginate }: GetAllOptions) {
    const index = this.client.initIndex('dialogs');

    const searchArgs: Parameters<typeof index.search> = [
      undefined,
      {
        restrictSearchableAttributes: ['question', 'answer'],
      },
    ];

    if (search) {
      searchArgs[0] = search.text;
    }

    if (paginate) {
      searchArgs[1] = {
        ...searchArgs[1],

        length: paginate.limit,
        offset: paginate.offset,
      };
    }

    const { hits } = await index.search<Dialog>(...searchArgs);

    this.metricService.trackApiCall({
      service: ApiService.ALGOLIA,
      method: 'search',
    });

    return hits.map(toSavedDialog);
  }

  async upload({ dialogs }: UploadOptions) {
    const index = this.client.initIndex('dialogs');

    const { objectIDs } = await index.saveObjects(dialogs, {
      autoGenerateObjectIDIfNotExist: true,
    });

    this.metricService.trackApiCall({
      service: ApiService.ALGOLIA,
      method: 'save-objects',
    });

    return dialogs.map((dialog, index) => {
      const savedDialog: SavedDialog = {
        id: objectIDs[index],

        ...dialog,
      };

      return savedDialog;
    });
  }
}
