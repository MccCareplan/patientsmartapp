import { TestBed } from '@angular/core/testing';

import { SubjectDataServiceService } from './subject-data-service.service';

describe('DataService', () => {
  let service: SubjectDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
