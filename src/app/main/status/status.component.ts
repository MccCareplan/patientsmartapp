import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Utilities } from 'src/app/common/utilities';
import { ConditionLists, ConditionSummary, MccCondition } from 'src/app/generated-data-api';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { MccPatient } from 'src/generated-data-api';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  ddlConditions: ConditionSummary[] = [];
  patient: MccPatient = {};
  pId: string;
  selectedCondition: ConditionSummary = {};


  constructor(
    private subjectService: SubjectService
  ) { }

  ngOnInit(): void {
    this.pId = Utilities.getQueryStringParam("subject");
    if (this.pId) {
      this.getInitialData();
    }
  }

  getInitialData = (): void => {
    const patientInfo$ = this.subjectService.getPatientById(this.pId);
    const conditions$ = this.subjectService.getPatientConditionsById(this.pId);
    const callArr = [patientInfo$, conditions$];

    let multiCall = forkJoin(callArr);
    // call both patient info and conditionLists
    multiCall.subscribe(
      ([patient, conditionLists]: [MccPatient, ConditionLists]) => {
        this.patient = patient;
        // Check if active conditions is null
        if (conditionLists.activeConditions && conditionLists.activeConditions.length > 0) {
          // if not null, filter by those with a profile id
          conditionLists.activeConditions = conditionLists.activeConditions.filter(x => x.profileId);
          // Sort alphabetically by code text
          conditionLists.activeConditions.sort((a, b) => {
            if (a.code && a.code.text && b.code && b.code.text) {
              return a.code.text.toUpperCase() > b.code.text.toUpperCase() ? 1 : -1;
            }
            else return 0;
          })
          // If there are active conditions with profile ids, select the first
          if (conditionLists.activeConditions.length > 0) {
            this.ddlConditions = conditionLists.activeConditions;
            this.chronicConditionSelected(0);
          }
        }
      })
  }

  // Select drop down event to change selected chronic condition
  chronicConditionSelected = (conditionIndex: number): void => {
    if (conditionIndex === -1) conditionIndex = 0;
    this.selectedCondition = this.ddlConditions[conditionIndex];
  }

  filterAvailableButtons = (): void => {

  }
}