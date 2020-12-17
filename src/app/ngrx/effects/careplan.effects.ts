import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CareplanService} from '../../services/careplan.service';
import * as careplan from '../actions/careplan.actions';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {of} from 'rxjs';
import {loadCarePlansForSubjectSuccessAction} from '../actions/careplan.actions';


@Injectable()
export class CareplanEffects {

    loadCarePlansForSubjectEffect$: any = createEffect((): any => this.actions$.pipe(
        ofType(careplan.LOAD_ALL_FOR_SUBJECT),
        switchMap(action => {
            return this.service
                // @ts-ignore
                .getCarePlansBySubject(action.data)
                .pipe(
                    map(careplans => loadCarePlansForSubjectSuccessAction({data: careplans})
                    ),
                    catchError(error =>
                        of(careplan.loadCarePlansForSubjectFailureAction({error}))
                    )
                );
        })));

    constructor(private actions$: Actions,
                private service: CareplanService) {
    }

}
