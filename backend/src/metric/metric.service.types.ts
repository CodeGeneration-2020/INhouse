import { ApiService } from './types';

export interface TracApiOptions {
  service: ApiService;
  method: string;
}

export interface GetCountApiCallsOptions {
  service: ApiService;
  method?: string;
}

export interface TrackHumanticRequestOptions {
  userId?: string;
  profileAnalysisId: string;
}

export interface GetHumanticRequestsOptions {
  userId: string;
}
