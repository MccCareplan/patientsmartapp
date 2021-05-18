import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { ChartDataSets, ChartOptions } from 'chart.js';
import moment from 'moment';
import { Color, Label } from 'ng2-charts';
import { formatMccDate, getDisplayValue, getInnerValue, getValueHighlighted } from 'src/app/common/chart-utility-functions';
import { Effective, MccObservation, SimpleQuestionnaireItem } from 'src/app/generated-data-api';
import { ObservationsService } from 'src/app/services/observations.service.new';
import * as fromRoot from '../../../ngrx/reducers';
import labMappingsJSON from "../../../../assets/json/data/lab-mappings.json";
import vitalMappingsJSON from "../../../../assets/json/data/vital-mappings.json";


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

    lineChartColors: Color[] = [{
        borderColor: "#409FFF"
    }];
    chartDataSets: ChartDataSets[] = [{}];
    lineChartLabels: Label[] = [];
    lineChartOptions: ChartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        elements: {
            line: {
                tension: 0
            }
        }
    }
    displayedColumns: any[] = ["value", "date"];
    showPaginator: boolean = true;

    data;
    tableData;
    patientId;
    longTermCondition;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private store: Store<fromRoot.State>,
        private obsService: ObservationsService
    ) {

    }

    ngOnInit() {
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
        let valueToCall = this.parseMaps();
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
            case "question":
                this.obsService.getQuestionnaireItems(this.patientId, valueToCall.value).then(this.processQuestionnaire);
                break;
        }
    }

    parseMaps = (): any => {
        let valueToCall: any;
        for (const property in labMappingsJSON) {
            if (labMappingsJSON[property] && labMappingsJSON[property].length > 0 && labMappingsJSON[property].find(x => x.name === this.key)) {
                valueToCall = labMappingsJSON[property].find(x => x.name === this.key);
            }
        }
        if (!valueToCall) {
            for (const property in vitalMappingsJSON) {
                if (vitalMappingsJSON[property] && vitalMappingsJSON[property].length > 0 && vitalMappingsJSON[property].find(x => x.name === this.key)) {
                    valueToCall = vitalMappingsJSON[property].find(x => x.name === this.key);
                }
            }
        }
        return valueToCall;
    }

    processData = (res: MccObservation[]): void => {
        let formattedData = [];
        res.forEach((res: MccObservation, index) => {
            let formattedObject: any = {};
            formattedObject.title = res.code.text;
            formattedObject.date = this.formatDate(res.effective);
            formattedObject.displayValue = getDisplayValue(res.value);
            formattedObject.value = getInnerValue(res.value);
            formattedObject.highlighted = getValueHighlighted(res.value);
            formattedData.push(formattedObject);
        })
        this.data = formattedData.sort((a, b) => { return a.date > b.date ? -1 : 1; });
        this.tableData = new MatTableDataSource(this.data);
        this.tableData.sort = this.sort;
        this.tableData.paginator = this.paginator;
        this.showPaginator = this.data.length > 5;
        this.processChartData(this.key);
    }

    processQuestionnaire = (res: SimpleQuestionnaireItem[]): void => {
        let formattedData = [];
        res.forEach((res: SimpleQuestionnaireItem, index) => {
            let formattedObject: any = {};
            formattedObject.title = res.item.text;
            formattedObject.date = formatMccDate(res.authored);
            formattedObject.displayValue = getDisplayValue(res.item.answers[0].value);
            formattedObject.value = getInnerValue(res.item.answers[0].value);
            formattedObject.highlighted = getValueHighlighted(res.item.answers[0].value);
            formattedData.push(formattedObject);
        })
        this.data = formattedData.sort((a, b) => { return a.date > b.date ? -1 : 1; });
        this.tableData = new MatTableDataSource(this.data);
        this.tableData.sort = this.sort;
        this.tableData.paginator = this.paginator;
        this.showPaginator = this.data.length > 5;
        if (res && res.length > 0) {
            this.processChartData(this.key);
        }
    }

    processChartData = (key) => {
        let chartData = [...this.data].sort((a, b) => { return a.date > b.date ? 1 : -1; });
        this.chartDataSets[0].data = chartData.map(x => { return x.value });
        this.lineChartLabels = chartData.map(x => { return moment(x.date).format("MM/YYYY") })
        this.chartDataSets[0].label = key;
        this.chartDataSets[0].fill = false;
    }

    formatDate = (ef: Effective): Date => {
        return new Date(ef.dateTime.rawDate);
    }
}
