import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Utilities } from 'src/app/common/utilities';
import { ConditionLists, ConditionSummary } from 'src/app/generated-data-api';
import { SubjectService } from 'src/app/services/subject/subject.service';
import { MccPatient } from 'src/generated-data-api';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  conditionLists: ConditionLists = {};
  displayContent: boolean = true;
  patient: MccPatient = {};
  pId: string;
  selectedCondition: any = {};


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
        this.conditionLists = conditionLists;
        if (this.conditionLists.activeConditions && this.conditionLists.activeConditions.length > 0) {
          this.chronicConditionSelected(0);
        }
        this.displayContent = true;
      })
  }

  chronicConditionSelected = (conditionIndex: number): void => {
    this.selectedCondition = this.conditionLists.activeConditions[conditionIndex];

    // What do I call here?
  }

  filterAvailableButtons = (): void => {

  }
}