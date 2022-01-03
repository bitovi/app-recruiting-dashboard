import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import moment from 'moment';
import { Observable } from 'rxjs';

export interface FilterState {
  startDate: Date;
  endDate: Date;
}

export const DEFAULT_LAST_N_DAYS = 7;
@Injectable()
export class FilterStore extends ComponentStore<FilterState> {
  readonly startDate$ = this.select((state: FilterState) => state.startDate);
  readonly endDate$ = this.select((state: FilterState) => state.endDate);
  readonly combinedDates$: Observable<[Date, Date]> = this.select((state) => [
    state.startDate,
    state.endDate,
  ]);

  constructor() {
    super({
      startDate: moment()
        .subtract(DEFAULT_LAST_N_DAYS, 'days')
        .startOf('day')
        .toDate(),
      endDate: moment().endOf('day').toDate(),
    });
  }

  public setDates(startDate: Date, endDate: Date) {
    const updatedState = {
      startDate: moment(startDate).startOf('day').toDate(),
      endDate: moment(endDate).endOf('day').toDate(),
    };
    this.setState(updatedState);
  }
}
