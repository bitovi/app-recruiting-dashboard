import {
  WidgetComponents,
  WidgetFilterTypes,
  WidgetFilterUnion,
} from '../widgets/widget.model';

export interface WidgetPanelModel {
  widget: WidgetComponents;
  title: string;
  description: string;
  initials: string;
  columnSpan: number;
  widgetFilters: WidgetFilterUnion[];
}

const widget_jobs_applicants: WidgetPanelModel = {
  widget: WidgetComponents.JobApplicants,
  title: 'Jobs Applicants',
  description: 'A chart indicating list of all Job Openings',
  initials: 'JO',
  columnSpan: 1,
  widgetFilters: [],
};

const widget_applicants_table: WidgetPanelModel = {
  widget: WidgetComponents.ApplicantsTable,
  title: 'Applicants Table',
  description:
    'A Datatable Indicating list of applicant and the position they applied to',
  initials: 'AT',
  columnSpan: 2,
  widgetFilters: [
    {
      id: WidgetFilterTypes.DateInterval,
      type: WidgetFilterTypes.DateInterval,
      value: {
        startDate: null,
        endDate: null,
      },
    },
    {
      id: WidgetFilterTypes.SelectJob,
      type: WidgetFilterTypes.SelectJob,
      value: [],
    },
    {
      id: WidgetFilterTypes.InputText,
      type: WidgetFilterTypes.InputText,
      value: '',
    },
  ],
};

const widget_applicants_by_source: WidgetPanelModel = {
  widget: WidgetComponents.ApplicantsBySource,
  title: 'Applicants By Source',
  description: 'A Chart showing list applicant by the medium of application',
  initials: 'ABS',
  columnSpan: 1,
  widgetFilters: [],
};

const widget_recruiting_stage_exited: WidgetPanelModel = {
  widget: WidgetComponents.RecruitingStageExited,
  title: 'Recruiting Stage Exited',
  description:
    'A Datatable Indicating list of applicant and the position they applied to',
  initials: 'RSE',
  columnSpan: 1,
  widgetFilters: [],
};

const widget_new_applicants: WidgetPanelModel = {
  widget: WidgetComponents.NewApplicants,
  title: 'New Applicant',
  description: 'A chart indicating the list of new applicant',
  initials: 'NA',
  columnSpan: 1,
  widgetFilters: [],
};

export const CHART_WIDGET: Record<WidgetComponents, WidgetPanelModel> = {
  [WidgetComponents.JobApplicants]: widget_jobs_applicants,
  [WidgetComponents.ApplicantsTable]: widget_applicants_table,
  [WidgetComponents.ApplicantsBySource]: widget_applicants_by_source,
  [WidgetComponents.RecruitingStageExited]: widget_recruiting_stage_exited,
  [WidgetComponents.NewApplicants]: widget_new_applicants,
};
