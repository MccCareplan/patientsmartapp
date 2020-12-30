import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MccCarePlanSummary } from 'src/generated-data-api/models/MccCarePlanSummary';
import {
    PatientActions as patient,
    CarePlanActions as careplan,
    DevModeActions as devmode,
    ContactActions as contact,
    ConditionSummaryActions as conditionsSummary,
    GoalsSummaryActions as goalsSummary,
    MedicationSummaryActions as medicationSummary,
    SocialConcernsActions as socialConcerns,
    CareplansSummaryActions as carePlansSummary
} from './ngrx/actions';
import * as fromRoot from './ngrx/reducers';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    initialLoadDone: boolean = false;
    title = 'Patient Smart App';

    constructor(
        private route: ActivatedRoute,
        private store: Store<fromRoot.State>
    ) {
    }

    carePlansSummary$: Observable<MccCarePlanSummary[]> = this.store.select(fromRoot.getCarePlansSummary);
    currentSubjectId = '';
    carePlanId = '';
    devmode = false;

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (!this.initialLoadDone) {
                const dev = params.devmode;
                this.devmode = (dev === 'true');
                this.store.dispatch(devmode.EditAction({ data: this.devmode }));
                if (params.subject != null) {
                    this.currentSubjectId = params.subject;
                    // Load best careplan for the subject, then load subsequent data
                    // ?? Should calls with optional careplan param have it passed in ??
                    this.carePlansSummary$.subscribe(c => {
                        if (c && c.length > 0) {
                            this.carePlanId = c[0].profiles[0];
                            this.store.dispatch(contact.loadContactsForSubjectAndCarePlanAction({ subjectId: this.currentSubjectId, carePlanId: this.carePlanId }));
                            this.store.dispatch(patient.SelectAction({ data: this.currentSubjectId }));
                            this.store.dispatch(conditionsSummary.loadConditionSummaryForSubjectAction({ subjectId: this.currentSubjectId }));
                            this.store.dispatch(goalsSummary.loadGoalsSummaryForSubjectAction({ subjectId: this.currentSubjectId }));
                            this.store.dispatch(careplan.LoadCarePlansForSubjectAction({ data: this.currentSubjectId }));
                            this.store.dispatch(medicationSummary.loadMedicationSummaryForSubjectAction({ subjectId: this.currentSubjectId }));
                            this.store.dispatch(socialConcerns.loadSocialConcernsForSubjectAction({ subjectId: this.currentSubjectId }));
                            this.initialLoadDone = true;
                        }
                    })
                    this.store.dispatch(carePlansSummary.loadCareplansSummaryForSubjectAction({ subjectId: this.currentSubjectId }));
                }
            }
        });
    }
}