import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CHART_WIDGET, WidgetPanelModel } from './widget-panel-model';
import {
  EntryComponents,
  entryComponents,
  WidgetConfig,
  WidgetComponents,
} from '../widgets/widget.model';
import { SocketService } from 'src/app/dashboard/services/socket/socket.service';

@Component({
  selector: 'brd-widget-panel',
  templateUrl: './widget-panel.component.html',
  styleUrls: ['./widget-panel.component.scss'],
})
export class WidgetPanelComponent implements OnInit {
  @Input() openPanel = false;
  @Input() addedWidgetConfig: WidgetConfig[] = [];
  @Output() dragStart = new EventEmitter<WidgetComponents>();
  widgetList: WidgetPanelModel[] = [];

  constructor(private socket: SocketService) {}

  ngOnInit(): void {
    this.initAllWidget();
    console.log('hit')
    this.socket.connect();

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
