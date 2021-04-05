import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch';

import { MetricService } from 'src/metric/metric.service';
import { ApiService } from 'src/metric/types';

import { Dialog } from './types';

import { DialogService } from './dialog.service';

import {
  CreateOneDialog,
  CreateManyDialogs,
  FindOneOptions,
  FindManyOptions,
} from './dialog.types';

import { toSavedDialog } from './algolia-dialog.helpers';

@Injectable()
export class AlgoliaDialogService extends DialogService {
  private client: SearchClient;

  private metricService: MetricService;

  constructor(configService: ConfigService, metricService: MetricService) {
    super();

    const appId = configService.get<string>('ALGOLIA_APP_ID');
    const apiKey = configService.get<string>('ALGOLIA_API_KEY');

    this.client = algoliasearch(appId, apiKey);

    this.metricService = metricService;
  }

  private setSettings(
    index: SearchIndex,
    settings: Parameters<SearchIndex['setSettings']>[0],
  ) {
    return index.setSettings(settings).wait();
  }

  async createOne(dialog: CreateOneDialog) {
    const [savedDialog] = await this.createMany([dialog]);

    return savedDialog;
  }

  async createMany(dialogs: CreateManyDialogs) {
    const index = this.client.initIndex('dialogs');

    const { objectIDs } = await index.saveObjects(dialogs, {
      autoGenerateObjectIDIfNotExist: true,
    });

    this.metricService.trackApiCall({
      service: ApiService.ALGOLIA,
      method: 'save-objects',
    });

    return dialogs.map((dialog, index) => {
      const objectID = objectIDs[index];

      return toSavedDialog({ objectID, ...dialog });
    });
  }

  async findOne({ relatedTo, question }: FindOneOptions) {
    const index = this.client.initIndex('dialogs');

    await this.setSettings(index, {
      searchableAttributes: ['question'],
      attributesForFaceting: ['relatedTo'],
    });

    const { hits } = await index.search<Dialog>(question, {
      filters: `relatedTo:"${relatedTo}"`,
      hitsPerPage: 1,
    });

    this.metricService.trackApiCall({
      service: ApiService.ALGOLIA,
      method: 'search',
    });

    const dialog = hits[0];

    if (!dialog) {
      return null;
    }

    return toSavedDialog(dialog);
  }

  async findMany({ search, paginate }: FindManyOptions) {
    const index = this.client.initIndex('dialogs');

    const searchArgs: Parameters<typeof index.search> = [undefined, undefined];

    if (search) {
      searchArgs[0] = search.text;
    }

    if (paginate) {
      searchArgs[1] = {
        length: paginate.limit,
        offset: paginate.offset,
      };
    }

    await this.setSettings(index, {
      searchableAttributes: ['question', 'answer'],
    });

    const { hits } = await index.search<Dialog>(...searchArgs);

    this.metricService.trackApiCall({
      service: ApiService.ALGOLIA,
      method: 'search',
    });

    return hits.map(toSavedDialog);
  }
}
