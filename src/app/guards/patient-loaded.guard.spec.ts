import { TestBed } from '@angular/core/testing';

import { PatientLoadedGuard } from './patient-loaded.guard';

describe('PatientLoadedGuard', () => {
  let guard: PatientLoadedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PatientLoadedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
