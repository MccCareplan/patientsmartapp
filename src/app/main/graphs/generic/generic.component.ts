import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Constants } from 'src/app/common/constants';
import { WotTableData } from 'src/app/data-model/weight-over-time';
import { MccObservation } from 'src/app/generated-data-api';
import { ObservationsService } from 'src/app/services/observations.service.new';
import * as fromRoot from '../../../ngrx/reducers';

@Component({
    selector: 'generic-graph',
    templateUrl: './generic.component.html',
    styleUrls: ['./generic.component.scss']
})
export class GenericGraphComponent implements OnInit {
    @Input()
    showTable: boolean;

    @Input()
    key: string;

    lineChartData: ChartDataSets = { data: [], label: '' };;
    lineChartType: string;
    tableDataSource: any;
    patientId;
    longTermCondition;

    constructor(
        private router: Router,
        private store: Store<fromRoot.State>,
        private obsService: ObservationsService
    ) {

    }

    ngOnInit() {
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
        let valueToCall = Constants.labResultsMap.get(this.longTermCondition).find(x => x.name === this.key);
        if (!valueToCall) valueToCall = Constants.vitalSignsMap.get(this.longTermCondition).find(x => x.name === this.key);
        if (!valueToCall) return;
        switch (valueToCall.type) {
            case "valueset":
                this.obsService.getObservationsByValueSet(this.patientId, valueToCall.value, "descending", "50", this.key).then(this.processData);
                break;
            case "code":
                this.obsService.getObservations(this.patientId, valueToCall.value, this.key).then(this.processData);
                break;
            case "panel":
                this.obsService.getObservationsByPanel(this.patientId, valueToCall.value, "descending", "50", this.key).then(this.processData);
                break;
        }
    }

    processData = (res: MccObservation[]): void => {
        // transform observations into easily parsed table & chart data
        
    }
}