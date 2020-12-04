import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../ngrx/reducers';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-footer-mobile',
  templateUrl: './footer-mobile.component.html',
  styleUrls: ['./footer-mobile.component.css']
})
export class FooterMobileComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  devmode$: Observable<boolean>;


  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    // @ts-ignore
    this.devmode$ = this.store.select(fromRoot.getDevModeFlag);
    // this.devmode$.subscribe((d: boolean) => console.log('[footer-mobile.component.ts devmode$ ', d));  // todo; remove after testing..

  }
  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
