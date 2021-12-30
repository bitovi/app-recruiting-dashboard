import { Applicant } from './jazz-api.interface';
import { IDateFilter } from './date-filter.interface';

export interface ApplicantResponse {
  total: number;
  limit: number;
  skip: number;
  data: Applicant[];
}

export interface ApplicantFilterState {
  date: IDateFilter;
  position: string[];
}
