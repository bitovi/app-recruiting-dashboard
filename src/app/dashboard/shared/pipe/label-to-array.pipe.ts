import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelToArray',
})
export class LabelToArrayPipe implements PipeTransform {
  excludedWords = ['remote', 'Full', 'time', '&', 'and', ','];

  transform(value: string, splitTo: number): string[] {
    if (value) {
      const regExp = new RegExp(this.excludedWords.join('\\b|\\b'), 'gi');
      const newLabels = value.replace(regExp, '').replace(/ +/g, ' ');
      return newLabels.split(' ').slice(0, splitTo);
    }
    return [];
  }
}
