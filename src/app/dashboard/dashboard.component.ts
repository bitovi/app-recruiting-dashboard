import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { FilterState, FilterStore } from './store/filter.store';
import { ApplicantFilter, ApplicantsStore } from './store/applicants.store';
import { map } from 'rxjs/operators';
import {
  DashboardWidgets,
  ViewWidgetModal,
  WidgetFieldType,
  WidgetsHeader,
} from './shared/dashboard-model';
import { JobService } from './store/job.service';
import { BarChartDataSet } from './dashboard-widget/dashboard-bar-chart/dashboard-bar-chart.component';
import { LabelToArrayPipe } from './shared/pipe/label-to-array.pipe';
import { INglDatatableSort } from 'ng-lightning';

@Component({
  selector: 'brd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FilterStore, ApplicantsStore],
})
export class DashboardComponent {
  date: Date = new Date();
  viewWidgetModal: ViewWidgetModal = {
    openModal: false,
    openedModal: undefined,
  };
  dashboardWidgets = DashboardWidgets;
  readonly startDate$: Observable<Date> = this.filterStore.startDate$;
  readonly endDate$: Observable<Date> = this.filterStore.endDate$;
  readonly combinedDates$: Observable<[Date, Date]> =
    this.filterStore.combinedDates$;

  barChartFilterFields: WidgetsHeader = {
    widgetType: DashboardWidgets.BAR_CHART,
    widgetFilterFields: [
      { fieldType: WidgetFieldType.DATE_RANGE },
      { fieldType: WidgetFieldType.CHECK_BOX, fields: [{}] },
    ],
  };

  doughnutChartFilterFields: WidgetsHeader = {
    widgetType: DashboardWidgets.DOUGHNUT_CHART,
    widgetFilterFields: [],
  };

  readonly combinedDatesFormatted$ = this.combinedDates$.pipe(
    map((combinedDates) => {
      const startDate = formatDate(combinedDates[0], 'yyyy-MM-dd', this.locale);
      const endDate = formatDate(combinedDates[1], 'yyyy-MM-dd', this.locale);
      return [startDate, endDate];
    })
  );

  readonly applicants$ = this.applicantsStore.applicants$;
  readonly totalApplicants$ = this.applicantsStore.totalApplicants$;
  readonly applicantsPageSize$ = this.applicantsStore.pageSize$;
  readonly applicantsCurrentPage$ = this.applicantsStore.currentPage$;
  readonly applicantsSort$ = this.applicantsStore.sort$;
  readonly applicantsFilter$ = this.applicantsStore.filter$;

  readonly filteredApplicants$ = combineLatest([
    this.combinedDatesFormatted$,
    this.applicants$,
  ]).pipe(
    map(([[startDate, endDate], applicants]) => {
      return applicants.filter((applicant) => {
        const parsedApplyDate = Date.parse(applicant.apply_date);
        const parsedStartDate = Date.parse(startDate);
        const parsedEndDate = Date.parse(endDate);
        return (
          parsedApplyDate >= parsedStartDate && parsedApplyDate <= parsedEndDate
        );
      });
    })
  );
  readonly applicantsLineChartDataSet$ = this.filteredApplicants$.pipe(
    map((applicants) => {
      const mapped: { [key: string]: number } = applicants.reduce(
        (prev: { [key: string]: number }, curr) => {
          const date = curr.apply_date;
          const sum = prev[date];
          return { ...prev, [date]: sum >= 0 ? sum + 1 : 1 };
        },
        {}
      );

      return Object.entries(mapped).map(([key, value]) => ({
        x: Date.parse(key),
        y: value,
      }));
    })
  );

  readonly jobs$ = this.jobService.entities$;

  readonly jobBarChartDataSet$: Observable<BarChartDataSet> = combineLatest([
    this.jobs$,
    this.filteredApplicants$,
  ]).pipe(
    map(([jobs, applicants]) => {
      const labels = jobs.map((job) =>
        this.labelToArrayPipe.transform(job.title, 2)
      );
      const mapped = applicants.reduce(
        (prev: { [key: string]: number }, curr) => {
          const jobId = curr.job_id;
          const sum = prev[jobId];
          return { ...prev, [jobId]: sum >= 0 ? sum + 1 : 1 };
        },
        {}
      );
      const data = jobs.map((job) => mapped[job.id]);
      return { data, labels };
    })
  );

  readonly getJobs$ = this.jobService.getWithQuery('status=open');

  readonly applicantsLoading$ = this.applicantsStore.loading$;
  readonly jobsLoading$ = this.jobService.loading$;

  constructor(
    private readonly filterStore: FilterStore,
    private readonly applicantsStore: ApplicantsStore,
    private readonly jobService: JobService,
    private labelToArrayPipe: LabelToArrayPipe,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.getJobs$.subscribe();
  }

  setFilterState(state: FilterState) {
    this.filterStore.setDates(state.startDate, state.endDate);
  }

  closeModal() {
    this.viewWidgetModal = { openModal: false, openedModal: undefined };
  }

  onPageChange(page: number) {
    this.applicantsStore.setPage(page);
  }

  onSortChange(sort: INglDatatableSort) {
    this.applicantsStore.setSort(sort);
  }

  onFilterChange(filter: ApplicantFilter) {
    this.applicantsStore.setFilter(filter);
  }
}
