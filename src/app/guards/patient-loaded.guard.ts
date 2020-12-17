import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {take, tap, filter, switchMap, catchError} from 'rxjs/operators';
import {Store} from '@ngrx/store';
// import * as patient from '../ngrx/actions/patient.actions';
import {PatientActions as patient} from '../ngrx/actions';
// import * as careplan from '../ngrx/actions/careplan.actions';
import {CarePlanActions as careplan} from '../ngrx/actions';
import * as fromRoot from '../ngrx/reducers';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class PatientLoadedGuard implements CanActivate {
    constructor(private store: Store<fromRoot.State>) {
        // console.log('in PatientLoadedGuard store:', store); // todo: remove after testing..
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.getFromStoreOrAPI().pipe(
            switchMap(() => of(true))
            , catchError((error) => of(false)));

    }

    getFromStoreOrAPI(): Observable<any> {
        // console.log('[patient-loaded.guard.ts] getFromStoreorAPI()'); // todo: remove after testing..
        this.store.dispatch(patient.LoadAllAction({data: null}));  // todo: remove after get code below working...
        this.store.dispatch(careplan.LoadCarePlansForSubjectAction({data: environment.testPatients[0]}));
        return of(true);                                            // todo: remove after get code below working...

        // todo:  get working below..

        /* code below checks if patients is not loaded yet.
        return this.store
            .select(fromRoot.getPatients).pipe(
             tap((data: any) => {
                 console.log('[patient-loaded.guard.ts] getFromStoreorAPI() getPatients, data: ', data);
                 if (!data.length) {
                    this.store.dispatch(patient.LoadAllAction({data: null}));
                }
            })
            , filter((data: any) => data.length)
            , take(1));
        */
    }

}
