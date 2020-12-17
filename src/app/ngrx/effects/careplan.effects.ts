import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CareplanService} from '../../services/careplan.service';
// import * as careplan from '../actions/careplan.actions';
import {CarePlanActions as careplan} from '../actions';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';



@Injectable()
export class CareplanEffects {

    loadCarePlansForSubjectEffect$: any = createEffect((): any => this.actions$.pipe(
        ofType(careplan.LOAD_ALL_FOR_SUBJECT),
        switchMap(action => {
            return this.service
                // @ts-ignore
                .getCarePlansBySubject(action.data)
                .pipe(
                    map(careplans => careplan.loadCarePlansForSubjectSuccessAction({data: careplans})
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
