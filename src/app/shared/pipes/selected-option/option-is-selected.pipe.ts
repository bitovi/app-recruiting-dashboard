import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isSelected',
})
export class OptionIsSelectedPipe implements PipeTransform {
  transform(value: any, args: { count: number; selected: any[] }): boolean {
    if (!args.count) {
      return false;
    }
    return args.selected.includes(value);
  }
}
