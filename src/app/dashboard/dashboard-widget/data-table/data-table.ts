import {TemplateRef} from '@angular/core';
import {ApplicantJob} from '../../store/jazz-api.model';

interface TableConfig {
  heading: string;
  template?: TemplateRef<any>;
  key: string;
  truncate: boolean;
  sortable: boolean;
  headClass?: string;
  cellClass?: string;
}

export interface DataTable {
  id: number;
  current_stage?: string;
  name?: string;
  position?: string;
  comments?: string;
  tableConfig?: Partial<TableConfig>;
}

export interface TableUserDetails {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  location: string;
  phone: string;
  linkedin_url: string;
  eeo_gender: string;
  eeo_race: string;
  eeo_disability: string;
  website: string;
  desired_salary: string;
  desired_start_date: Date;
  referrer: string;
  job: ApplicantJob;
  languages: string;
  rating: [];
  resume_link: string;
  comments_count: number;
  comments: [];
  evaluation: [];
  categories: [];
  activities: { id: string; activity: string; date: Date; time: string };
  messages: {};
}
