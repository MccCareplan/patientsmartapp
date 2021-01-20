import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Chart from 'chart.js';
import { ChartData, ChartDataSets, ChartOptions } from 'chart.js';
import { getDisplayValue, getInnerValue, getValueHighlighted } from 'src/app/common/chart-utility-functions';
import { Constants } from 'src/app/common/constants';
import { Effective, GenericType, MccCodeableConcept, MccReference, ObservationComponent, ReferenceRange } from 'src/app/generated-data-api';
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
    tableReady: boolean = false;

    @Input()
    key: string;

    chart: ChartDataSets[] = [{}];
    data: any[];

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
        let formattedData = [];
        let key = res[0].key;
        res.forEach((res: MccObservation, index) => {
            let formattedObject: any = {};
            formattedObject.title = key;
            formattedObject.date = this.formatDate(res.effective);
            formattedObject.displayValue = getDisplayValue(res.value);
            formattedObject.value = getInnerValue(res.value);
            formattedObject.highlighted = getValueHighlighted(res.value);
            formattedData.push(formattedObject);
        })
        this.data = formattedData;
        this.processChartData(key);
    }

    processChartData = (key) => {
        this.chart[0].data = this.data.map(x => { return x.value });
        this.chart[0].label = key;
        this.chart[0].fill = false;
        this.tableReady = true;
    }

    formatDate = (ef: Effective): Date => {
        return new Date(ef.dateTime.rawDate);
    }

    sortedField: string = "value";
    sortingDirection: boolean = false;
    sortData = (key) => {
        this.sortingDirection = !this.sortingDirection;
        this.sortedField = key;
        this.data = this.data.sort((a, b) => {
            if (this.sortingDirection) return a[key] > b[key] ? 1 : -1;
            else return a[key] > b[key] ? -1 : 1;
        })
    }
}


interface MccObservation {
    code?: MccCodeableConcept;
    status?: string;
    basedOn?: Array<MccReference>;
    effective?: Effective;
    value?: GenericType;
    note?: string;
    referenceRanges?: Array<ReferenceRange>;
    components?: Array<ObservationComponent>;
    category?: Array<MccCodeableConcept>;
    dataAbsentReason?: MccCodeableConcept;
    fhirid?: string;
    key?: string;
}