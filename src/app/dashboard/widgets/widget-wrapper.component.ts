import {
  Component,
  ComponentRef,
  ElementRef,
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
  WidgetDragAction,
  WidgetDragActionEvent,
} from './widget-wrapper.model';
import {
  defaultWidgetConfig,
  entryComponents,
  EntryComponentsUnion,
  WidgetConfig,
  WidgetFilterUnion,
} from './widget.model';
import { CHART_WIDGET } from '../widget-panel/widget-panel-model';

@Component({
  selector: 'brd-widget-wrapper',
  templateUrl: './widget-wrapper.component.html',
  styleUrls: ['./widget-wrapper.component.scss'],
})
export class WidgetWrapperComponent implements OnChanges {
  @Input() config: WidgetConfig = defaultWidgetConfig;
  @Output() public removeWidget = new EventEmitter<string>();
  @Output() dragAction = new EventEmitter<WidgetDragActionEvent>();
  @ViewChild('container', { static: true })
  containerRef: ElementRef<HTMLDivElement>;
  @ViewChild('child', { read: ViewContainerRef, static: true })
  viewContainerRef!: ViewContainerRef;

  public openedFilter = false;

  public loading$: Observable<boolean> = of(true);
  public filters$ = this.filterStore.widgetFilters$.pipe(
    map((widgetFilters) => widgetFilters.get(this.config.id))
  );
  /** Controls whether widget is draggable */
  moveButtonPressed = false;
  /** Controls whether widget is fullscreen */
  fullscreen = false;
  chartWidget = CHART_WIDGET;

  private componentRef: ComponentRef<EntryComponentsUnion>;

  private dropDomRect: DOMRect;
  private dropSide = 0;

  @Input() public widgetInEditMode = false;

  constructor(private readonly filterStore: FilterStore) {}

  public ngOnChanges(_changes: SimpleChanges): void {
    if (this.config.filters?.length > 0) {
      this.filterStore.setWidgetFilters(this.config.id, this.config.filters);
    }
    this.loadComponent();
  }

  public changeFullscreen(): void {
    this.fullscreen = !this.fullscreen;
  }

  /**
   * Toggles whether widget can be dragged
   * @param pressed Whether button is pressed
   */
  onMoveButton(pressed: boolean): void {
    this.moveButtonPressed = pressed;
  }

  onDragEnter(ev: DragEvent): void {
    this.dropDomRect = this.containerRef.nativeElement.getBoundingClientRect();
    this.dropSide =
      ev.clientX > this.dropDomRect.x + 0.5 * this.dropDomRect.width ? 1 : -1;
    this.dragAction.emit({
      action: WidgetDragAction.Enter,
      position: this.dropSide,
    });
  }

  onDragOver(ev: DragEvent): void {
    const side =
      ev.clientX > this.dropDomRect.x + 0.5 * this.dropDomRect.width ? 1 : -1;
    if (this.dropSide !== side) {
      this.dropSide = side;
      this.dragAction.emit({
        action: WidgetDragAction.Change,
        position: this.dropSide,
      });
    }
  }

  onDragLeave(ev: DragEvent): void {
    this.dropSide =
      ev.clientX > this.dropDomRect.x + 0.5 * this.dropDomRect.width ? 1 : -1;
    this.dragAction.emit({
      action: WidgetDragAction.Leave,
      position: this.dropSide,
    });
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
