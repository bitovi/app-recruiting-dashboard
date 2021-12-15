import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { FilterState, FilterStore } from './store/filter.store';
import { ApplicantService } from './store/applicant.service';
import { map, switchMap } from 'rxjs/operators';
import {
  DashboardWidgets,
  ViewWidgetModal,
  WidgetFieldType,
  WidgetsHeader,
} from './shared/dashboard-model';
import { JobService } from './store/job.service';
import { BarChartDataSet } from './dashboard-widget/dashboard-bar-chart/dashboard-bar-chart.component';
import { DataTable } from './dashboard-widget/data-table/data-table';

@Component({
  selector: 'brd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FilterStore],
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
  readonly applicants$ = this.applicantService.applicants$;
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
      const labels = jobs.map((job) => job.title);
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

  readonly dataTableApplicantDataSet$: Observable<DataTable[]> =
    this.filteredApplicants$.pipe(
      map((applicants) =>
        applicants.map((applicant) => ({
          id: applicant.id,
          current_stage: '-',
          name: `${applicant.first_name} ${applicant.last_name}`,
          position: applicant.job_title,
          comments: '-',
        }))
      )
    );

  readonly getApplicants$ = this.combinedDatesFormatted$.pipe(
    switchMap(([startDate, endDate]) => {
      return this.applicantService.getWithQuery(
        `from_apply_date=${startDate}&to_apply_date=${endDate}`
      );
    })
    // TO-DO: takeUntil component is destroyed
  );

  readonly getJobs$ = this.jobService.getWithQuery('status=open');

  readonly applicantsLoading$ = this.applicantService.loading$;
  readonly jobsLoading$ = this.jobService.loading$;

  constructor(
    private readonly filterStore: FilterStore,
    private readonly applicantService: ApplicantService,
    private readonly jobService: JobService,
    @Inject(LOCALE_ID) private locale: string
  ) {
    this.getApplicants$.subscribe();
    this.getJobs$.subscribe();
  }

  setFilterState(state: FilterState) {
    this.filterStore.setState(state);
  }

  closeModal() {
    this.viewWidgetModal = { openModal: false, openedModal: undefined };
  }
}
