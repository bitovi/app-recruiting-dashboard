import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  WidgetConfig,
  WidgetLabels,
} from './widgets/widget.model';
import { WidgetPanelModel } from './widget-panel/widget-panel-model';

@Component({
  selector: 'brd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FilterStore, ApplicantsStore, ChartsStore, JobsStore],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('placeholderBefore')
  placeholderBeforeElement: ElementRef<HTMLDivElement>;
  @ViewChild('placeholderAfter')
  placeholderAfterElement: ElementRef<HTMLDivElement>;
  @ViewChild('gridSection') gridSectionElement: ElementRef<HTMLElement>;

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
      component: WidgetLabels.ApplicantTable,
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
        {
          id: 'input-text',
          type: 'input-text',
          value: '',
        },
      ],
      fullscreen: true,
      id: crypto.randomUUID(),
    },
    {
      component: WidgetLabels.RecruitingStageExited,
      fullscreen: true,
      id: crypto.randomUUID(),
    },
    {
      component: WidgetLabels.JobApplicants,
      fullscreen: true,
      id: crypto.randomUUID(),
    },
    {
      component: WidgetLabels.NewApplicants,
      fullscreen: true,
      id: crypto.randomUUID(),
    },
    {
      component: WidgetLabels.ApplicantBySource,
      fullscreen: true,
      id: crypto.randomUUID(),
    },
  ];

  private draggedWidget!: WidgetLabels;
  private defaultWidgetRows = 2;
  private defaultWidgetColumns = 2;
  isOpenedWidgetPanel = false;

  constructor(
    private readonly filterStore: FilterStore,
    private readonly applicantsStore: ApplicantsStore
  ) {}

  public ngOnInit() {
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

  ngAfterViewInit(): void {
    console.info({
      before: this.placeholderBeforeElement,
      after: this.placeholderAfterElement,
      section: this.gridSectionElement,
    });
    this.injectPlaceholders(2);
    this.injectPlaceholders(3);
  }

  injectPlaceholders(index: number): void {
    const gridElement = this.gridSectionElement.nativeElement;
    const el = gridElement.querySelectorAll('brd-widget-wrapper')[index];
    gridElement.insertBefore(this.placeholderBeforeElement.nativeElement, el);
    el.insertAdjacentElement('afterend', this.placeholderAfterElement.nativeElement);
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

  public removeWidget(widgetId: string): void {
    this.widgetConfigs = this.widgetConfigs.filter((w) => w.id !== widgetId);
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

  onWidgetDrop(dragEvent: DragEvent) {
    const widgetName = dragEvent.dataTransfer.getData('widget-component');
    const dropZoneContainsEvent = this.widgetConfigs.findIndex(
      (value) => value.component === widgetName
    );
    if (dropZoneContainsEvent > -1) {
      return;
    }

    const data = dragEvent.dataTransfer.getData('widget-item');
    if (data) {
      const widgetItem: WidgetPanelModel = JSON.parse(data);
      const widgetToAdd: WidgetConfig = {
        component: widgetItem.widget,
        fullscreen: true,
        filters: widgetItem.widgetFilters,
        id: crypto.randomUUID(),
      };
      this.widgetConfigs = [...this.widgetConfigs, widgetToAdd];
    }
  }

  onDragOver(ev: DragEvent) {
    ev.preventDefault();
  }
}
