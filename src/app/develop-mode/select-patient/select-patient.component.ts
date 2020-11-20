import {Component, OnInit} from '@angular/core';
import {from, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as patient from '../../actions/patient.actions';
import * as fromRoot from '../../reducers';
import {MccPatient} from '../../generated-data-api';

@Component({
    selector: 'app-select-patient',
    templateUrl: './select-patient.component.html',
    styleUrls: ['./select-patient.component.css']
})
export class SelectPatientComponent implements OnInit {

    patients$: Observable<string[]>;
    patientName$: Observable<string>;
    patientFhrId$: Observable<string>;

    constructor(private store: Store<fromRoot.State>) {
    }

    select(patientId: string): void {
        console.log('in select-patient component, select');
        this.store.dispatch(patient.selectAction({data: patientId}));
    }

    ngOnInit(): void {
        console.log('in select-patient component, ngOnInit');
        // this.patients$ = this.store.select(fromRoot.getPatients);
        // todo: fix above selector.   It is returning null. then, replace below with selectors.
        // @ts-ignore
        this.patients$ = this.store.select(appState => appState.topLevel.patient.patients);
        // @ts-ignore
        this.patientName$ = this.store.select( appState => appState.topLevel.patient.profile.name);
        // @ts-ignore
        this.patientFhrId$ = this.store.select(appState => appState.topLevel.patient.profile.fhirid);
   }

}
