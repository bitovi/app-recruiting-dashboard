import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateSide } from 'src/app/core/enums';
import { IDatePickerEvent } from 'src/app/core/interfaces/date-picker-event.interface';
import { FilterStore } from '../store/filter.store';
import {
  defaultWidgetConfig,
  entryComponents,
  EntryComponentsUnion,
  WidgetConfig,
  WidgetFilterDateInterval,
} from './widget.model';

@Component({
  selector: 'brd-widget-wrapper',
  templateUrl: './widget-wrapper.component.html',
  styleUrls: ['./widget-wrapper.component.scss'],
})
export class WidgetWrapperComponent implements OnChanges {
  @Input() config: WidgetConfig = defaultWidgetConfig;
  @ViewChild('child', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;
  /**
   * TO-DO: remove childModal if we have a way to render dialog
   * without instantiating the component twice
   * suggestion: render dialog by changing css only
   */

  private id = crypto.randomUUID();
  fullscreen = false;
  openedFilter = false;
  loading$: Observable<boolean> = of(true);
  filters$ = this.filterStore.widgetFilters$.pipe(
    map((widgetFilters) => widgetFilters.get(this.id))
  );

  constructor(private readonly filterStore: FilterStore) {}

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.config.filters?.length > 0) {
      this.filterStore.setWidgetFilters(this.id, this.config.filters);
    }
    this.loadComponent();
  }

  loadComponent(): void {
    if (!this.viewContainerRef) {
      return;
    }

    this.viewContainerRef.clear();

    if (this.config.component) {
      const componentRef =
        this.viewContainerRef.createComponent<EntryComponentsUnion>(
          entryComponents[this.config.component]
        );

      componentRef.instance.id = this.id;
      this.loading$ = componentRef.instance.loading$;
    }
  }

  toggleFullscreen(): void {
    this.fullscreen = !this.fullscreen;
  }

  remove(): void {
    console.log('remove called');
  }

  filterDateIntervalChange(
    datePickerEvent: IDatePickerEvent,
    currentFilter: WidgetFilterDateInterval
  ) {
    const isStartDate = datePickerEvent.dateSide === DateSide.StartDate;
    this.filterStore.setWidgetFilter(this.id, {
      ...currentFilter,
      value: {
        startDate: isStartDate
          ? datePickerEvent.date
          : currentFilter.value.startDate,
        endDate: isStartDate
          ? currentFilter.value.endDate
          : datePickerEvent.date,
      },
    });
  }
}
