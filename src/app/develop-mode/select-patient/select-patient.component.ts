import {Component, OnInit} from '@angular/core';
import {from, Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
// import * as patient from '../../ngrx/actions/patient.actions';
import {ContactActions as contact, PatientActions as patient} from '../../ngrx/actions';
// import * as careplan from '../../ngrx/actions/careplan.actions';
import {CarePlanActions as careplan} from '../../ngrx/actions';

import * as fromRoot from '../../ngrx/reducers';
import {MccCarePlan, MccPatient} from '../../generated-data-api';

@Component({
    selector: 'app-select-patient',
    templateUrl: './select-patient.component.html',
    styleUrls: ['./select-patient.component.css']
})
export class SelectPatientComponent implements OnInit {

    patients$: Observable<string[]>;
    patient$: Observable<MccPatient>;
    careplans$: Observable<MccCarePlan[]>;
    careplanid$: Observable<string>;
    patient: MccPatient;

    constructor(private store: Store<fromRoot.State>) {
    }

    selectPatient(patientId: string): void {
        // console.log('in select-patient component, select'); // todo: remove after testing..
        this.store.dispatch(patient.SelectAction({data: patientId}));
        this.store.dispatch(careplan.LoadCarePlansForSubjectAction({data: patientId}));
     }

    selectCarePlan(carePlanId: string): void {
        console.log('[select-patient.component.ts] selectCareplan() carePlanId: ', carePlanId);
        this.store.dispatch(careplan.SelectAction({data: carePlanId}));
    }

    ngOnInit(): void {
        // console.log('in select-patient component, ngOnInit'); // todo: remove after testing..
        this.patients$ = this.store.select(fromRoot.getPatients);
        this.careplans$ = this.store.select(fromRoot.getCarePlans);
        this.patient$ = this.store.select(fromRoot.getPatientProfile);
        this.careplanid$ = this.store.select(fromRoot.getSelectedCarePlanId);
        this.patient$.subscribe(p => this.patient = p);

        this.careplanid$.subscribe(c => {
            console.log('[select-patient.component.ts] ngOnInit() careplanId$.subscribe(): c:', c);
            this.store.dispatch(contact.loadContactsForSubjectAndCarePlanAction(
                {subjectId: this.patient.fhirid, carePlanId: c}));
        });

        // @ts-ignore
        // this.patients$ = this.store.select(appState => appState.topLevel.patient.patients);
        // @ts-ignore
        // this.patientName$ = this.store.select( appState => appState.topLevel.patient.profile.name);
        // @ts-ignore
        // this.patientFhrId$ = this.store.select(appState => appState.topLevel.patient.profile.fhirid);

    }

}
