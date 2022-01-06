import { Applicant } from './jazz-api.interface';

export interface ApplicantResponse {
  total: number;
  limit: number;
  skip: number;
  data: Applicant[];
}

export interface ApplicantFilterState {
  position: string[];
}
