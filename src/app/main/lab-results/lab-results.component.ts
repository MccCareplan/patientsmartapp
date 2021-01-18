import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../ngrx/reducers';
import { Constants } from 'src/app/common/constants';
import { MccObservation } from 'src/app/generated-data-api';
import { ObservationsService } from 'src/app/services/observations.service.new';

interface PatientLabResultsMap {
  name: string;
  value: string;
  type: string;
}

@Component({
  selector: 'lab-results',
  templateUrl: './lab-results.component.html',
  styleUrls: ['./lab-results.component.scss']
})
export class LabResultsComponent implements OnInit {
  results: MccObservation[] = [];
  patientId: string;
  longTermCondition: string;

  constructor(
    private store: Store<fromRoot.State>,
    private obsService: ObservationsService
  ) {

  }

  formatJSON = (val: any): string => {
    return JSON.stringify(val);
  }

  ngOnInit(): void {
    this.store.select(fromRoot.getCarePlansSummary).subscribe(c => {
      if (c && c.length > 0) {
        this.longTermCondition = c[0].fhirid.split("-")[3];
        if (this.patientId && this.longTermCondition) this.loadData();
      }
    });
    this.store.select(fromRoot.getPatientProfile).subscribe(x => {
      if (x && x.fhirid) {
        this.patientId = x.fhirid;
        if (this.patientId && this.longTermCondition) this.loadData();
      }
    });
  }

  loadData = (): void => {
    this.results = [];
    let callsToMake: PatientLabResultsMap[] = Constants.labResultsMap.get(this.longTermCondition);
    let promiseArray = [];
    callsToMake.forEach((v, i) => {
      switch (v.type) {
        case "code":
          promiseArray.push(this.obsService.getObservation(this.patientId, v.value));
          break;
        case "valueset":
          promiseArray.push(this.obsService.getObservationsByValueSet(this.patientId, v.value, "descending", "1"));
          break;
        case "panel":
          promiseArray.push(this.obsService.getObservationsByPanel(this.patientId, v.value));
          break;
      }
    })
    Promise.all(promiseArray).then((resArr: any[]) => {
      resArr.filter(x => this.filterOutBadValues(x)).forEach((res: any, index: number) => {
        switch (true) {
          case (res && !res.length): // code
            this.results.push(res);
            break;
          case (res && res.length > 0): // valueset
            this.results.push(res[0]);
            break;
          case (res && res.length > 1): // panel
            this.results.push(res[0]);
            break;
        }
      });
    });
  }

  filterOutBadValues = (res: any): boolean => {
    if (res.status === "notfound")
      return false;
    if (!res)
      return false;
    if (res.length < 1)
      return false;
    return true;
  }
}
