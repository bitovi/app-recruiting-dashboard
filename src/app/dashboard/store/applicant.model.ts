import { Applicant } from './jazz-api.model';
import { DateFilter } from './store.model';

export interface ApplicantResponse {
  total: number;
  limit: number;
  skip: number;
  data: Applicant[];
}

export interface ApplicantFilterState {
  date: DateFilter;
  position: string[];
}
