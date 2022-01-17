/*
Filters Models
*/

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
