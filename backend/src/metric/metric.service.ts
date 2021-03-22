import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Inject, Injectable, Scope } from '@nestjs/common';

import { Model, FilterQuery } from 'mongoose';

import {
  TracApiOptions,
  GetCountApiCallsOptions,
  TrackHumanticRequestOptions,
  GetHumanticRequestsOptions,
} from './metric.service.types';

import {
  ApiCallMetric,
  ApiCallMetricDocument,
} from './schemas/api-call-metric.schema';

import {
  HumanticRequestMetric,
  HumanticRequestMetricDocument,
} from './schemas/humantic-request-metric.schema';

import { Request } from '../shared/types';

@Injectable({
  scope: Scope.REQUEST,
})
export class MetricService {
  constructor(
    @Inject(REQUEST)
    private request: Request,

    @InjectModel(ApiCallMetric.name)
    private apiCallMetricModel: Model<ApiCallMetricDocument>,

    @InjectModel(HumanticRequestMetric.name)
    private humanticRequestMetricModel: Model<HumanticRequestMetricDocument>,
  ) {}

  trackApiCall({ service, method }: TracApiOptions) {
    return this.apiCallMetricModel.create({ service, method });
  }

  async getCountApiCalls({ service, method }: GetCountApiCallsOptions) {
    const filter: FilterQuery<ApiCallMetricDocument> = { service };

    if (method !== undefined) {
      filter.method = method;
    }

    return this.apiCallMetricModel.countDocuments(filter);
  }

  async trackHumanticRequest({
    userId = this.request.user.id,
    profileAnalysisId,
  }: TrackHumanticRequestOptions) {
    // TODO: use findOneAndUpdate with { insert: true } option

    let request = await this.humanticRequestMetricModel.findOne({
      userId,
      profileAnalysisId,
    });

    if (!request) {
      request = await this.humanticRequestMetricModel.create({
        userId,
        profileAnalysisId,
      });
    }

    return request;
  }

  getHumanticRequests({ userId }: GetHumanticRequestsOptions) {
    return this.humanticRequestMetricModel.find({ userId });
  }
}
