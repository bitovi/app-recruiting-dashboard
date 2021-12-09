import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface FilterState {
  startDate: Date;
  endDate: Date;
}

export const getDateMinusDays = (date: Date, days: number) => {
  return new Date(new Date().setDate(date.getDate() - days));
};

@Injectable()
export class FilterStore extends ComponentStore<FilterState> {
  readonly startDate$ = this.select((state) => state.startDate);
  readonly endDate$ = this.select((state) => state.endDate);

  constructor() {
    super({ startDate: getDateMinusDays(new Date(), 30), endDate: new Date() });
  }
}
