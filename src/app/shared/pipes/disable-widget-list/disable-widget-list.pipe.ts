import { Pipe, PipeTransform } from '@angular/core';
import { WidgetConfig } from '../../../dashboard/widgets/widget.model';

@Pipe({
  name: 'disableWidgetList',
})
export class DisableWidgetListPipe implements PipeTransform {
  transform(value: WidgetConfig[], widgetName: string): boolean {
    return value.some((value) => value.component === widgetName);
  }
}
