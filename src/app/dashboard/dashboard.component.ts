import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterState, FilterStore } from './store/filter.store';
import { ApplicantsStore } from './store/applicants.store';
import { map } from 'rxjs/operators';
import { INglDatatableSort } from 'ng-lightning';
import { ChartsStore } from './store/charts.store';
import { JobsStore } from './store/jobs.store';
import { ApplicantFilterState } from '../core/interfaces';

@Component({
  selector: 'brd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FilterStore, ApplicantsStore, ChartsStore, JobsStore],
})
export class DashboardComponent {
  public readonly applicants$ = this.applicantsStore.applicants$;
  public readonly totalApplicants$ = this.applicantsStore.totalApplicants$;
  public readonly applicantsPageSize$ = this.applicantsStore.pageSize$;
  public readonly applicantsCurrentPage$ = this.applicantsStore.currentPage$;
  public readonly applicantsSort$ = this.applicantsStore.sort$;
  public readonly applicantsFilter$ = this.applicantsStore.filters$;
  public readonly startDate$: Observable<Date> = this.filterStore.startDate$;
  public readonly endDate$: Observable<Date> = this.filterStore.endDate$;

  readonly jobsLabels$ = this.jobsStore.jobs$.pipe(
    map((jobs) => jobs.map((job) => job.title))
  );

  readonly applicantsLoading$ = this.applicantsStore.loading$;

  constructor(
    private readonly filterStore: FilterStore,
    private readonly applicantsStore: ApplicantsStore,
    private readonly jobsStore: JobsStore
  ) {}

  public setFilterState(state: FilterState) {
    this.filterStore.setDates(state.startDate, state.endDate);
  }

  public onPageChange(page: number) {
    this.applicantsStore.setPage(page);
  }

  public onSortChange(sort: INglDatatableSort) {
    this.applicantsStore.setSort(sort);
  }

  onApplicantsFilterChange(filter: Partial<ApplicantFilterState>) {
    this.applicantsStore.setFilter(filter);
  }
}
