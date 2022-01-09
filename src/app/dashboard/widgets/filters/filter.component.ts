import { EventEmitter } from '@angular/core';
import { WidgetFilterUnion } from '../widget.model';

export abstract class FilterComponent {
  /**
   * use with decorator @Input
   */
  readonly filter: WidgetFilterUnion;
  /**
   * use with decorator @Output
   * should be of type EventEmitter<WidgetFilterUnion>
   */
  readonly changed: EventEmitter<any>;
}
