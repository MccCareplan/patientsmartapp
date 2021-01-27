import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../ngrx/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoalLists, GoalSummary, GoalTarget, MccObservation } from 'src/app/generated-data-api';
import { TargetValue } from './target-value';
import { ObservationsService } from 'src/app/services/observations.service.new';
import { formatGoalTargetValue } from 'src/app/common/utility-functions';

@Component({
  selector: 'app-goals-tab',
  templateUrl: './goals.tab.component.html',
  styleUrls: ['./goals.tab.component.scss']
})

export class GoalsTabComponent implements OnInit {
  @Input()
  displayFilter: string;

  @Input()
  patientId: string;

  goalSummary$: Observable<GoalLists>;
  filteredGoals$: Observable<GoalSummary[]>;

  targetValues: TargetValue[] = [];

  constructor(
    private store: Store<fromRoot.State>,
    private service: ObservationsService
  ) {

  }

  ngOnInit(): void {
    this.store.select(fromRoot.getPatientProfile).subscribe(x => {
      if (x && x.fhirid) {
        this.patientId = x.fhirid;
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
                this.loadTargets(goalLists);
                break;
            }
          }
        })
      }
    })
  }

  /*
  Query Target Observations
  Filter out null results
  Format
  */
  loadTargets = (goalList: GoalLists): void => {
    if (goalList && goalList.activeTargets && this.patientId) {
      let callArray: Promise<MccObservation>[] = [];
      goalList.activeTargets.forEach((v, i) => {
        /* ADD TRANSLATE PARAM HERE */
        callArray.push(this.service.getObservation(this.patientId, v.measure.coding[0].code));  // Query
      })

      Promise.all(callArray).then(resArray => {
        resArray.filter(x => x !== undefined && x.status !== "notfound").forEach((v, i, d) => { // Filter
          // find corresponding goal target 
          let correspondingTarget = goalList.activeTargets.find(x => { return x.measure.coding[0].code === v.code.coding[0].code; })
          let formattedTarget = this.formatTarget(v, i, correspondingTarget);
          if (formattedTarget) {
            this.targetValues.push(formattedTarget);
          }
        });
      });
    }
  }

  formatTarget = (obs: MccObservation, index: number, gt: GoalTarget): TargetValue => {
    let mostRecentResultValue = '';
    let observationDate = '';
    let rowHighlighted = false;
    let formattedTargetValue = '';
    if (obs.value !== undefined) {
      mostRecentResultValue = obs.value.quantityValue.value.toString();
    }
    if (obs.components !== undefined) {
      obs.components.map(c => {
        if (c.code.coding[0].code === gt.measure.coding[0].code) {
          if (c.value !== undefined) {
            mostRecentResultValue = c.value.quantityValue.value.toString();
          }
        }
      });
    }

    if (obs.effective !== undefined) {
      if (obs.effective.type.toUpperCase() === 'DATETIME') {
        observationDate = obs.effective.dateTime.date;
      }
    }
    [formattedTargetValue, rowHighlighted] = formatGoalTargetValue(gt, mostRecentResultValue);
    if (gt.measure) {
      const tv: TargetValue = {
        measure: gt.measure.text,
        date: observationDate, // todo: Get observation date when API is updated
        mostRecentResult: mostRecentResultValue.toString(),
        target: formattedTargetValue,
        highlighted: rowHighlighted,
        status: obs.status
      };
      return tv;
    }
    else return null;
  }
}