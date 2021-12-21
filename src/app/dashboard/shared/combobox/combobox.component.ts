import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ComboboxAction, ComboSelected} from './combobox-model';

@Component({
  selector: 'brd-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
})
export class ComboboxComponent {
  openDropDown = false;
  comboAction = ComboboxAction;
  @Input() selections: string[] = [];
  @Input() label!: string;
  @Input() options: string[] | null = [];
  @Output() selectionChanged = new EventEmitter<string[]>();

  constructor() {
  }

  onItemAction(option: string, type: ComboboxAction) {
    const indexItem = this.selections.indexOf(option);
    if (type === ComboboxAction.PILL_ACTION) {
      this.selections.splice(indexItem, 1);
    }
    if (type === ComboboxAction.LIST_BOX_ACTION) {
      if (indexItem > -1) {
        this.selections.splice(indexItem, 1);
      } else {
        this.selections.push(option);
      }
    }
    this.selectionChanged.emit(this.selections);
  }
}
