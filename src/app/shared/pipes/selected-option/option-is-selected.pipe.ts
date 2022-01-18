import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isSelected',
})
export class OptionIsSelectedPipe implements PipeTransform {
  transform<T>(value: T, args: { count: number; selected: T[] }): boolean {
    if (!args.count) {
      return false;
    }
    return args.selected.includes(value);
  }
}
