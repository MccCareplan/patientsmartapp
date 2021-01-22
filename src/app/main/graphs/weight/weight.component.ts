import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { formatWotResult } from 'src/app/common/utility-functions';
import { WeightService } from 'src/app/services/weight.service';
import { WotTableData } from 'src/app/data-model/weight-over-time';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'weight-graph',
    templateUrl: './weight.component.html',
    styleUrls: ['./weight.component.scss']
})
export class WeightGraphComponent implements OnInit {
    @Input()
    showTable: boolean = true;

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
    wotRowMax = 7;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public weightService: WeightService
    ) {

    }

    ngOnInit() {
        this.matTableWorkaroud();
        this.tableDataSource = this.weightService.wotDataSource;
        this.wotRowMax = 7;
        this.lineChartColors = [
            {
                borderColor: 'black',
            },
        ];
        this.lineChartLegend = false;
        this.lineChartPlugins = [pluginAnnotations];
        this.lineChartType = 'line';
        this.displayedColumns = ['date', 'result'];
    }


    WotResult(wot: WotTableData): string {
        return formatWotResult(wot.value, wot.unit);
    }

    getWotRowCssClass(wot: WotTableData): string {
        let cssClass = '';
        const val = wot.value;
        if (val) {
            switch (true) {
                case (val >= 200):
                    cssClass = 'resultBorderline';
                    break;
                case (val < 200 && val >= 105):
                    cssClass = 'resultGood';
                    break;
                case (val < 105):
                    cssClass = 'resultCritical';
                    break;
                default:
                    break;
            }
        }
        return cssClass;
    }

    tableReady: boolean = false;
    matTableWorkaroud = (): void => {
        let counter = 0;
        let int = setInterval(() => {
            if (this.tableDataSource.filteredData.length > 0) {
                this.tableDataSource.sort = this.sort;
                this.tableDataSource.paginator = this.paginator;
                this.tableReady = true;
                clearInterval(int);
            }
            if (++counter > 20) {
                clearInterval(int);
            }
        }, 250);
    }
}