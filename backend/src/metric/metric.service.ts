import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, FilterQuery } from 'mongoose';

import { TrackOptions, GetApiCallOptions } from './metric.service.types';

import {
  ApiCallMetric,
  ApiCallMetricDocument,
} from './schemas/api-call-metric.schema';

@Injectable()
export class MetricService {
  constructor(
    @InjectModel(ApiCallMetric.name)
    private apiCallMetricModel: Model<ApiCallMetricDocument>,
  ) {}

  trackApiCall({ service, method }: TrackOptions) {
    return this.apiCallMetricModel.create({ service, method });
  }

  async getCountApiCall({ service, method }: GetApiCallOptions) {
    const filter: FilterQuery<ApiCallMetricDocument> = { service };

    if (method !== undefined) {
      filter.method = method;
    }

    return this.apiCallMetricModel.countDocuments(filter);
  }
}
