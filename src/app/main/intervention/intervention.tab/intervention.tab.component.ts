import { Component, OnInit, Input } from '@angular/core';
import { SharedModule } from '../../../common/shared.module';
import { CharPipe } from '../../../common/char.pipe';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../ngrx/reducers';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MccMedicationRecord, MedicationLists } from 'src/app/generated-data-api';

@Component({
    selector: 'app-interventions-tab',
    templateUrl: './intervention.tab.component.html',
    styleUrls: ['./intervention.tab.component.scss']
})

export class InterventionsTabComponent implements OnInit {
    @Input()
    displayFilter: string;

    medicationLists$: Observable<MedicationLists>;
    medications$: Observable<MccMedicationRecord[]>;

    constructor(private char: CharPipe, private store: Store<fromRoot.State>) {

    }

    ngOnInit(): void {
        this.medicationLists$ = this.store.select(fromRoot.getMedicationSummary);
        this.medicationLists$.subscribe(x => {
            if (x.activeMedications) {
                this.medications$ = of(x.activeMedications);
            }
        })
    }
}
