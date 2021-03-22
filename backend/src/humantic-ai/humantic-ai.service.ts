import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Injectable, HttpService } from '@nestjs/common';

import { Model } from 'mongoose';

import { ApiService } from '../metric/types';
import { MetricService } from '../metric/metric.service';

import {
  ProfileAnalysis,
  ProfileAnalysisDocument,
} from './schemas/profile-analysis.schema';

import {
  CreateAnalysisOptions,
  FetchAnalysisOptions,
  GetAnalysisOptions,
  GetRequestHistoryOptions,
} from './types';

import { cleanLinkedInUrl } from './helpers';

const baseUrl = 'https://api.humantic.ai/v1/';

@Injectable()
export class HumanticAiService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private metricService: MetricService,

    @InjectModel(ProfileAnalysis.name)
    private profileAnalysisModel: Model<ProfileAnalysisDocument>,
  ) {}

  private async createAnalysis({ userId }: CreateAnalysisOptions) {
    const url = `${baseUrl}/user-profile/create`;

    const apiKey = this.configService.get<string>('HUMANTIC_AI_API_KEY');

    const { data } = await this.httpService
      .get(url, {
        params: {
          apikey: apiKey,
          userid: userId,
        },
      })
      .toPromise();

    this.metricService.trackApiCall({
      service: ApiService.HUMANTIC,
      method: 'create-analysis',
    });

    return data;
  }

  private async fetchAnalysis({ userId, persona }: FetchAnalysisOptions) {
    const url = `${baseUrl}/user-profile`;

    const apiKey = this.configService.get<string>('HUMANTIC_AI_API_KEY');

    const { data } = await this.httpService
      .get(url, {
        params: {
          apikey: apiKey,
          userid: userId,
          persona,
        },
      })
      .toPromise();

    this.metricService.trackApiCall({
      service: ApiService.HUMANTIC,
      method: 'fetch-analysis',
    });

    return data;
  }

  async getAnalysis({ linkedInUrl }: GetAnalysisOptions) {
    linkedInUrl = cleanLinkedInUrl(linkedInUrl);

    let profileAnalysis = await this.profileAnalysisModel.findOne({
      linkedInUrl,
    });

    if (!profileAnalysis) {
      await this.createAnalysis({
        userId: linkedInUrl,
      });

      let response: any;

      do {
        response = await this.fetchAnalysis({
          userId: linkedInUrl,
        });
      } while (response.metadata.analysis_status === 'NOT_COMPLETE');

      profileAnalysis = await this.profileAnalysisModel.create({
        linkedInUrl,

        analysis: response.results,
      });
    }

    this.metricService.trackHumanticRequest({
      profileAnalysisId: profileAnalysis.id,
    });

    return profileAnalysis.analysis;
  }

  getCountAnalysis() {
    return this.profileAnalysisModel.countDocuments();
  }

  async getRequestHistory({ userId }: GetRequestHistoryOptions) {
    const requests = await this.metricService.getHumanticRequests({ userId });

    return this.profileAnalysisModel.find({
      _id: {
        $in: requests.map(({ profileAnalysisId }) => profileAnalysisId),
      },
    });
  }
}
