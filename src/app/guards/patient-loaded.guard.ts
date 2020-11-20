import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {take, map, filter} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as patient from '../actions/patient.actions';
import * as fromRoot from '../reducers';

@Injectable({
    providedIn: 'root'
})

export class PatientLoadedGuard implements CanActivate {
    constructor(private store: Store<fromRoot.State>) {
        console.log('in PatientLoadedGuard store:', store); // todo: remove after testing..
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isLoaded$ = this.store.select(fromRoot.getPatients).pipe(
            map(patients => patients.length > 0));

        patient.LoadAllAction({data: null});    // todo: remove after testing...

        this.store.dispatch(patient.LoadAllAction({data: null}));

        isLoaded$.pipe(
            take(1)
            , filter(loaded => !loaded)
            , map(() => patient.LoadAllAction({data: null})))
            .subscribe(this.store);

        return isLoaded$.pipe(
            filter(loaded => loaded)
            , take(1));


    }

}
