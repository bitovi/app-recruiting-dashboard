import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterState, FilterStore } from './store/filter.store';
import { ApplicantsStore } from './store/applicants.store';
import { ChartsStore } from './store/charts.store';
import { JobsStore } from './store/jobs.store';

@Component({
  selector: 'brd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FilterStore, ApplicantsStore, ChartsStore, JobsStore],
})
export class DashboardComponent {
  public readonly totalApplicants$ = this.applicantsStore.totalApplicants$;
  public readonly startDate$: Observable<Date> = this.filterStore.startDate$;
  public readonly endDate$: Observable<Date> = this.filterStore.endDate$;

  constructor(
    private readonly filterStore: FilterStore,
    private readonly applicantsStore: ApplicantsStore
  ) {}

  public setFilterState(state: Pick<FilterState, 'startDate' | 'endDate'>) {
    this.filterStore.setDates(state.startDate, state.endDate);
  }
}
