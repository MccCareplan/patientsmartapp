import { Component, OnInit, Input } from '@angular/core';
import { CharPipe } from '../../../common/char.pipe';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../ngrx/reducers';
import { Observable } from 'rxjs';
import { ConditionLists, SocialConcern } from 'src/app/generated-data-api';
import { Constants } from 'src/app/common/constants';

@Component({
    selector: 'app-health-tab',
    templateUrl: './health.tab.component.html',
    styleUrls: ['./health.tab.component.scss']
})

export class HealthTabComponent implements OnInit {
    featureToggling: any = Constants.featureToggling;

    @Input()
    displayFilter: string;

    socialConcerns$: Observable<SocialConcern[]>;
    conditionsList$: Observable<ConditionLists>;

    constructor(private char: CharPipe, private store: Store<fromRoot.State>) {

    }

    ngOnInit(): void {
        this.socialConcerns$ = this.store.select(fromRoot.getSocialConcerns);
        this.conditionsList$ = this.store.select(fromRoot.getConditionsSummary);
    }
}
