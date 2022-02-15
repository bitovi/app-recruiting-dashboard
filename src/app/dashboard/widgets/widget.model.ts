import { IDateFilter } from 'src/app/core/interfaces';
import { WidgetApplicantsBySourceComponent } from './widget-applicants-by-source/widget-applicants-by-source.component';
import { WidgetApplicantsTableComponent } from './widget-applicants-table/widget-applicants-table.component';
import { WidgetJobsApplicantsComponent } from './widget-jobs-applicants/widget-jobs-applicants.component';
import { WidgetNewApplicantsComponent } from './widget-new-applicants/widget-new-applicants.component';
import { WidgetRecruitingStageExitedComponent } from './widget-recruiting-stage-exited/widget-recruiting-stage-exited.component';

export interface WidgetConfig {
  component: WidgetComponents;
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

export interface WidgetFilterSelectSource extends WidgetFilter<string[]> {
  type: WidgetFilterTypes.SelectSource;
}

export enum WidgetComponents {
  RecruitingStageExited = 'widget-recruiting-stage-exited',
  JobApplicants = 'widget-jobs-applicants',
  NewApplicants = 'widget-new-applicants',
  ApplicantsTable = 'widget-applicants-table',
  ApplicantsBySource = 'widget-applicants-by-source',
}

export enum WidgetFilterTypes {
  DateInterval = 'date-interval',
  SelectJob = 'select-job',
  SelectStage = 'select-stage',
  InputText = 'input-text',
  SelectSource = 'select-source',
}

export type WidgetFilterTypeUnion = `${WidgetFilterTypes}`;

export type WidgetFilterUnion =
  | WidgetFilterDateInterval
  | WidgetFilterSelectJob
  | WidgetFilterSelectStage
  | WidgetFilterInputText
  | WidgetFilterSelectSource;

export type EntryComponents = {
  [WidgetComponents.RecruitingStageExited]: WidgetRecruitingStageExitedComponent;
  [WidgetComponents.JobApplicants]: WidgetJobsApplicantsComponent;
  [WidgetComponents.NewApplicants]: WidgetNewApplicantsComponent;
  [WidgetComponents.ApplicantsTable]: WidgetApplicantsTableComponent;
  [WidgetComponents.ApplicantsBySource]: WidgetApplicantsBySourceComponent;
};

export type EntryComponentsUnion = EntryComponents[keyof EntryComponents];

export const entryComponents = {
  [WidgetComponents.RecruitingStageExited]:
    WidgetRecruitingStageExitedComponent,
  [WidgetComponents.JobApplicants]: WidgetJobsApplicantsComponent,
  [WidgetComponents.NewApplicants]: WidgetNewApplicantsComponent,
  [WidgetComponents.ApplicantsTable]: WidgetApplicantsTableComponent,
  [WidgetComponents.ApplicantsBySource]: WidgetApplicantsBySourceComponent,
};

export const defaultWidgetConfig: WidgetConfig = {
  fullscreen: false,
  component: WidgetComponents.RecruitingStageExited,
  filters: [],
  id: 'default',
};
