import { Component, OnInit, Input } from '@angular/core';
import { CharPipe } from '../../../common/char.pipe';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../ngrx/reducers';
import { Observable, of, combineLatest } from 'rxjs';
import { MccMedicationRecord, MedicationLists } from 'src/app/generated-data-api';
import { EducationSummary } from 'src/generated-data-api/models/EducationSummary';
import { ReferralSummary } from 'src/app/generated-data-api/models/ReferralSummary';
import { CounselingSummary } from 'src/generated-data-api/models/CounselingSummary';
import { Constants } from 'src/app/common/constants';

@Component({
    selector: 'app-interventions-tab',
    templateUrl: './intervention.tab.component.html',
    styleUrls: ['./intervention.tab.component.scss']
})

export class InterventionsTabComponent implements OnInit {
    featureToggling: any = Constants.featureToggling;

    @Input()
    displayFilter: string;

    medications$: Observable<MccMedicationRecord[]>;

    educationSummaries$: Observable<EducationSummary[]>;
    referralSummaries$: Observable<ReferralSummary[]>;
    counselingSummaries$: Observable<CounselingSummary[]>;

    constructor(private char: CharPipe, private store: Store<fromRoot.State>) {

    }

    ngOnInit(): void {
        this.store.select(fromRoot.getMedicationSummary).subscribe(x => {
            if (x.activeMedications) {
                this.medications$ = of(x.activeMedications);
            }
        })

        this.educationSummaries$ = this.store.select(fromRoot.getEducationSummary);
        this.referralSummaries$ = this.store.select(fromRoot.getReferralsSummary);
        this.counselingSummaries$ = this.store.select(fromRoot.getCounselingSummary);
    }

    stringify = (obj): string => {
        return JSON.stringify(obj);
    }
}
