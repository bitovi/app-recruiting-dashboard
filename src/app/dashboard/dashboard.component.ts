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
import { BarChartDataSet } from './dashboard-widget/dashboard-bar-chart/dashboard-bar-chart.component';
import { LabelToArrayPipe } from './shared/pipe/label-to-array.pipe';
import { INglDatatableSort } from 'ng-lightning';
import { ChartsStore } from './store/charts.store';
import { DateFilter } from './store/store.model';

@Component({
  selector: 'brd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FilterStore, ApplicantsStore, ChartsStore],
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

  readonly applicants$ = this.applicantsStore.applicants$;
  readonly totalApplicants$ = this.applicantsStore.totalApplicants$;
  readonly applicantsPageSize$ = this.applicantsStore.pageSize$;
  readonly applicantsCurrentPage$ = this.applicantsStore.currentPage$;
  readonly applicantsSort$ = this.applicantsStore.sort$;
  readonly applicantsFilter$ = this.applicantsStore.filter$;

  readonly applicantsLineChartDataSet$ = this.chartsStore.newApplicants$.pipe(
    map((newApplicants) =>
      newApplicants.map((data) => ({
        x: Date.parse(data.applyDate),
        y: data.total,
      }))
    )
  );

  readonly recruitingStageExitedLabels$ =
    this.chartsStore.recruitingStageExited$.pipe(
      map((data) => data.map((value) => value.stage))
    );
  readonly recruitingStageExitedValues$ =
    this.chartsStore.recruitingStageExited$.pipe(
      map((data) => data.map((value) => value.total))
    );

  readonly jobBarChartDataSet$: Observable<BarChartDataSet> =
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

  readonly applicantsLoading$ = this.applicantsStore.loading$;
  readonly newApplicantsLoading$ = this.chartsStore.loadingNewApplicants$;
  readonly jobsApplicantsLoading$ = this.chartsStore.loadingJobsApplicants$;

  constructor(
    private readonly filterStore: FilterStore,
    private readonly applicantsStore: ApplicantsStore,
    private readonly chartsStore: ChartsStore,
    private labelToArrayPipe: LabelToArrayPipe
  ) {}

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

  onFilterChange(filter: DateFilter) {
    this.applicantsStore.setFilter(filter);
  }
}
