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
import { EntryComponents, WidgetConfig } from './widgets/widget.model';

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

  public selectedFullscreenWidget: WidgetConfig = null;
  public gridOptions: GridsterConfig;
  public initialGridItems: GridsterItem[] = [
    { cols: 10, rows: 20, x: 0, y: 0 },
    { cols: 10, rows: 20, x: 2, y: 0 },
    { cols: 10, rows: 20, x: 0, y: 2 },
    { cols: 10, rows: 20, x: 2, y: 2 },
    { cols: 10, rows: 20, x: 0, y: 4 },
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
          id: 'select-job',
          type: 'select-job',
          value: [],
        },
      ],
      fullscreen: true,
      id: crypto.randomUUID(),
    },
    {
      component: 'widget-recruiting-stage-exited',
      fullscreen: true,
      id: crypto.randomUUID(),
    },
    {
      component: 'widget-jobs-applicants',
      fullscreen: true,
      id: crypto.randomUUID(),
    },
    {
      component: 'widget-new-applicants',
      fullscreen: true,
      id: crypto.randomUUID(),
    },
    {
      component: 'widget-applicants-by-source',
      fullscreen: true,
      id: crypto.randomUUID(),
    },
  ];

  private draggedWidget: keyof EntryComponents = null;
  private defaultWidgetRows = 2;
  private defaultWidgetColumns = 2;

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
      enableOccupiedCellDrop: true,
      enableEmptyCellDrop: true,
      emptyCellDropCallback: (event: DragEvent, item: GridsterItem) =>
        this.addWidgetToBoard(event, item),
    };
  }

  public setFilterState(state: FilterDateState) {
    this.filterStore.setDates(state.startDate, state.endDate);
  }

  public setDraggedElement(widget: keyof EntryComponents) {
    this.draggedWidget = widget;
  }

  public setFullScreenWidget(widgetConfig: WidgetConfig): void {
    this.selectedFullscreenWidget = widgetConfig;
  }

  private addWidgetToBoard(event: DragEvent, item: GridsterItem): void {
    const widgetToAdd: WidgetConfig = {
      component: this.draggedWidget,
      fullscreen: true,
      id: crypto.randomUUID(),
    };
    this.widgetConfigs = [...this.widgetConfigs, widgetToAdd];

    const itemConfig: GridsterItem = {
      ...item,
      rows: this.defaultWidgetRows,
      cols: this.defaultWidgetColumns,
    };

    this.initialGridItems = [...this.initialGridItems, itemConfig];
  }
}
