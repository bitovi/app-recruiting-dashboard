import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CHART_WIDGET, WidgetPanelModel } from './widget-panel-model';
import {
  EntryComponents,
  entryComponents,
  WidgetConfig,
  WidgetLabels,
} from '../widgets/widget.model';

@Component({
  selector: 'brd-widget-panel',
  templateUrl: './widget-panel.component.html',
  styleUrls: ['./widget-panel.component.scss'],
})
export class WidgetPanelComponent implements OnInit {
  @Input() openPanel = false;
  @Input() addedWidgetConfig: WidgetConfig[] = [];
  @Output() dragStart = new EventEmitter<WidgetLabels>();
  widgetList: WidgetPanelModel[] = [];

  constructor() {}

  ngOnInit(): void {
    this.initAllWidget();
  }

  initAllWidget() {
    const widgetKeys: string[] = Object.keys(entryComponents);
    for (const widget of widgetKeys) {
      const widgetItem: WidgetPanelModel =
        CHART_WIDGET[widget as keyof EntryComponents];
      this.widgetList.push(widgetItem);
    }
  }

  onDrag(ev: DragEvent, dragItem: WidgetPanelModel) {
    ev.dataTransfer.setData('widget-item', JSON.stringify(dragItem));
    ev.dataTransfer.setData('widget-component', dragItem.widget);
    this.dragStart.emit(dragItem.widget);
  }
}
