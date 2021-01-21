import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { EgfrService } from 'src/app/services/egfr.service';
import { formatEgfrResult } from 'src/app/common/utility-functions';
import { EgfrTableData } from 'src/app/data-model/egfr';
import { from } from 'rxjs';

@Component({
    selector: 'egfr-graph',
    templateUrl: './egfr.component.html',
    styleUrls: ['./egfr.component.scss']
})
export class EGFRGraphComponent implements OnInit {
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
    ready: boolean = false;

    // table
    displayedColumns = [];
    tableDataSource: any;
    egfrRowMax = 7;

    constructor(
        public egfrService: EgfrService
    ) {

    }

    ngOnInit() {
        this.chartInit();
    }

    chartInit = async (): Promise<void> => {
        this.tableDataSource = this.egfrService.egfrDataSource;
        this.lineChartData = this.egfrService.egfr.chartData;
        this.lineChartOptions = this.egfrService.egfr.lineChartOptions;
        this.displayedColumns = ['date', 'result'];
        this.lineChartColors = [
            {
                borderColor: 'black',
            },
        ];
        this.lineChartLegend = false;
        this.lineChartPlugins = [pluginAnnotations];
        this.lineChartType = 'line';
        this.ready = true;
    }


    EgfrResult(egfr: EgfrTableData): string {
        return formatEgfrResult(egfr.egfr, egfr.unit);
    }

    getEgfrRowCssClass(egfr: EgfrTableData): string {
        let cssClass = '';
        const val = egfr.egfr;
        if (val) {
            switch (true) {
                case (val >= 60):
                    cssClass = 'resultBorderline';
                    break;
                case (val < 60 && val >= 15):
                    cssClass = 'resultGood';
                    break;
                case (val < 15):
                    cssClass = 'resultCritical';
                    break;
                default:
                    break;
            }
        }
        return cssClass;
    }
}