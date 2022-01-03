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

export interface WidgetsHeader {
  widgetType: DashboardWidgets;
  widgetFilterFields?: WidgetFilterFields[];
}

export interface WidgetFilterFields {
  fieldType: WidgetFieldType | undefined;
  fields?: {};
}

export enum WidgetFieldType {
  DATE_RANGE = 'DateRange',
  CHECK_BOX = 'CheckBox',
}

export interface ViewWidgetModal {
  openModal: boolean;
  openedModal: DashboardWidgets | undefined;
}
