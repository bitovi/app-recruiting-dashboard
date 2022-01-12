import { Component, Input } from '@angular/core';
import { WidgetPanelModel } from './widget-panel-model';

@Component({
  selector: 'brd-widget-panel',
  templateUrl: './widget-panel.component.html',
  styleUrls: ['./widget-panel.component.scss'],
})
export class WidgetPanelComponent {
  @Input() openPanel = false;
  @Input() widgetList: WidgetPanelModel[] = [
    {
      title: 'Job Openings',
      description: 'A bar chart indicating list of all Job Openings',
      initials: 'JO',
    },
  ];

  constructor() {}
}
