export interface WidgetPanelModel {
  title: string;
  description: string;
  initials: string;
  config: WidgetConfig;
}

interface WidgetConfig {
  type: string;
  columns: number;
}
