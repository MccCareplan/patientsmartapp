import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {take, tap, filter, switchMap, catchError} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as patient from '../actions/patient.actions';
import * as fromRoot from '../reducers';

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
        this.store.dispatch(patient.LoadAllAction({data: null}));  // todo: remove after testing...
        return of(true);                                            // todo: remove after testing...

        // todo:  get working below..

        /*
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
