import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { MccObservation, SimpleQuestionnaireItem } from "src/app/generated-data-api";
import { ObservationsService } from "src/app/services/observations.service.new";
import * as fromRoot from '../../ngrx/reducers';
import { Router, NavigationExtras, Params } from '@angular/router';
import { formatEffectiveDate, formatMccDate, getDisplayValue } from "src/app/common/chart-utility-functions";
import { Constants } from "src/app/common/constants";

interface FormattedResult {
    name: string;
    value: string;
    date: any;
}

interface PatientLabResultsMap {
    name: string;
    value: string;
    type: string;
}

@Component({
    selector: "vital-signs",
    templateUrl: "./vital-signs.component.html",
    styleUrls: ["./vital-signs.component.scss"]
})
export class VitalSignsComponent implements OnInit {
    results: FormattedResult[] = [];
    patientId: string;
    longTermCondition: string;


    constructor(
        private router: Router,
        private store: Store<fromRoot.State>,
        private obsService: ObservationsService
    ) {

    }

    navToGraph(res: FormattedResult) {
        if (res.value === "No Data Available") return;
        switch (res.name.toUpperCase()) {
            case "BLOOD PRESSURE":
                this.router.navigate(["/lab-graph"], <NavigationExtras>{
                    queryParams: <Params>{ key: "bp" },
                    queryParamsHandling: "merge"
                });
                break;
            case "WEIGHT":
                this.router.navigate(["/lab-graph"], <NavigationExtras>{
                    queryParams: <Params>{ key: "weight" },
                    queryParamsHandling: "merge"
                });
                break;
            case "EGFR":
                this.router.navigate(["/lab-graph"], <NavigationExtras>{
                    queryParams: <Params>{ key: "egfr" },
                    queryParamsHandling: "merge"
                });
                break;
            case "UACR":
                this.router.navigate(["/lab-graph"], <NavigationExtras>{
                    queryParams: <Params>{ key: "uacr" },
                    queryParamsHandling: "merge"
                });
                break;
            default:
                this.router.navigate(["/lab-graph"], <NavigationExtras>{
                    queryParams: <Params>{ key: res.name },
                    queryParamsHandling: "merge"
                });
                break;
        }
    }

    ngOnInit(): void {
        this.store.select(fromRoot.getCarePlansSummary).subscribe(c => {
            if (c && c.length > 0)
                this.longTermCondition = "ckd";
            else if (c && c.length === 0)
                this.longTermCondition = "general";
            if (this.patientId && this.longTermCondition)
                this.loadData();
        });

        this.store.select(fromRoot.getPatientProfile).subscribe(x => {
            if (x && x.fhirid) {
                this.patientId = x.fhirid;
                if (this.patientId && this.longTermCondition)
                    this.loadData();
            }
        });
    }

    loadData = (): void => {
        this.results = [];
        if (!Constants.vitalMappings[this.longTermCondition]) {
            return;
        }
        let callsToMake: PatientLabResultsMap[] = Constants.vitalMappings[this.longTermCondition];
        let promiseArray = [];
        callsToMake.forEach((v, i) => {
            switch (v.type) {
                case "code":
                    promiseArray.push(this.obsService.getObservation(this.patientId, v.value, v.name));
                    break;
                case "valueset":
                    promiseArray.push(this.obsService.getObservationsByValueSet(this.patientId, v.value, "descending", "1", v.name));
                    break;
                case "panel":
                    promiseArray.push(this.obsService.getObservationsByPanel(this.patientId, v.value, "descending", "1", v.name));
                    break;
                case "question":
                    promiseArray.push(this.obsService.getQuestionnaireItem(this.patientId, v.value));
                    break;
            }
        })
        Promise.all(promiseArray).then((resArr: any[]) => {
            resArr.forEach((res: any, index: number) => {
                let correspondingCall = callsToMake[index];
                if (!res || res.length < 1 || res.status === "notfound" || res.fhirid === "notfound") {
                    this.results.push({ name: correspondingCall.name, value: "No Data Available", date: "" })
                }
                else {
                    switch (correspondingCall.type) {
                        case "code":
                            this.results.push({ name: correspondingCall.name, value: getDisplayValue((<MccObservation>res).value), date: formatEffectiveDate((<MccObservation>res).effective) });
                            break;
                        case "valueset":
                            this.results.push({ name: correspondingCall.name, value: getDisplayValue((<MccObservation>res[0]).value), date: formatEffectiveDate((<MccObservation>res[0]).effective) });
                            break;
                        case "panel":
                            this.results.push({ name: correspondingCall.name, value: getDisplayValue((<MccObservation>res[0]).value), date: formatEffectiveDate((<MccObservation>res[0]).effective) });
                            break;
                        case "question":
                            this.results.push({ name: correspondingCall.name, value: getDisplayValue((<SimpleQuestionnaireItem>res).item.answers[0].value), date: formatMccDate((<SimpleQuestionnaireItem>res).authored) })
                            break;
                    }
                }
            });
        });
    }
}