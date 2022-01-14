import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterDateState, FilterStore } from './store/filter.store';
import { ApplicantsStore } from './store/applicants.store';
import { ChartsStore } from './store/charts.store';
import { JobsStore } from './store/jobs.store';
import { WidgetConfig, WidgetLabels } from './widgets/widget.model';
import { CHART_WIDGET, WidgetPanelModel } from './widget-panel/widget-panel-model';
import {
  WidgetDragAction,
  WidgetDragActionEvent,
} from './widgets/widget-wrapper.model';

@Component({
  selector: 'brd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FilterStore, ApplicantsStore, ChartsStore, JobsStore],
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('placeholderBefore')
  placeholderBeforeElement: ElementRef<HTMLDivElement>;
  @ViewChild('placeholderAfter')
  placeholderAfterElement: ElementRef<HTMLDivElement>;
  @ViewChild('gridSection') gridSectionElement: ElementRef<HTMLElement>;

  readonly totalApplicants$ = this.applicantsStore.totalApplicants$;
  readonly startDate$: Observable<Date> = this.filterStore.startDate$;
  readonly endDate$: Observable<Date> = this.filterStore.endDate$;

  selectedFullscreenWidget: WidgetConfig = null;

  isOpenedWidgetPanel = false;

  widgetConfigs: WidgetConfig[] = [
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

  constructor(
    private readonly filterStore: FilterStore,
    private readonly applicantsStore: ApplicantsStore
  ) {}

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
    el.insertAdjacentElement(
      'afterend',
      this.placeholderAfterElement.nativeElement
    );
  }

  setPlaceholderWidths(before: number | string, after: number | string): void {
    this.placeholderBeforeElement.nativeElement.setAttribute(
      'style',
      `--size: ${before}`
    );
    this.placeholderAfterElement.nativeElement.setAttribute(
      'style',
      `--size: ${after}`
    );
  }

  public setFilterState(state: FilterDateState) {
    this.filterStore.setDates(state.startDate, state.endDate);
  }

  public removeWidget(widgetId: string): void {
    this.widgetConfigs = this.widgetConfigs.filter((w) => w.id !== widgetId);
  }

  onWidgetDragStart(widget: WidgetLabels): void {
    console.info('DragStart', {widget, oldValue: this.draggedWidget});
    this.draggedWidget = widget;
  }

  onWidgetDragAction(index: number, event: WidgetDragActionEvent): void {
    const colSize = CHART_WIDGET[this.draggedWidget].columnSpan;
    switch (event.action) {
      case WidgetDragAction.Enter:
        this.injectPlaceholders(index);
        if (event.position > 0) {
          this.setPlaceholderWidths(0, colSize);
        } else {
          this.setPlaceholderWidths(colSize, 0);
        }
        break;
      case WidgetDragAction.Change:
        this.setPlaceholderWidths(
          event.position < 0 ? colSize : 0,
          event.position > 0 ? colSize : 0
        );
        break;
      case WidgetDragAction.Cancel:
        this.setPlaceholderWidths(0, 0);
        break;
    }
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
      this.setPlaceholderWidths(0, 0);
      this.widgetConfigs = [...this.widgetConfigs, widgetToAdd];
    }
  }

  onDragOver(ev: DragEvent) {
    ev.preventDefault();
  }
}
