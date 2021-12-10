/*
Filters Models
*/

export interface FilterDateRange {
  startDate: string | Date;
  endDate: string | Date;
}

export interface DashboardFilters {
  durationCount: number;
  label: FiltersLabels;
}

export enum FiltersLabels {
  CUSTOM = 'Custom',
  NINETY_DAYS = '90 Days',
  SEVEN_DAYS = '7 Days',
  SIXTY_DAYS = '60 Days',
  THIRTY_DAYS = '30 Days',
}

export enum DashboardWidgets {
  PIE_CHART = 'PieChart',
  DOUGHNUT_CHART = 'DoughnutChart',
  LINE_CHART = 'LineChart',
  BAR_CHART = 'BarChart',
  DATATABLE = 'DataTable',
}

export enum WidgetFieldType {
  DATE_RANGE = 'DateRange',
}

export interface WidgetFilterFields {
  widgetType: DashboardWidgets;
  fieldType: WidgetFieldType | undefined;
}

export interface ViewWidgetModal {
  openModal: boolean;
  openedModal: DashboardWidgets | undefined;
}

interface JobOpenings {
  data: number[]; // count active applicant per team
  team: string[]; // list of open team
}

interface ExitedInRecruitingStages {
  data: number[]; // count of active applicant per stage
  stage: string[]; //  Recruiting Stages
}

interface DateRangeApplicant {
  data: DateApplied[];
  minDate: Date;
  maxDate: Date;
}

/* less than if range less than 30 days group and count applicant by days, if more than 30 day group and count applicant by month */
interface DateApplied {
  x: Date; // number of applicant per day / month,
  applicant: number; // number of applicant per date,
}

interface DashboardWidgetData {
  startDate: Date; //  isoString YY MM DD
  endDate: Date; //  isoString YY MM DD
  jobId?: string; // filter list by job id --optional
  recruitingStage?: string; // filter list by job id --optional
  teamId?: string; //
}

// Get data
interface GetTableDataById {
  rangeId: string;
}
