import { IDateFilter } from 'src/app/core/interfaces';
import { WidgetApplicantsBySourceComponent } from './widget-applicants-by-source/widget-applicants-by-source.component';
import { WidgetApplicantsTableComponent } from './widget-applicants-table/widget-applicants-table.component';
import { WidgetJobsApplicantsComponent } from './widget-jobs-applicants/widget-jobs-applicants.component';
import { WidgetNewApplicantsComponent } from './widget-new-applicants/widget-new-applicants.component';
import { WidgetRecruitingStageExitedComponent } from './widget-recruiting-stage-exited/widget-recruiting-stage-exited.component';

export interface WidgetConfig {
  component: WidgetLabels;
  filters?: WidgetFilterUnion[];
  /**
   * allow fullscreen mode
   */
  fullscreen: boolean;
  id: string;
}

export interface WidgetFilter<T> {
  id: string;
  type: WidgetFilterTypes;
  value: T;
  label?: string;
}

export interface WidgetFilterDateInterval extends WidgetFilter<IDateFilter> {
  type: WidgetFilterTypes.DateInterval;
}

export interface WidgetFilterSelectJob extends WidgetFilter<string[]> {
  type: WidgetFilterTypes.SelectJob;
}

export interface WidgetFilterSelectStage extends WidgetFilter<string[]> {
  type: WidgetFilterTypes.SelectStage;
}

export interface WidgetFilterInputText extends WidgetFilter<string> {
  type: WidgetFilterTypes.InputText;
}

export enum WidgetComponents {
  RecruitingStageExited = 'widget-recruiting-stage-exited',
  JobApplicants = 'widget-jobs-applicants',
  NewApplicants = 'widget-new-applicants',
  ApplicantsTable = 'widget-applicants-table',
  ApplicantsBySource = 'widget-applicants-by-source',
}

export enum WidgetLabels {
  RecruitingStageExited = 'widget-recruiting-stage-exited',
  JobApplicants = 'widget-jobs-applicants',
  NewApplicants = 'widget-new-applicants',
  ApplicantTable = 'widget-applicants-table',
  ApplicantBySource = 'widget-applicants-by-source',
}

export enum WidgetFilterTypes {
  DateInterval = 'date-interval',
  SelectJob = 'select-job',
  SelectStage = 'select-stage',
  InputText = 'input-text',
}

export type WidgetFilterTypeUnion = `${WidgetFilterTypes}`;

export type WidgetFilterUnion =
  | WidgetFilterDateInterval
  | WidgetFilterSelectJob
  | WidgetFilterSelectStage
  | WidgetFilterInputText;

export type EntryComponents = {
  [WidgetLabels.RecruitingStageExited]: WidgetRecruitingStageExitedComponent;
  [WidgetLabels.JobApplicants]: WidgetJobsApplicantsComponent;
  [WidgetLabels.NewApplicants]: WidgetNewApplicantsComponent;
  [WidgetLabels.ApplicantTable]: WidgetApplicantsTableComponent;
  [WidgetLabels.ApplicantBySource]: WidgetApplicantsBySourceComponent;
};

export type EntryComponentsUnion = EntryComponents[keyof EntryComponents];

export const entryComponents = {
  [WidgetLabels.RecruitingStageExited]: WidgetRecruitingStageExitedComponent,
  [WidgetLabels.JobApplicants]: WidgetJobsApplicantsComponent,
  [WidgetLabels.NewApplicants]: WidgetNewApplicantsComponent,
  [WidgetLabels.ApplicantTable]: WidgetApplicantsTableComponent,
  [WidgetLabels.ApplicantBySource]: WidgetApplicantsBySourceComponent,
};

export const defaultWidgetConfig: WidgetConfig = {
  fullscreen: false,
  component: WidgetLabels.RecruitingStageExited,
  filters: [],
  id: 'default',
};
