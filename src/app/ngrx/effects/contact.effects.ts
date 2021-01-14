import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ContactService } from '../../services/contact.service';
import {CarePlanActions as careplan, ContactActions as contact} from '../actions';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class ContactEffects {

  loadContactsForSubjectAndCarePlanEffect$: any = createEffect((): any => this.actions$.pipe(
      ofType(contact.loadContactsForSubjectAndCarePlanAction),
      switchMap(action => {
        return this.service
            // @ts-ignore
            .getContactsBySubjectAndCareplan(action.subjectId, action.carePlanId)
            .pipe(
                map(contacts => contact.loadContactsForSubjectAndCarePlanSuccessAction({data: contacts})
                ),
                catchError(error =>
                    of(contact.loadContactsForSubjectAndCarePlanFailureAction({error}))
                )
            );
      })));

  constructor(private actions$: Actions,
              private service: ContactService) {}


}
