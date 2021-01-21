import { Component, Input, OnInit } from '@angular/core';
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
    uacrRowMax = 7;

    constructor(
        public uacrService: UacrService
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
                    cssClass = 'resultCritical';
                    break;
                case (val < 300 && val >= 25):
                    cssClass = 'resultBorderline';
                    break;
                case (val < 25):
                    cssClass = 'resultGood';
                    break;
                default:
                    break;
            }
        }
        return cssClass;
    }

}