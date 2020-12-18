import { TestBed } from '@angular/core/testing';

import { CareplanService } from './careplan.service';

describe('CareplanService', () => {
  let service: CareplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareplanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
