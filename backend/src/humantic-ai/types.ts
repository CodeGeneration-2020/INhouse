export enum Persona {
  SALES = 'sales',
  HIRING = 'hiring',
}

export interface CreateAnalysisParams {
  userId: string;
}

export interface FetchAnalysisParams {
  userId: string;
  persona?: Persona;
}
