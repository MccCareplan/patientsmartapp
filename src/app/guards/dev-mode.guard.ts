import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class DevModeGuard implements CanActivate {
  constructor(private store: Store<fromRoot.State>) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(fromRoot.getDevModeFlag);
  }

}
