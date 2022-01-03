import { WidgetRecruitingStageExitedComponent } from './widget-recruiting-stage-exited/widget-recruiting-stage-exited.component';

export interface WidgetConfig {
  component: keyof EntryComponents;
  /**
   * allow fullscreen mode
   */
  fullscreen: boolean;
}

export type EntryComponents = {
  'widget-recruiting-stage-exited': WidgetRecruitingStageExitedComponent;
};

export type EntryComponentsUnion = EntryComponents[keyof EntryComponents];

export const entryComponents = {
  'widget-recruiting-stage-exited': WidgetRecruitingStageExitedComponent,
};

export const defaultWidgetConfig: WidgetConfig = {
  fullscreen: false,
  component: 'widget-recruiting-stage-exited',
};
