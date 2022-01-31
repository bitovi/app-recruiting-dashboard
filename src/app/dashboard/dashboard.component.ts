import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterDateState, FilterStore } from './store/filter.store';
import { ApplicantsStore } from './store/applicants.store';
import { ChartsStore } from './store/charts.store';
import { JobsStore } from './store/jobs.store';
import {
  WidgetConfig,
  WidgetComponents,
  WidgetFilterTypes,
} from './widgets/widget.model';
import { WidgetPanelModel } from './widget-panel/widget-panel-model';
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
export class DashboardComponent {
  @ViewChild('gridSection') gridSectionElement: ElementRef<HTMLElement>;

  readonly totalApplicants$ = this.applicantsStore.totalApplicants$;
  readonly startDate$: Observable<Date> = this.filterStore.startDate$;
  readonly endDate$: Observable<Date> = this.filterStore.endDate$;

  selectedFullscreenWidget: WidgetConfig = null;

  isOpenedWidgetPanel = false;

  widgetConfigs: WidgetConfig[] = [
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
        {
          id: 'input-text-days-inactive',
          type: WidgetFilterTypes.InputText,
          value: '',
          label: 'Days Inactive',
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
      filters: [
        {
          id: 'select-stage',
          type: WidgetFilterTypes.SelectStage,
          value: [],
        },
      ],
      fullscreen: true,
      id: crypto.randomUUID(),
    },
  ];

  draggedWidget!: WidgetComponents;

  constructor(
    private readonly filterStore: FilterStore,
    private readonly applicantsStore: ApplicantsStore
  ) {}

  reArrangeWidgetItems(index: number, position: number) {
    const tempArray = [...this.widgetConfigs];
    const draggedWidgetConfig = this.widgetConfigs.find(
      (value) => value.component === this.draggedWidget
    );
    const draggedItemIndex = this.widgetConfigs.indexOf(draggedWidgetConfig);

    if (
      !this.isOpenedWidgetPanel ||
      draggedItemIndex === index ||
      draggedItemIndex < 0
    ) {
      return;
    }

    // Remove drag item from array
    tempArray.splice(draggedItemIndex, 1);
    // calculate adjusted destination location
    const destIndex = index + Math.max(0, position);
    const adjustedDestIndex =
      destIndex + (destIndex > draggedItemIndex ? -1 : 0);
    // insert dragged item at destination
    tempArray.splice(adjustedDestIndex, 0, draggedWidgetConfig);
    // update config array
    this.widgetConfigs = [...tempArray];
  }

  public setFilterState(state: FilterDateState): void {
    this.filterStore.setDates(state.startDate, state.endDate);
  }

  removeWidget(widgetId: string): void {
    this.widgetConfigs = this.widgetConfigs.filter((w) => w.id !== widgetId);
  }

  onWidgetDragStart(widget: WidgetComponents): void {
    this.draggedWidget = widget;
  }

  onWidgetDragAction(index: number, event: WidgetDragActionEvent): void {
    if (
      event.action === WidgetDragAction.Enter ||
      event.action === WidgetDragAction.Change
    ) {
      this.reArrangeWidgetItems(index, event.position);
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
      this.widgetConfigs = [...this.widgetConfigs, widgetToAdd];
    }
  }

  onDragOver(ev: DragEvent) {
    ev.preventDefault();
  }
}
