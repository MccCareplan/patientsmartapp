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
import { BloodPresureService } from './services/blood-pressure.service';
import { EgfrService } from './services/egfr.service';
import { ObservationsService } from './services/observations.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Patient Smart App';

    constructor(
        private route: ActivatedRoute,
        private store: Store<fromRoot.State>,
        private bpService: BloodPresureService,
        private egfrService: EgfrService
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
                            carePlanId = c[0].fhirid; // Should calls with optional careplan param have it passed in? 

                            // CarePlan Screen
                            this.store.dispatch(contact.loadContactsForSubjectAndCarePlanAction({ subjectId: currentSubjectId, carePlanId: carePlanId }));
                            this.store.dispatch(patient.SelectAction({ data: currentSubjectId }));

                            // Health Status Screen
                            this.store.dispatch(conditionsSummary.loadConditionSummaryForSubjectAction({ subjectId: currentSubjectId, carePlanId: carePlanId }));

                            // Interventions & Maintenance Screen
                            this.store.dispatch(medicationSummary.loadMedicationSummaryForSubjectAction({ subjectId: currentSubjectId, carePlanId: carePlanId }));
                            this.store.dispatch(educationSummary.loadEducationSummaryForSubjectAction({ subjectId: currentSubjectId, carePlanId: carePlanId }));
                            this.store.dispatch(referralsSummary.loadReferralsSummaryForSubjectAction({ subjectId: currentSubjectId, carePlanId: carePlanId }));
                            this.store.dispatch(counselingSummary.loadCounselingSummaryForSubjectAction({ subjectId: currentSubjectId, carePlanId: carePlanId }));

                            // Goals & Preferences Screen
                            this.store.dispatch(goalsSummary.loadGoalsSummaryForSubjectAction({ subjectId: currentSubjectId, carePlanId: carePlanId }));
                            this.store.select(fromRoot.getGoalsSummary);

                            // Health Concerns Screen
                            this.store.dispatch(socialConcerns.loadSocialConcernsForSubjectAction({ subjectId: currentSubjectId, carePlanId: carePlanId }));

                            // Observations
                            this.bpService.getPatientBPInfo(currentSubjectId);
                            this.egfrService.getPatientEgfrInfo(currentSubjectId);

                            initialLoadDone = true;
                        }
                    })
                }
            }
        });
    }
}