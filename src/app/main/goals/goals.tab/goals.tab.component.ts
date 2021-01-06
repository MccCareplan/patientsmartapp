import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../ngrx/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoalLists, GoalSummary, GoalTarget, MccObservation, MccPatient } from 'src/app/generated-data-api';
import { TargetValue } from './target-value';
import { ObservationsService } from 'src/app/services/observations.service';
import { formatGoalTargetValue } from 'src/app/common/utility-functions';

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

  targetValues$: Observable<TargetValue>;

  constructor(
    private store: Store<fromRoot.State>,
    private service: ObservationsService
  ) {

  }

  ngOnInit(): void {
    this.goalSummary$ = this.store.select(fromRoot.getGoalsSummary);
    this.goalSummary$.subscribe(goalLists => {
      if (goalLists.allGoals) {
        switch (this.displayFilter) {
          case "my-goals":
            this.filteredGoals$ = this.goalSummary$.pipe(map(x => x.allGoals.filter(a => a.expressedByType === "Patient")));
            break;
          case "team-goals":
            this.filteredGoals$ = this.goalSummary$.pipe(map(x => x.allGoals.filter(a => a.expressedByType != "Patient")));
            break;
          case "targets":
            this.loadTargets();
            break;
        }
      }
    })
  }

  loadTargets = (): void => {
    this.targetValues$ = this.service.getTargetValues();
  }
}