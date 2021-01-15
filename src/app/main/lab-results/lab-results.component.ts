import { Component, OnInit } from '@angular/core';
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
  keyToObservations: Map<string, PatientLabResultsMap[]> = new Map<string, PatientLabResultsMap[]>();
  // set key off of patientid and long term care condition
  // use long term care condition as key to retrieve required observations
  // split required observations into 3 groups: panel, valueset and value
  // call 3 groups individually for custom success handlers
  // in each handler, format if necessary
  // required output is: "name", "value", "date"

  patientId: string = "cc-pat-pnoelle";
  longTermCondition: string = "ckd";

  constructor(
    private obsService: ObservationsService
  ) {

  }

  ngOnInit(): void {
    this.testData();

    let callsToMake: PatientLabResultsMap[] = this.keyToObservations.get(this.longTermCondition);
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
    Promise.all(promiseArray).then(
      (resArr: any[]) => {
        resArr.forEach((res: any, i) => {
          switch (true) {
            case (res && !res.length && res.status !== "notfound"): // code
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
      }
    )
  }





  testData() {
    this.keyToObservations.set(this.longTermCondition, [
      {
        name: "LDL",
        value: "13457-7",
        type: "code"
      },
      {
        name: "HDL",
        value: "2085-9",
        type: "code"
      },
      {
        name: "Hemoglobin",
        value: "2.16.840.1.113762.1.4.1222.111",
        type: "valueset"
      }
    ])
  }
}
