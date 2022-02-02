import {
  WidgetComponents,
  WidgetConfig,
  WidgetFilterTypes,
} from '../widgets/widget.model';

export const defaultWidgets: WidgetConfig[] = [
  {
    component: WidgetComponents.ApplicantsTable,
    filters: [
      {
        id: 'date-interval',
        type: WidgetFilterTypes.DateInterval,
        value: {
          startDate: null,
          endDate: null,
        },
      },
      {
        id: 'select-job',
        type: WidgetFilterTypes.SelectJob,
        value: [],
      },
      {
        id: 'select-stage',
        type: WidgetFilterTypes.SelectStage,
        value: [],
      },
      {
        id: 'input-text',
        type: WidgetFilterTypes.InputText,
        value: '',
        label: 'Name',
      },
      {
        id: 'input-text-days-inactive',
        type: WidgetFilterTypes.InputText,
        value: '',
        label: 'Days Inactive',
      },
    ],
    fullscreen: true,
    id: crypto.randomUUID(),
  },
  {
    component: WidgetComponents.RecruitingStageExited,
    fullscreen: true,
    id: crypto.randomUUID(),
  },
  {
    component: WidgetComponents.JobApplicants,
    fullscreen: true,
    id: crypto.randomUUID(),
  },
  {
    component: WidgetComponents.NewApplicants,
    fullscreen: true,
    id: crypto.randomUUID(),
  },
  {
    component: WidgetComponents.ApplicantsBySource,
    filters: [
      {
        id: 'select-stage',
        type: WidgetFilterTypes.SelectStage,
        value: [],
      },
    ],
    fullscreen: true,
    id: crypto.randomUUID(),
  },
];
