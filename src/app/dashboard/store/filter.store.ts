import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import moment from 'moment';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { WidgetFilterUnion } from '../dashboard-widget/widget.model';

export interface FilterState {
  startDate: Date;
  endDate: Date;
  widgetFilters: Map<string, Map<string, WidgetFilterUnion>>;
}

export const DEFAULT_LAST_N_DAYS = 7;
@Injectable()
export class FilterStore extends ComponentStore<FilterState> {
  readonly startDate$ = this.select(
    (state: FilterState) => state.startDate
  ).pipe(distinctUntilChanged((x, y) => x.getTime() !== y.getTime()));
  readonly endDate$ = this.select((state: FilterState) => state.endDate).pipe(
    distinctUntilChanged((x, y) => x.getTime() !== y.getTime())
  );
  readonly combinedDates$: Observable<[Date, Date]> = combineLatest([
    this.startDate$,
    this.endDate$,
  ]);
  readonly widgetFilters$ = this.select(
    (state: FilterState) => state.widgetFilters
  );

  constructor() {
    super({
      startDate: moment()
        .subtract(DEFAULT_LAST_N_DAYS, 'days')
        .startOf('day')
        .toDate(),
      endDate: moment().endOf('day').toDate(),
      widgetFilters: new Map(),
    });
  }

  public setDates(startDate: Date, endDate: Date) {
    this.setState((state) => ({
      ...state,
      startDate: moment(startDate).startOf('day').toDate(),
      endDate: moment(endDate).endOf('day').toDate(),
    }));
  }

  setWidgetFilters(id: string, filters: WidgetFilterUnion[]) {
    this.setState((state) => ({
      ...state,
      widgetFilters: new Map(
        state.widgetFilters.set(
          id,
          new Map(filters.map((obj) => [obj.id, obj]))
        )
      ),
    }));
  }

  setWidgetFilter(id: string, filter: WidgetFilterUnion) {
    this.setState((state) => ({
      ...state,
      widgetFilters: new Map(
        state.widgetFilters.set(
          id,
          new Map(state.widgetFilters.get(id).set(filter.id, filter))
        )
      ),
    }));
  }
}
