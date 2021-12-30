import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterState, FilterStore } from './store/filter.store';
import { ApplicantsStore } from './store/applicants.store';
import { map } from 'rxjs/operators';
import {
  DashboardWidgets,
  ViewWidgetModal,
  WidgetFieldType,
  WidgetsHeader,
} from './shared/dashboard-model';
import { LabelToArrayPipe } from './shared/pipe/label-to-array.pipe';
import { INglDatatableSort } from 'ng-lightning';
import { ChartsStore } from './store/charts.store';
import { JobsStore } from './store/jobs.store';
import { ApplicantFilterState, IBarChartDataSet } from '../core/interfaces';

@Component({
  selector: 'brd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FilterStore, ApplicantsStore, ChartsStore, JobsStore],
})
export class DashboardComponent {
  public viewWidgetModal: ViewWidgetModal = {
    openModal: false,
    openedModal: undefined,
  };
  public dashboardWidgets = DashboardWidgets;
  public barChartFilterFields: WidgetsHeader = {
    widgetType: DashboardWidgets.BAR_CHART,
    widgetFilterFields: [
      { fieldType: WidgetFieldType.DATE_RANGE },
      { fieldType: WidgetFieldType.CHECK_BOX, fields: [{}] },
    ],
  };
  public doughnutChartFilterFields: WidgetsHeader = {
    widgetType: DashboardWidgets.DOUGHNUT_CHART,
    widgetFilterFields: [],
  };

  public readonly applicants$ = this.applicantsStore.applicants$;
  public readonly totalApplicants$ = this.applicantsStore.totalApplicants$;
  public readonly applicantsPageSize$ = this.applicantsStore.pageSize$;
  public readonly applicantsCurrentPage$ = this.applicantsStore.currentPage$;
  public readonly applicantsSort$ = this.applicantsStore.sort$;
  public readonly applicantsFilter$ = this.applicantsStore.filters$;
  public readonly startDate$: Observable<Date> = this.filterStore.startDate$;
  public readonly endDate$: Observable<Date> = this.filterStore.endDate$;

  public readonly applicantsLineChartDataSet$ =
    this.chartsStore.newApplicants$.pipe(
      map((newApplicants) =>
        newApplicants.map((data) => ({
          x: Date.parse(data.applyDate),
          y: data.total,
        }))
      )
    );

  public readonly recruitingStageExitedLabels$ =
    this.chartsStore.recruitingStageExited$.pipe(
      map((data) => data.map((value) => value.stage))
    );

  public readonly recruitingStageExitedValues$ =
    this.chartsStore.recruitingStageExited$.pipe(
      map((data) => data.map((value) => value.total))
    );

  public readonly jobBarChartDataSet$: Observable<IBarChartDataSet> =
    this.chartsStore.jobsApplicants$.pipe(
      map((jobsApplicantsData) => {
        const labels = jobsApplicantsData.map((jobApplicant) =>
          this.labelToArrayPipe.transform(jobApplicant.jobTitle, 2)
        );
        const data = jobsApplicantsData.map(
          (jobApplicant) => jobApplicant.total
        );
        return { data, labels };
      })
    );

  readonly jobsLabels$ = this.jobsStore.jobs$.pipe(
    map((jobs) => jobs.map((job) => job.title))
  );

  readonly applicantsLoading$ = this.applicantsStore.loading$;
  readonly newApplicantsLoading$ = this.chartsStore.loadingNewApplicants$;
  readonly jobsApplicantsLoading$ = this.chartsStore.loadingJobsApplicants$;

  constructor(
    private readonly filterStore: FilterStore,
    private readonly applicantsStore: ApplicantsStore,
    private readonly chartsStore: ChartsStore,
    private readonly jobsStore: JobsStore,
    private labelToArrayPipe: LabelToArrayPipe
  ) {}

  public setFilterState(state: FilterState) {
    this.filterStore.setDates(state.startDate, state.endDate);
  }

  public closeModal() {
    this.viewWidgetModal = { openModal: false, openedModal: undefined };
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
