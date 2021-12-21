export enum ComboboxAction {
  PILL_ACTION = 'PillAction',
  LIST_BOX_ACTION = 'ListBoxAction',
}

// TODO more addictions
export interface ComboSelected<T> {
  data: T;
}
