import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {
    PatientActions as patient,
    CarePlanActions as careplan,
    DevModeActions as devmode,
    ContactActions as contact
} from './ngrx/actions';
import * as fromRoot from './ngrx/reducers';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Patient Smart App';

    constructor(private route: ActivatedRoute,
                private store: Store<fromRoot.State>) {
    }

    devmode = false;
    currentSubjectId = '';
    careplanid$ = this.store.select(fromRoot.getSelectedCarePlanId);


    ngOnInit(): void {

        this.route.queryParams.subscribe(params => {
            // console.log('[app.component.ts] params:', params);  // todo: remove after testing..
            const dev = params.devmode;
            this.devmode = (dev === 'true');
            // console.log('[app.component.ts] Development Mode: ' + this.devmode); // todo: remove after testing..
            this.store.dispatch(devmode.EditAction({data: this.devmode}));
            if (params.subject != null) {
                this.currentSubjectId = params.subject;
                this.store.dispatch(patient.SelectAction({data: this.currentSubjectId}));
                this.store.dispatch(careplan.LoadCarePlansForSubjectAction({data: this.currentSubjectId}));
                this.careplanid$.subscribe(c =>
                    this.store.dispatch(contact.loadContactsForSubjectAndCarePlanAction(
                        {subjectId: this.currentSubjectId, carePlanId: c})));
            }
        });

    }

}
