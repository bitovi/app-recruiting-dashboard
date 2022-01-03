import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  defaultWidgetConfig,
  entryComponents,
  EntryComponentsUnion,
  WidgetConfig,
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
   * suggestion: change css only to render dialog
   */
  @ViewChild('childModal', { read: ViewContainerRef, static: true })
  viewContainerModalRef!: ViewContainerRef;
  fullscreen = false;
  loading$: Observable<boolean> = of(true);

  ngOnChanges(_changes: SimpleChanges): void {
    this.loadComponent();
  }

  loadComponent(): void {
    if (!this.viewContainerRef) {
      return;
    }

    this.viewContainerRef.clear();
    this.viewContainerModalRef.clear();

    if (this.config.component) {
      const componentRef =
        this.viewContainerRef.createComponent<EntryComponentsUnion>(
          entryComponents[this.config.component]
        );
      this.viewContainerModalRef.createComponent<EntryComponentsUnion>(
        entryComponents[this.config.component]
      );
      this.loading$ = componentRef.instance.loading$;
    }
  }

  toggleFullscreen(): void {
    this.fullscreen = !this.fullscreen;
  }

  remove(): void {
    console.log('remove called');
  }
}
