import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { WidgetFilterInputText } from '../../widget.model';
import { FilterComponent } from '../filter.component';

@Component({
  selector: 'brd-filter-input-text',
  templateUrl: './filter-input-text.component.html',
  styleUrls: ['./filter-input-text.component.scss'],
})
export class FilterInputTextComponent implements FilterComponent, OnChanges {
  @Input() filter: WidgetFilterInputText;
  @Output() changed = new EventEmitter<WidgetFilterInputText>();
  readonly input = this.fb.control('');
  readonly inputChanged$: Observable<string> = this.input.valueChanges.pipe(
    debounceTime(1000),
    tap((value) => this.changed.emit({ ...this.filter, value }))
  );

  constructor(private fb: FormBuilder) {}

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.input) {
      this.input.setValue(this.filter.value || '', { emitEvent: false });
    }
  }
}
