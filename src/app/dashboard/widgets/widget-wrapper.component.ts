import {
  Component,
  ComponentRef,
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
  @Output() public removeWidget = new EventEmitter<string>();
  @ViewChild('child', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  public openedFilter = false;
  public loading$: Observable<boolean> = of(true);
  public filters$ = this.filterStore.widgetFilters$.pipe(
    map((widgetFilters) => widgetFilters.get(this.config.id))
  );
  /** Controls whether widget is draggable */
  moveButtonPressed = false;

  private componentRef: ComponentRef<EntryComponentsUnion>;

  @Input() public widgetInEditMode = false;

  constructor(private readonly filterStore: FilterStore) {}

  public ngOnChanges(_changes: SimpleChanges): void {
    if (this.config.filters?.length > 0) {
      this.filterStore.setWidgetFilters(this.config.id, this.config.filters);
    }
    this.loadComponent();
  }

  public changeFullscreen(): void {
    const widgetConfig: WidgetConfig = this.fullscreen ? null : this.config;

    this.fullScreenChange.emit(widgetConfig);
  }

  /**
   * Toggles whether widget can be dragged
   * @param pressed Whether button is pressed
   */
  onMoveButton(pressed: boolean): void {
    this.moveButtonPressed = pressed;
  }

  public remove(): void {
    this.removeWidget.emit(this.config.id);
  }

  public filterChange(filter: WidgetFilterUnion) {
    this.filterStore.setWidgetFilter(this.config.id, filter);
  }

  private loadComponent(): void {
    if (!this.viewContainerRef) {
      return;
    }

    this.viewContainerRef.clear();

    if (this.config.component) {
      this.componentRef =
        this.viewContainerRef.createComponent<EntryComponentsUnion>(
          entryComponents[this.config.component]
        );

      this.componentRef.instance.id = this.config.id;
      this.loading$ = this.componentRef.instance.loading$;
    }
  }
}
