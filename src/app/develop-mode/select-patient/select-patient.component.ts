import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as patient from '../../actions/patient.actions';
import * as fromRoot from '../../reducers';

@Component({
    selector: 'app-select-patient',
    templateUrl: './select-patient.component.html',
    styleUrls: ['./select-patient.component.css']
})
export class SelectPatientComponent implements OnInit {

    patients$: Observable<string[]>;

    constructor(private store: Store<fromRoot.State>) {
    }

    select(patientId: string): void {
        console.log('in select-patient component, select');
        this.store.dispatch(patient.selectAction({data: patientId}));
    }

    ngOnInit(): void {
        console.log('in select-patient component, ngOnInit');
        this.patients$ = this.store.select(fromRoot.getPatients);
    }

}
