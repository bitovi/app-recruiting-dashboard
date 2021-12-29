import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

export interface FilterState {
  startDate: Date;
  endDate: Date;
}

export const getDateMinusDays = (date: Date, days: number) => {
  return new Date(new Date().setDate(date.getDate() - days));
};

export const DEFAULT_LAST_N_DAYS = 7;

@Injectable()
export class FilterStore extends ComponentStore<FilterState> {
  readonly startDate$ = this.select((state) => state.startDate);
  readonly endDate$ = this.select((state) => state.endDate);
  readonly combinedDates$: Observable<[Date, Date]> = this.select((state) => [
    state.startDate,
    state.endDate,
  ]);

  constructor() {
    super({
      startDate: new Date(
        getDateMinusDays(new Date(), DEFAULT_LAST_N_DAYS).setHours(0, 0, 0, 0)
      ),
      endDate: new Date(new Date().setHours(23, 59, 59, 999)),
    });
  }

  setDates(startDate: Date, endDate: Date) {
    const state = {
      startDate: new Date(startDate.setHours(0, 0, 0, 0)),
      endDate: new Date(endDate.setHours(23, 59, 59, 999)),
    };
    this.setState(state);
  }
}
