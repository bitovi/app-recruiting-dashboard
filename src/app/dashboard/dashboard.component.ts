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
import {
  EntryComponents,
  WidgetComponents,
  WidgetConfig,
  WidgetFilterTypes,
} from './widgets/widget.model';

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
    { cols: 2, rows: 5, x: 0, y: 0 },
    { cols: 2, rows: 3, x: 2, y: 0 },
    { cols: 2, rows: 4, x: 0, y: 2 },
    { cols: 2, rows: 4, x: 2, y: 2 },
    { cols: 2, rows: 4, x: 0, y: 4 },
  ];
  public widgetConfigs: WidgetConfig[] = [
    {
      component: WidgetComponents.ApplicantsTable,
      filters: [
        {
          id: 'date-interval',
          type: WidgetFilterTypes.DateInterval,
          value: {
            startDate: null,
            endDate: null,
          },
        },
        {
          id: 'select-job',
          type: WidgetFilterTypes.SelectJob,
          value: [],
        },
        {
          id: 'select-stage',
          type: WidgetFilterTypes.SelectStage,
          value: [],
        },
        {
          id: 'select-source',
          type: WidgetFilterTypes.SelectSource,
          value: [],
        },
        {
          id: 'input-text',
          type: WidgetFilterTypes.InputText,
          value: '',
          label: 'Name',
        },
      ],
      fullscreen: true,
      id: crypto.randomUUID(),
    },
    {
      component: WidgetComponents.RecruitingStageExited,
      fullscreen: true,
      id: crypto.randomUUID(),
    },
    {
      component: WidgetComponents.JobApplicants,
      fullscreen: true,
      id: crypto.randomUUID(),
    },
    {
      component: WidgetComponents.NewApplicants,
      fullscreen: true,
      id: crypto.randomUUID(),
    },
    {
      component: WidgetComponents.ApplicantsBySource,
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

  public ngOnInit(): void {
    this.gridOptions = {
      gridType: GridType.VerticalFixed,
      fixedRowHeight: 90,
      compactType: 'compactUp',
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

  public setFilterState(state: FilterDateState): void {
    this.filterStore.setDates(state.startDate, state.endDate);
  }

  public setDraggedElement(widget: keyof EntryComponents): void {
    this.draggedWidget = widget;
  }

  public setFullScreenWidget(widgetConfig: WidgetConfig): void {
    this.selectedFullscreenWidget = widgetConfig;
  }

  public removeWidget(widgetId: string): void {
    const widgetIndex: number = this.widgetConfigs.findIndex(
      (widget: WidgetConfig) => widget.id === widgetId
    );

    this.widgetConfigs.splice(widgetIndex, 1);
    this.initialGridItems.splice(widgetIndex, 1);
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
