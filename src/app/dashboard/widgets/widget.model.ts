import { IDateFilter } from 'src/app/core/interfaces';
import { WidgetApplicantsTableComponent } from './widget-applicants-table/widget-applicants-table.component';
import { WidgetJobsApplicantsComponent } from './widget-jobs-applicants/widget-jobs-applicants.component';
import { WidgetNewApplicantsComponent } from './widget-new-applicants/widget-new-applicants.component';
import { WidgetRecruitingStageExitedComponent } from './widget-recruiting-stage-exited/widget-recruiting-stage-exited.component';

export interface WidgetConfig {
  component: keyof EntryComponents;
  filters?: WidgetFilterUnion[];
  /**
   * allow fullscreen mode
   */
  fullscreen: boolean;
}

export interface WidgetFilter<T> {
  id: string;
  type: WidgetFilterTypes;
  value: T;
}

export interface WidgetFilterDateInterval extends WidgetFilter<IDateFilter> {
  type: 'date-interval';
}

export interface WidgetFilterSelect extends WidgetFilter<string> {
  type: 'select';
}

export type WidgetFilterTypes = 'date-interval' | 'select';
export type WidgetFilterUnion = WidgetFilterDateInterval | WidgetFilterSelect;

export type EntryComponents = {
  'widget-recruiting-stage-exited': WidgetRecruitingStageExitedComponent;
  'widget-jobs-applicants': WidgetJobsApplicantsComponent;
  'widget-new-applicants': WidgetNewApplicantsComponent;
  'widget-applicants-table': WidgetApplicantsTableComponent;
};

export type EntryComponentsUnion = EntryComponents[keyof EntryComponents];

export const entryComponents = {
  'widget-recruiting-stage-exited': WidgetRecruitingStageExitedComponent,
  'widget-jobs-applicants': WidgetJobsApplicantsComponent,
  'widget-new-applicants': WidgetNewApplicantsComponent,
  'widget-applicants-table': WidgetApplicantsTableComponent,
};

export const defaultWidgetConfig: WidgetConfig = {
  fullscreen: false,
  component: 'widget-recruiting-stage-exited',
  filters: [],
};
