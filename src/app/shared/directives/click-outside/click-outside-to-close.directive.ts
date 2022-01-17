import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Directive({
  selector: '[brdClickOutsideToClose]',
})
export class ClickOutsideToCloseDirective implements OnDestroy {
  @Output() brdClickOutsideToClose = new EventEmitter<boolean>();
  private destroy$ = new Subject<void>();

  constructor(private elementRef: ElementRef) {
    const onClick$ = fromEvent(document, 'click');
    onClick$
      .pipe(
        takeUntil(this.destroy$),
        tap((event: Event) => {
          this.brdClickOutsideToClose.emit(
            elementRef.nativeElement.contains(event.target)
          );
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
