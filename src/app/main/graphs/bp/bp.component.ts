import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { BloodPresureService } from 'src/app/services/blood-pressure.service';

@Component({
    selector: 'bp-graph',
    templateUrl: './bp.component.html',
    styleUrls: ['./bp.component.scss']
})
export class BPGraphComponent implements OnInit {
    @Input()
    showTable: boolean;

    @Input()
    embedded: boolean = false;

    // chart
    lineChartAnnotations: any;
    lineChartColors: Color[];
    lineChartData: ChartDataSets[];
    lineChartLabels: Label[];
    lineChartLegend: boolean;
    lineChartOptions: any;
    lineChartPlugins: any[];
    lineChartType: string;

    // table
    displayedColumns = [];
    tableDataSource: any;
    vitalSignsRowMax = 7;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public bpService: BloodPresureService
    ) {

    }

    ngOnInit() {
        this.tableDataSource = this.bpService.vitalSignsDataSource;
        this.displayedColumns = ['date', 'systolic', 'diastolic'];
        this.lineChartLabels = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
        this.lineChartColors = [
            {
                borderColor: 'black',
            },
        ];

        this.lineChartLegend = true;
        this.lineChartPlugins = [
            {
                annotation: {
                    annotations: {
                        drawTime: 'beforeDatasetsDraw',
                        type: 'box',
                        xScaleID: 'x-axis-0',
                        yScaleID: 'y-axis-0',
                        borderWidth: 0,
                        yMin: 70,
                        yMax: 130,
                        backgroundColor: 'rgba(46, 204, 113,0.3)'
                    }
                }
            }];
        this.lineChartType = 'line';
    }
}