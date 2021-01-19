import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
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
    code: string;

    lineChartData: ChartDataSets = { data: [], label: '' };;
    lineChartType: string;
    tableDataSource: any;
    patientId;

    constructor(
        private router: Router,
        private store: Store<fromRoot.State>,
        private obsService: ObservationsService
    ) {

    }

    ngOnInit() {
        this.store.select(fromRoot.getPatientProfile).subscribe(x => {
            if (x && x.fhirid) {
                this.patientId = x.fhirid;
                this.obsService.getObservations(this.patientId, this.code).then(
                    (res: MccObservation[]) => {
                        res.forEach((val: MccObservation, index) => {
                            // this.lineChartData.data.push(val.value.quantityValue.value);
                        })
                    });
            }
        });
    }
}