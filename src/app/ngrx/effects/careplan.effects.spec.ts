import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CareplanEffects } from './careplan.effects';

describe('CareplanEffects', () => {
  let actions$: Observable<any>;
  let effects: CareplanEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CareplanEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CareplanEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
