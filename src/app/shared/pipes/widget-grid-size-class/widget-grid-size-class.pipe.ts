import { Pipe, PipeTransform } from '@angular/core';
import { CHART_WIDGET } from 'src/app/dashboard/widget-panel/widget-panel-model';
import { WidgetLabels } from 'src/app/dashboard/widgets/widget.model';

@Pipe({
  name: 'widgetGridSizeClass'
})
export class WidgetGridSizeClassPipe implements PipeTransform {

  transform(widgetLabel: WidgetLabels): string {
    const colSpan = CHART_WIDGET[widgetLabel].columnSpan * 2;
    return `slds-col slds-size_1-of-1 slds-large-size_${colSpan}-of-6`;
  }

}
