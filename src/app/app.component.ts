import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
    PatientActions as patient,
    DevModeActions as devmode,
    ContactActions as contact,
    ConditionSummaryActions as conditionsSummary,
    GoalsSummaryActions as goalsSummary,
    MedicationSummaryActions as medicationSummary,
    SocialConcernsActions as socialConcerns,
    CareplansSummaryActions as carePlansSummary,
    EducationSummaryActions as educationSummary,
    ReferralsSummaryActions as referralsSummary,
    CounselingSummaryActions as counselingSummary
} from './ngrx/actions';
import * as fromRoot from './ngrx/reducers';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Patient Smart App';

    constructor(
        private route: ActivatedRoute,
        private store: Store<fromRoot.State>
    ) {
    }

    devmode = false;

    ngOnInit(): void {
        let initialLoadDone = false;

        this.route.queryParams.subscribe(params => {
            if (!initialLoadDone) {
                const dev = params.devmode;
                this.devmode = (dev === 'true');
                this.store.dispatch(devmode.EditAction({ data: this.devmode }));

                let currentSubjectId: string = '';
                let carePlanId: string = '';

                if (params.subject != null) {
                    currentSubjectId = params.subject;
                    // Load best careplan for the subject, then load subsequent data
                    this.store.dispatch(carePlansSummary.loadCareplansSummaryForSubjectAction({ subjectId: currentSubjectId }));
                    this.store.select(fromRoot.getCarePlansSummary).subscribe(c => {
                        if (c && c.length > 0) {
                            // Set default careplan
                            carePlanId = c[0].profiles[0]; // Should calls with optional careplan param have it passed in? 

                            // CarePlan Screen
                            this.store.dispatch(contact.loadContactsForSubjectAndCarePlanAction({ subjectId: currentSubjectId, carePlanId: carePlanId }));
                            this.store.dispatch(patient.SelectAction({ data: currentSubjectId }));

                            // Health Status Screen
                            this.store.dispatch(conditionsSummary.loadConditionSummaryForSubjectAction({ subjectId: currentSubjectId }));

                            // Interventions & Maintenance Screen
                            this.store.dispatch(medicationSummary.loadMedicationSummaryForSubjectAction({ subjectId: currentSubjectId }));
                            this.store.dispatch(educationSummary.loadEducationSummaryForSubjectAction({ subjectId: currentSubjectId }));
                            this.store.dispatch(referralsSummary.loadReferralsSummaryForSubjectAction({ subjectId: currentSubjectId }));
                            this.store.dispatch(counselingSummary.loadCounselingSummaryForSubjectAction({ subjectId: currentSubjectId }));

                            // Goals & Preferences Screen
                            this.store.dispatch(goalsSummary.loadGoalsSummaryForSubjectAction({ subjectId: currentSubjectId }));

                            // Health Concerns Screen
                            this.store.dispatch(socialConcerns.loadSocialConcernsForSubjectAction({ subjectId: currentSubjectId }));

                            initialLoadDone = true;
                        }
                    })
                }
            }
        });
    }
}