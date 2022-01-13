export enum WidgetDragAction {
  Enter = 'enter',
  Leave = 'leave',
  Change = 'change',
}

export interface WidgetDragActionEvent {
  action: WidgetDragAction;
  position: number;
}
