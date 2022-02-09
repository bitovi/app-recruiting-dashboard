import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterDateState, FilterStore } from './store/filter.store';
import { ApplicantsStore } from './store/applicants.store';
import { ChartsStore } from './store/charts.store';
import { JobsStore } from './store/jobs.store';
import { WidgetConfig, WidgetComponents } from './widgets/widget.model';
import { WidgetPanelModel } from './widget-panel/widget-panel-model';
import {
  WidgetDragAction,
  WidgetDragActionEvent,
} from './widgets/widget-wrapper.model';
import { WidgetsApiService } from './services/widgets-api.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'brd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [FilterStore, ApplicantsStore, ChartsStore, JobsStore],
})
export class DashboardComponent implements OnInit {
  @ViewChild('gridSection') gridSectionElement: ElementRef<HTMLElement>;

  public readonly totalApplicants$ = this.applicantsStore.totalApplicants$;
  public readonly startDate$: Observable<Date> = this.filterStore.startDate$;
  public readonly endDate$: Observable<Date> = this.filterStore.endDate$;

  public selectedFullscreenWidget: WidgetConfig = null;
  public isOpenedWidgetPanel = false;
  public widgetConfigs: WidgetConfig[] = [];
  public isLoadingWidgets = false;

  private draggedWidget!: WidgetComponents;
  private draggedWidget!: WidgetComponents | string;

  constructor(
    private readonly filterStore: FilterStore,
    private readonly applicantsStore: ApplicantsStore,
    private widgetsApiService: WidgetsApiService
  ) {}

  public ngOnInit(): void {
    this.loadWidgets();
  }

  public setFilterState(state: FilterDateState): void {
    this.filterStore.setDates(state.startDate, state.endDate);
  }

  public removeWidget(widgetId: string): void {
    this.widgetConfigs = this.widgetConfigs.filter((w) => w.id !== widgetId);
  }

  public onWidgetDragStart(widget: WidgetComponents): void {
    this.draggedWidget = widget;
  }

  public onWidgetDragAction(index: number, event: WidgetDragActionEvent): void {
    if (
      event.action === WidgetDragAction.Enter ||
      event.action === WidgetDragAction.Change
    ) {
      this.reArrangeWidgetItems(index, event.position);
    }
  }

  public onWidgetDrop(dragEvent: DragEvent) {
    const widgetName = dragEvent.dataTransfer.getData('widget-component');
    const widgetComponentSelector: string[] = Object.values(WidgetComponents);
    const isWidgetSelector: boolean =
      widgetComponentSelector.includes(widgetName);

    if (!isWidgetSelector) {
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

  public onDragOver(ev: DragEvent) {
    ev.preventDefault();
  }

  private reArrangeWidgetItems(index: number, position: number): void {
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
    this.saveWidgets(this.widgetConfigs);
  }

  private loadWidgets(): void {
    this.isLoadingWidgets = true;
    this.widgetsApiService
      .getWidgets()
      .pipe(take(1))
      .subscribe({
        next: (widgets: WidgetConfig[]) => {
          this.widgetConfigs = widgets;
          this.isLoadingWidgets = false;
        },
        error: () => {
          this.isLoadingWidgets = false;
        },
      });
  }

  private saveWidgets(widgetConfigs: WidgetConfig[]): void {
    this.widgetsApiService
      .saveWidgets(widgetConfigs)
      .pipe(take(1))
      .subscribe({
        next: (savedWidgets: WidgetConfig[]) => {
          this.widgetConfigs = savedWidgets;
        },
      });
  }
}
