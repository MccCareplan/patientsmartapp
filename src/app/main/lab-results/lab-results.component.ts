import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
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

  formatJSON = (val: any): string => {
    return JSON.stringify(val);
  }

  ngOnInit(): void {
    this.testData();
    this.results = [];
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

  testData() {
    this.keyToObservations.set(this.longTermCondition, [
      {
        name: "Blood Pressure",
        value: "85354-9",
        type: "panel"
      },
      {
        name: "Weight",
        value: "29463-7",
        type: "panel"
      },
      {
        name: "eGFR",
        value: "2.16.840.1.113762.1.4.1222.179",
        type: "valueset"
      },
      {
        name: "Serum Creatinine",
        value: "2.16.840.1.113762.1.4.1222.111",
        type: "valueset"
      },
      ,
      {
        name: "Hemoglobin",
        value: "2.16.840.1.113762.1.4.1222.114",
        type: "valueset"
      },
      {
        name: "A1C",
        value: "2.16.840.1.113762.1.4.1222.119",
        type: "valueset"
      },
      {
        name: "Serum Potassium",
        value: "2.16.840.1.113762.1.4.1222.120",
        type: "valueset"
      },
      {
        name: "Serum phosphorus",
        value: "2.16.840.1.113762.1.4.1222.123",
        type: "valueset"
      },
      {
        name: "Calcium",
        value: "17861-6",
        type: "code"
      },
      {
        name: "Corrected Calcium",
        value: "2.16.840.1.113762.1.4.1222.122",
        type: "valueset"
      },
      {
        name: "Serum Albumin",
        value: "2.16.840.1.113762.1.4.1222.151",
        type: "valueset"
      },
      {
        name: "Transferrin Staturation",
        value: "2.16.840.1.113762.1.4.1222.118",
        type: "valueset"
      },
      {
        name: "Ferritin",
        value: "2.16.840.1.113762.1.4.1222.140",
        type: "valueset"
      },
      {
        name: "Blood Urea Nitrogen",
        value: "2.16.840.1.113762.1.4.1222.113",
        type: "valueset"
      },
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
        name: "Triglycerides",
        value: "2.16.840.1.113762.1.4.1222.137",
        type: "valueset"
      },
      {
        name: "Total Cholesterol",
        value: "2.16.840.1.113762.1.4.1222.139",
        type: "valueset"
      },
      {
        name: "Vitamin D",
        value: "2.16.840.1.113762.1.4.1222.126",
        type: "valueset"
      },
      {
        name: "KT/V",
        value: "2.16.840.1.113762.1.4.1222.128",
        type: "valueset"
      },
      {
        name: "Intact Parathyroid Hormone",
        value: "2.16.840.1.113762.1.4.1222.129",
        type: "valueset"
      },
      {
        name: "Serum Biacarbonate",
        value: "2.16.840.1.113762.1.4.1222.130",
        type: "valueset"
      },
      {
        name: "Sodium",
        value: "2.16.840.1.113762.1.4.1222.131",
        type: "valueset"
      },
      {
        name: "Chloride",
        value: "2.16.840.1.113762.1.4.1222.132",
        type: "valueset"
      },
    ])
  }
}
