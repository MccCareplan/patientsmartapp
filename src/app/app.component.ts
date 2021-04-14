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
import { UacrService } from './services/uacr.service';
import { WeightService } from './services/weight.service';
import featureToggling from "../assets/json/feature-toggling.json";
import { Constants } from './common/constants';

declare var window: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    featureToggling: any = featureToggling;
    title = 'Patient Smart App';
    smartLaunch: boolean;
    currentSubjectId: string = '';
    carePlanId: string = '';
    subjectInfo: any;

    constructor(
        private route: ActivatedRoute,
        private store: Store<fromRoot.State>,
        private bpService: BloodPresureService,
        private egfrService: EgfrService,
        private fhirService: FhirService,
        private weightService: WeightService,
        private uacrService: UacrService
    ) {
    }

    devmode = false;

    ngOnInit(): void {
        Constants.featureToggling = featureToggling;
        const skey = window.sessionStorage.SMART_KEY;
        const key = skey ? skey.replace(/['"]+/g, '') : "";
        console.log('Ang: Smart Key is ' + key);
        if (key != null && key.length > 0) {
            this.updateDataContext(key, 4);
        }
        else {
            this.loadPatientData();
        }
    }

    showFooter(): boolean {
        const urlToCheck = window.location.href.toLowerCase();
        const trusted_urls = ["/status", "/lab-results", "/vital-signs"]
        let checkPassed = false;
        trusted_urls.forEach((v, i) => {
            if (urlToCheck.indexOf(v) > -1) {
                checkPassed = true;
            }
        })
        return checkPassed;
    }

    loadPatientData = (): void => {
        let initialLoadDone = false;

        this.route.queryParams.subscribe(params => {
            if (!initialLoadDone) {
                if (params.subject != null) this.currentSubjectId = params.subject;
                if (this.currentSubjectId && this.currentSubjectId.length > 0) {
                    // Load best careplan for the subject, then load subsequent data
                    this.store.dispatch(carePlansSummary.loadCareplansSummaryForSubjectAction({ subjectId: this.currentSubjectId }));
                    this.store.select(fromRoot.getCarePlansSummary).subscribe(c => {
                        if (c && c.length === 0 && !initialLoadDone) {
                            initialLoadDone = true;
                            // CarePlan Screen
                            this.store.dispatch(patient.SelectAction({ data: this.currentSubjectId }));
                            this.store.dispatch(contact.loadContactsForSubjectAndCarePlanAction({ subjectId: this.currentSubjectId }));

                            // Health Status Screen
                            this.store.dispatch(conditionsSummary.loadConditionSummaryForSubjectAction({ subjectId: this.currentSubjectId }));
                            this.loadDemoInfo();
                            
                            // Interventions & Maintenance Screen
                            this.store.dispatch(medicationSummary.loadMedicationSummaryForSubjectAction({ subjectId: this.currentSubjectId }));
                            this.store.dispatch(educationSummary.loadEducationSummaryForSubjectAction({ subjectId: this.currentSubjectId }));
                            this.store.dispatch(referralsSummary.loadReferralsSummaryForSubjectAction({ subjectId: this.currentSubjectId }));
                            this.store.dispatch(counselingSummary.loadCounselingSummaryForSubjectAction({ subjectId: this.currentSubjectId }));

                            // Goals & Preferences Screen
                            this.store.dispatch(goalsSummary.loadGoalsSummaryForSubjectAction({ subjectId: this.currentSubjectId }));
                            this.store.select(fromRoot.getGoalsSummary);

                            // Health Concerns Screen
                            this.store.dispatch(socialConcerns.loadSocialConcernsForSubjectAction({ subjectId: this.currentSubjectId }));

                            // Observations
                            this.bpService.getPatientBPInfo(this.currentSubjectId);
                            this.egfrService.getPatientEgfrInfo(this.currentSubjectId);
                            this.weightService.getPatientWotInfo(this.currentSubjectId);
                            this.uacrService.getPatientUacrInfo(this.currentSubjectId);

                        }
                        else if (c && c.length > 0 && !initialLoadDone) {
                            initialLoadDone = true;

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
                            this.uacrService.getPatientUacrInfo(this.currentSubjectId);
                        }
                    })
                }
            }
        });
    }

    loadDemoInfo = (): void => {
        this.store.select(fromRoot.getPatientProfile).subscribe(x => {
            if (x && x.fhirid) {
                this.subjectInfo = x;
            }
        })
        
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
        const info = JSON.parse(window.sessionStorage.getItem(key));
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