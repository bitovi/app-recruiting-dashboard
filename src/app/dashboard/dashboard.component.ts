import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterDateState, FilterStore } from './store/filter.store';
import { ApplicantsStore } from './store/applicants.store';
import { ChartsStore } from './store/charts.store';
import { JobsStore } from './store/jobs.store';
import {
  DisplayGrid,
  GridsterConfig,
  GridsterItem,
  GridType,
} from 'angular-gridster2';
import { WidgetConfig } from './dashboard-widget/widget.model';

@Component({
  selector: 'brd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FilterStore, ApplicantsStore, ChartsStore, JobsStore],
})
export class DashboardComponent implements OnInit {
  public readonly totalApplicants$ = this.applicantsStore.totalApplicants$;
  public readonly startDate$: Observable<Date> = this.filterStore.startDate$;
  public readonly endDate$: Observable<Date> = this.filterStore.endDate$;

  public gridOptions: GridsterConfig;
  public initialGridItems: GridsterItem[] = [
    { cols: 2, rows: 2, x: 0, y: 0 },
    { cols: 2, rows: 2, x: 2, y: 0 },
    { cols: 2, rows: 2, x: 0, y: 2 },
    { cols: 2, rows: 2, x: 2, y: 2 },
  ];
  public widgetConfigs: WidgetConfig[] = [
    {
      component: 'widget-applicants-table',
      filters: [
        {
          id: 'date-interval',
          type: 'date-interval',
          value: {
            startDate: null,
            endDate: null,
          },
        },
        {
          id: 'test2',
          type: 'select',
          value: 'test',
        },
      ],
      fullscreen: true,
    },
    {
      component: 'widget-recruiting-stage-exited',
      fullscreen: true,
    },
    {
      component: 'widget-jobs-applicants',
      fullscreen: true,
    },
    {
      component: 'widget-new-applicants',
      fullscreen: true,
    },
  ];

  constructor(
    private readonly filterStore: FilterStore,
    private readonly applicantsStore: ApplicantsStore
  ) {}

  public ngOnInit() {
    this.gridOptions = {
      gridType: GridType.Fit,
      displayGrid: DisplayGrid.Always,
      pushItems: true,
      swap: true,
      swapWhileDragging: false,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
    };
  }

  public setFilterState(state: FilterDateState) {
    this.filterStore.setDates(state.startDate, state.endDate);
  }
}
