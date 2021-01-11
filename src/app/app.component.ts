import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
import { FhirService } from './services/fhir.service';
import { WeightService } from './services/weight.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Patient Smart App';
    smartLaunch: boolean;
    currentSubjectId: string = '';
    carePlanId: string = '';

    constructor(
        private route: ActivatedRoute,
        private store: Store<fromRoot.State>,
        private bpService: BloodPresureService,
        private egfrService: EgfrService,
        private fhirService: FhirService,
        private weightService: WeightService
    ) {
    }

    devmode = false;

    ngOnInit(): void {
        const skey = sessionStorage.SMART_KEY;
        const key = skey ? skey.replace(/['"]+/g, '') : "";
        console.log('Ang: Smart Key is ' + key);
        if (key != null && key.length > 0) {
            this.updateDataContext(key, 4);
        }
        else {
            this.loadPatientData();
        }
    }

    loadPatientData = (): void => {
        let initialLoadDone = false;

        this.route.queryParams.subscribe(params => {
            if (!initialLoadDone) {
                const dev = params.devmode;
                this.devmode = (dev === 'true');
                this.store.dispatch(devmode.EditAction({ data: this.devmode }));

                if (params.subject != null) this.currentSubjectId = params.subject;

                if (this.currentSubjectId && this.currentSubjectId.length > 0) {
                    // Load best careplan for the subject, then load subsequent data
                    this.store.dispatch(carePlansSummary.loadCareplansSummaryForSubjectAction({ subjectId: this.currentSubjectId }));
                    this.store.select(fromRoot.getCarePlansSummary).subscribe(c => {
                        if (c && c.length > 0) {
                            // Set default careplan
                            this.carePlanId = c[0].fhirid; // Should calls with optional careplan param have it passed in? 

                            // CarePlan Screen
                            this.store.dispatch(contact.loadContactsForSubjectAndCarePlanAction({ subjectId: this.currentSubjectId, carePlanId: this.carePlanId }));
                            this.store.dispatch(patient.SelectAction({ data: this.currentSubjectId }));

                            // Health Status Screen
                            this.store.dispatch(conditionsSummary.loadConditionSummaryForSubjectAction({ subjectId: this.currentSubjectId, carePlanId: this.carePlanId }));

                            // Interventions & Maintenance Screen
                            this.store.dispatch(medicationSummary.loadMedicationSummaryForSubjectAction({ subjectId: this.currentSubjectId, carePlanId: this.carePlanId }));
                            this.store.dispatch(educationSummary.loadEducationSummaryForSubjectAction({ subjectId: this.currentSubjectId, carePlanId: this.carePlanId }));
                            this.store.dispatch(referralsSummary.loadReferralsSummaryForSubjectAction({ subjectId: this.currentSubjectId, carePlanId: this.carePlanId }));
                            this.store.dispatch(counselingSummary.loadCounselingSummaryForSubjectAction({ subjectId: this.currentSubjectId, carePlanId: this.carePlanId }));

                            // Goals & Preferences Screen
                            this.store.dispatch(goalsSummary.loadGoalsSummaryForSubjectAction({ subjectId: this.currentSubjectId, carePlanId: this.carePlanId }));
                            this.store.select(fromRoot.getGoalsSummary);

                            // Health Concerns Screen
                            this.store.dispatch(socialConcerns.loadSocialConcernsForSubjectAction({ subjectId: this.currentSubjectId, carePlanId: this.carePlanId }));

                            // Observations
                            this.bpService.getPatientBPInfo(this.currentSubjectId);
                            this.egfrService.getPatientEgfrInfo(this.currentSubjectId);
                            this.weightService.getPatientWotInfo(this.currentSubjectId);

                            initialLoadDone = true;
                        }
                    })
                }
            }
        });
    }

    waitFor(time: number) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('I promise to return after ' + time + 'milliseconds!');
            }, time);
        });
    }

    async updateDataContext(key: string, count: number): Promise<void> {
        console.log('Updating Context');
        const info = JSON.parse(sessionStorage.getItem(key));
        if (info != null) {
            console.log('server: ' + info.serverUrl);
            const tokenResp = info.tokenResponse;
            if (tokenResp.access_token != null) {
                console.log('access_token: ' + tokenResp.access_token);
                console.log('patient: ' + tokenResp.patient);
                this.fhirService.updateFHIRConnection(info.serverUrl, tokenResp.access_token);
                this.smartLaunch = true;
                this.currentSubjectId = tokenResp.patient;
                this.loadPatientData();
            } else {
                if (count > 0) {
                    const t = await this.waitFor(1000);
                    console.log(t);
                    this.updateDataContext(key, count - 1);
                }
            }
        } else {
            console.log('No info for key ' + key + ' found');
        }
    }
}