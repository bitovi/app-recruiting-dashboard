import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComboboxAction } from './combobox-model';

@Component({
  selector: 'brd-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss'],
})
export class ComboboxComponent {
  public openDropDown = false;
  public comboAction = ComboboxAction;
  @Input() public selections: string[] = [];
  @Input() public label!: string;
  @Input() public options: string[] | null = [];
  @Output() public selectionChanged = new EventEmitter<string[]>();

  public onItemAction(option: string, type: ComboboxAction) {
    const indexItem: number = this.selections.indexOf(option);
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
