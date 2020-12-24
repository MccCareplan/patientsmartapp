import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../ngrx/reducers';
import { Observable, of, combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GoalLists, GoalSummary, MccGoal } from 'src/app/generated-data-api';

@Component({
    selector: 'app-goals-tab',
    templateUrl: './goals.tab.component.html',
    styleUrls: ['./goals.tab.component.scss']
})

export class GoalsTabComponent implements OnInit {
    @Input()
    displayFilter: string;

    goalSummary$: Observable<GoalLists>;
    filteredGoals$: Observable<GoalSummary[]>;

    constructor(
        private store: Store<fromRoot.State>
    ) {

    }

    ngOnInit(): void {
        this.goalSummary$ = this.store.select(fromRoot.getGoalsSummary);
        this.goalSummary$.subscribe(goalLists => {
            if (goalLists.allGoals) {
                if (this.displayFilter === 'my-goals') {
                    this.filteredGoals$ = this.goalSummary$.pipe(map(x => x.allGoals.filter(a => a.expressedByType === "Patient")));
                } else {
                    this.filteredGoals$ = this.goalSummary$.pipe(map(x => x.allGoals.filter(a => a.expressedByType != "Patient")));
                }
            }
        })
    }
}
