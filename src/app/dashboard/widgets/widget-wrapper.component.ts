import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterStore } from '../store/filter.store';
import {
  defaultWidgetConfig,
  entryComponents,
  EntryComponentsUnion,
  WidgetConfig,
  WidgetFilterUnion,
} from './widget.model';

@Component({
  selector: 'brd-widget-wrapper',
  templateUrl: './widget-wrapper.component.html',
  styleUrls: ['./widget-wrapper.component.scss'],
})
export class WidgetWrapperComponent implements OnChanges {
  @Input() config: WidgetConfig = defaultWidgetConfig;
  @Input() public fullscreen = false;
  @Output() public fullScreenChange = new EventEmitter<WidgetConfig>();
  @ViewChild('child', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  public openedFilter = false;
  public loading$: Observable<boolean> = of(true);
  public filters$ = this.filterStore.widgetFilters$.pipe(
    map((widgetFilters) => widgetFilters.get(this.id))
  );

  private id = crypto.randomUUID();

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

  public changeFullscreen(): void {
    const widgetConfig: WidgetConfig = this.fullscreen ? null : this.config;

    this.fullScreenChange.emit(widgetConfig);
  }

  public remove(): void {
    console.log('remove called');
  }

  public filterChange(filter: WidgetFilterUnion) {
    this.filterStore.setWidgetFilter(this.id, filter);
  }
}
