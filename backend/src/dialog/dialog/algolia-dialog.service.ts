import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit } from '@nestjs/common';

import algoliasearch, { SearchClient } from 'algoliasearch';

import { ApiService } from '../../metric/types';
import { MetricService } from '../../metric/metric.service';

import { Dialog, SavedDialog } from '../types';

import { DialogService } from './dialog.service';
import { GetOptions, GetAllOptions, UploadOptions } from './dialog.types';

import { toSavedDialog } from './algolia-dialog.helpers';
import { AlgoliaSavedDialog } from './algolia-dialog.types';

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

  // TODO: create a pagination
  async getAll({ limit = 10, offset = 0 }: GetAllOptions) {
    const index = this.client.initIndex('dialogs');

    const dialogs: SavedDialog[] = [];

    await index.browseObjects<Dialog>({
      batch: (batch: AlgoliaSavedDialog[]) => {
        dialogs.push(...batch.map(toSavedDialog));
      },
    });

    return dialogs;
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
