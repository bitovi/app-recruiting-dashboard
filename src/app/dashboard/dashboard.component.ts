import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterState, FilterStore } from './filter.store';

@Component({
  selector: 'brd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FilterStore],
})
export class DashboardComponent {
  opened = false;
  date: Date = new Date();
  readonly startDate$: Observable<Date> = this.filterStore.startDate$;
  readonly endDate$: Observable<Date> = this.filterStore.endDate$;

  constructor(private readonly filterStore: FilterStore) {}

  setFilterState(state: FilterState) {
    this.filterStore.setState(state);
  }
}
