import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ConditionLists, ConditionSummary } from 'src/app/generated-data-api';
import { MccPatient } from 'src/generated-data-api';
import * as fromRoot from '../../ngrx/reducers';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  careplanid$: Observable<string>;
  conditionsList$: Observable<ConditionLists>;
  ddlConditions$: Observable<ConditionSummary[]>
  noActiveCarePlan: boolean;
  patient$: Observable<MccPatient>;
  selectedCondition: ConditionSummary;

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.patient$ = this.store.select(fromRoot.getPatientProfile);
    this.conditionsList$ = this.store.select(fromRoot.getConditionsSummary);
    this.conditionsList$.subscribe(this.populateDropDownList)
  }

  populateDropDownList = (conditionsList: ConditionLists): void => {
    if (conditionsList.activeConditions && conditionsList.activeConditions.length > 0) {
      // Filter by those with a profile id
      let filteredActiveConditions = conditionsList.activeConditions.filter(x => x.profileId);
      // Sort alphabetically by code text
      filteredActiveConditions.sort((a, b) => {
        if (a.code && a.code.text && b.code && b.code.text) {
          return a.code.text.toUpperCase() > b.code.text.toUpperCase() ? 1 : -1;
        }
        else return 0;
      })
      // If there are active conditions with profile ids, select the first
      if (filteredActiveConditions.length > 0) {
        this.ddlConditions$ = of(filteredActiveConditions);
        this.chronicConditionSelected(0);
      }
      else {
        this.noActiveCarePlan = true;
      }
    }
  }

  // Select drop down event to change selected chronic condition
  chronicConditionSelected = (conditionIndex: number): void => {
    if (conditionIndex === -1) return;
    this.selectedCondition = this.ddlConditions$[conditionIndex];
  }

  filterAvailableButtons = (): void => {

  }
}