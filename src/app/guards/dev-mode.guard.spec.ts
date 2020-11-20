import { TestBed } from '@angular/core/testing';

import { DevModeGuard } from './dev-mode.guard';

describe('DevModeGuard', () => {
  let guard: DevModeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DevModeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
