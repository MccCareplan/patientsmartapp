import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ContactEffects } from './contact.effects';

describe('ContactEffects', () => {
  let actions$: Observable<any>;
  let effects: ContactEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ContactEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ContactEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
