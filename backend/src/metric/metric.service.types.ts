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

export interface TrackRecognizeOptions {
  userId?: string;
  fileId: string;
  text: string;
}

export interface GetAllRecognizedOptions {
  search?: {
    username: string;
  };
  paginate?: {
    limit: number;
    offset: number;
  };
}
