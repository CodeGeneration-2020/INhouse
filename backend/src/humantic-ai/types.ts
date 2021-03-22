export enum Persona {
  SALES = 'sales',
  HIRING = 'hiring',
}

export interface CreateAnalysisOptions {
  userId: string;
}

export interface FetchAnalysisOptions {
  userId: string;
  persona?: Persona;
}

export interface GetAnalysisOptions {
  linkedInUrl: string;
}

export interface GetAnalysisRequestedByUserOptions {
  userId: string;
}
