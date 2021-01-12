import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { formatWotResult } from 'src/app/common/utility-functions';
import { WeightService } from 'src/app/services/weight.service';
import { WotTableData } from 'src/app/data-model/weight-over-time';

@Component({
    selector: 'weight-graph',
    templateUrl: './weight.component.html',
    styleUrls: ['./weight.component.scss']
})
export class WeightGraphComponent implements OnInit {
    @Input()
    showTable: boolean;

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

    constructor(
        private weightService: WeightService
    ) {

    }

    ngOnInit() {
        this.tableDataSource = this.weightService.wotDataSource;
        this.lineChartData = this.weightService.wot.chartData;
        this.lineChartOptions = this.weightService.wot.lineChartOptions;
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
}