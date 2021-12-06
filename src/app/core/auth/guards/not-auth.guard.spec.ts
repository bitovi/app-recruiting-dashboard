import { TestBed } from '@angular/core/testing';

import { NotAutGuard } from './not-auth.guard';

describe('NotAuthGuardGuard', () => {
  let guard: NotAutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NotAutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
