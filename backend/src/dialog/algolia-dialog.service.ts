import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch';

import { MetricService } from 'src/metric/metric.service';
import { ApiService } from 'src/metric/types';

import { Dialog, SavedDialog } from './types';

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

    const { hits } = await index.findAnswers<Dialog>(question, ['en'], {
      attributesForPrediction: ['question'],
      searchParameters: {
        filters: `relatedTo:"${relatedTo}"`,
      },
      nbHits: 1,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findMany({ search, paginate }: FindManyOptions) {
    const index = this.client.initIndex('dialogs');

    if (!search) {
      let searchOptions: Parameters<SearchIndex['search']>[1];

      if (paginate) {
        searchOptions = {
          length: paginate.limit,
          offset: paginate.offset,
        };
      }

      const { hits } = await index.search<Dialog>(undefined, searchOptions);

      this.metricService.trackApiCall({
        service: ApiService.ALGOLIA,
        method: 'search',
      });

      return hits.map(toSavedDialog);
    }

    // TODO: create paginate
    const { hits } = await index.findAnswers<Dialog>(search.text, ['en'], {
      attributesForPrediction: ['question', 'answer'],
    });

    this.metricService.trackApiCall({
      service: ApiService.ALGOLIA,
      method: 'search',
    });

    const dialogs = new Map<string, SavedDialog>();

    for (const hit of hits) {
      if (dialogs.has(hit.objectID)) {
        continue;
      }

      dialogs.set(hit.objectID, toSavedDialog(hit));
    }

    return [...dialogs.values()];
  }
}
