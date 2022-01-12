import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EntryComponents, entryComponents } from '../widgets/widget.model';

@Component({
  selector: 'brd-chart-picker',
  templateUrl: './chart-picker.component.html',
  styleUrls: ['./chart-picker.component.scss'],
})
export class ChartPickerComponent implements OnInit {
  @Output()
  public elementDragged = new EventEmitter<keyof EntryComponents>();

  public availableWidgets: string[] = [];

  constructor() {}

  public ngOnInit(): void {
    this.initAvailableWidgets();
  }

  public drag(widget?: string) {
    const revertedName: keyof EntryComponents = widget
      ? ChartPickerComponent.revertFromDisplayName(widget)
      : null;

    this.elementDragged.emit(revertedName);
  }

  private initAvailableWidgets(): void {
    const widgetKeys: string[] = Object.keys(entryComponents);

    for (const widget of widgetKeys) {
      const convertedWidgetName: string =
        ChartPickerComponent.convertToDisplayName(widget);
      this.availableWidgets = [...this.availableWidgets, convertedWidgetName];
    }
  }

  private static convertToDisplayName(widgetKey: string): string {
    return widgetKey.replace(/widget/, '').replace(/-/g, ' ');
  }
  private static revertFromDisplayName(
    widgetKey: string
  ): keyof EntryComponents {
    return `widget-${widgetKey.trim()}`
      .toLocaleLowerCase()
      .replace(/\s/g, '-') as keyof EntryComponents;
  }
}
