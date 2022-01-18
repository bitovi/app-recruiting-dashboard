export enum WidgetDragAction {
  Enter = 'enter',
  Leave = 'leave',
  Change = 'change',
  Cancel = 'cancel',
}

export interface WidgetDragActionEvent {
  action: WidgetDragAction;
  position: number;
}
