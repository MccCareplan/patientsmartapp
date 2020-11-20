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
    patient$: Observable<MccPatient>;
    patient: MccPatient;

    constructor(private store: Store<fromRoot.State>) {
    }

    select(patientId: string): void {
        // console.log('in select-patient component, select'); // todo: remove after testing..
        this.store.dispatch(patient.SelectAction({data: patientId}));
    }

    ngOnInit(): void {
        // console.log('in select-patient component, ngOnInit'); // todo: remove after testing..
        this.patients$ = this.store.select(fromRoot.getPatients);
        this.patient$ = this.store.select(fromRoot.getPatientProfile);
        this.patient$.subscribe(p => this.patient = p);
        // @ts-ignore
        // this.patients$ = this.store.select(appState => appState.topLevel.patient.patients);
        // @ts-ignore
        // this.patientName$ = this.store.select( appState => appState.topLevel.patient.profile.name);
        // @ts-ignore
        // this.patientFhrId$ = this.store.select(appState => appState.topLevel.patient.profile.fhirid);
    }

}
