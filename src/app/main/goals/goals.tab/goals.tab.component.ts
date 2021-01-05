import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../ngrx/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoalLists, GoalSummary, GoalTarget, MccObservation, MccPatient } from 'src/app/generated-data-api';
import { TargetValue } from './target-value';
import { ObservationsService } from 'src/app/services/observations.service';
import { formatGoalTargetValue } from 'src/app/common/utility-functions';
import { GoalsSummaryService } from 'src/app/services/goals-summary.service';
import { Utilities } from 'src/app/common/utilities';

@Component({
  selector: 'app-goals-tab',
  templateUrl: './goals.tab.component.html',
  styleUrls: ['./goals.tab.component.scss']
})

export class GoalsTabComponent implements OnInit {
  @Input()
  displayFilter: string;

  filteredGoals: GoalSummary[];
  targetValues: TargetValue[] = [];

  patientId: string;
  careplanId: string;

  constructor(
    private service: ObservationsService,
    private goalsService: GoalsSummaryService
  ) {

  }

  ngOnInit(): void {
    this.patientId = Utilities.getQueryStringParam("subject");
    this.careplanId = Utilities.getQueryStringParam("careplan");

    this.goalsService.getGoalsSummaryByPatientId(this.patientId, this.careplanId).subscribe(
      goalLists => {
        if (!goalLists.allGoals) return;
        switch (this.displayFilter) {
          case "my-goals":
            this.filteredGoals = goalLists.allGoals.filter(x => x.expressedByType === "Patient");
            break;
          case "team-goals":
            this.filteredGoals = goalLists.allGoals.filter(x => x.expressedByType !== "Patient")
            break;
          case "targets":
            this.loadTargets(this.patientId, goalLists.activeTargets);
            break;
        }
      }
    )
  }

  loadTargets = (patientId: string, activeTargets: GoalTarget[]): void => {
    this.service.formatTargets(patientId, activeTargets).subscribe(res => {
      if (res) {
        this.targetValues.push(res);
      }
    });
  }
}