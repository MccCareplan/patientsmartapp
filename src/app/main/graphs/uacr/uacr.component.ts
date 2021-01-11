import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { formatUacrResult } from 'src/app/common/utility-functions';
import { UacrTableData } from 'src/app/data-model/uacr';
import { UacrService } from 'src/app/services/uacr.service';

@Component({
    selector: 'uacr-graph',
    templateUrl: './uacr.component.html',
    styleUrls: ['./uacr.component.scss']
})
export class UACRGraphComponent implements OnInit {
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
    uacrRowMax = 7;

    constructor(
        private uacrService: UacrService
    ) {

    }

    ngOnInit() {
        this.tableDataSource = this.uacrService.uacrDataSource;
        this.uacrRowMax = 7;
        this.lineChartColors = [
            {
                backgroundColor: 'white',
                borderColor: 'black',
            },
        ];
        this.lineChartLegend = false;
        this.lineChartPlugins = [pluginAnnotations];
        this.lineChartType = 'line';
        this.displayedColumns = ['date', 'result'];
        this.lineChartData = this.uacrService.uacr.chartData;
        this.lineChartOptions = this.uacrService.uacr.lineChartOptions;
    }

    UacrResult(uacr: UacrTableData): string {
        return formatUacrResult(uacr.uacr, uacr.unit);
    }

    getUacrRowCssClass(uacr: UacrTableData): string {
        let cssClass = '';
        const val = uacr.uacr;
        if (val) {
            switch (true) {
                case (val >= 300):
                    cssClass = 'resultBorderline';
                    break;
                case (val < 300 && val >= 25):
                    cssClass = 'resultGood';
                    break;
                case (val < 25):
                    cssClass = 'resultCritical';
                    break;
                default:
                    break;
            }
        }
        return cssClass;
    }

}