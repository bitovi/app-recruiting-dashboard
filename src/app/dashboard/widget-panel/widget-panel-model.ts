import { WidgetFilterUnion, WidgetLabels } from '../widgets/widget.model';

export interface WidgetPanelModel {
  widget: WidgetLabels;
  title: string;
  description: string;
  initials: string;
  columnSpan: number;
  widgetFilters: WidgetFilterUnion[];
}

const widget_jobs_applicants: WidgetPanelModel = {
  widget: WidgetLabels.JobApplicants,
  title: 'Jobs Applicants',
  description: 'A chart indicating list of all Job Openings',
  initials: 'JO',
  columnSpan: 1,
  widgetFilters: [],
};

const widget_applicants_table: WidgetPanelModel = {
  widget: WidgetLabels.ApplicantTable,
  title: 'Applicants Table',
  description:
    'A Datatable Indicating list of applicant and the position they applied to',
  initials: 'AT',
  columnSpan: 2,
  widgetFilters: [
    {
      id: 'date-interval',
      type: 'date-interval',
      value: {
        startDate: null,
        endDate: null,
      },
    },
    {
      id: 'select-job',
      type: 'select-job',
      value: [],
    },
    {
      id: 'input-text',
      type: 'input-text',
      value: '',
    },
  ],
};

const widget_applicants_by_source: WidgetPanelModel = {
  widget: WidgetLabels.ApplicantBySource,
  title: 'Applicants By Source',
  description: 'A Chart showing list applicant by the medium of application',
  initials: 'ABS',
  columnSpan: 1,
  widgetFilters: [],
};

const widget_recruiting_stage_exited: WidgetPanelModel = {
  widget: WidgetLabels.RecruitingStageExited,
  title: 'Recruiting Stage Exited',
  description:
    'A Datatable Indicating list of applicant and the position they applied to',
  initials: 'AT',
  columnSpan: 1,
  widgetFilters: [],
};

const widget_new_applicants: WidgetPanelModel = {
  widget: WidgetLabels.NewApplicants,
  title: 'New Applicant',
  description: 'A chart indicating the list of new applicant',
  initials: 'NA',
  columnSpan: 1,
  widgetFilters: [],
};

export const CHART_WIDGET: Record<WidgetLabels, WidgetPanelModel> = {
  [WidgetLabels.JobApplicants]: widget_jobs_applicants,
  [WidgetLabels.ApplicantTable]: widget_applicants_table,
  [WidgetLabels.ApplicantBySource]: widget_applicants_by_source,
  [WidgetLabels.RecruitingStageExited]: widget_recruiting_stage_exited,
  [WidgetLabels.NewApplicants]: widget_new_applicants,
};
