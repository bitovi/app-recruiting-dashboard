import { ClickOutsideToCloseDirective } from './click-outside-to-close.directive';
import { DebugElement } from '@angular/core';

describe('ClickOutsideToCloseDirective', () => {
  let debugElement: DebugElement;

  it('should create an instance', () => {
    const directive = new ClickOutsideToCloseDirective(debugElement);
    expect(directive).toBeTruthy();
  });
});
