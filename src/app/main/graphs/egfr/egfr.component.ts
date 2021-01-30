import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { EgfrService } from 'src/app/services/egfr.service';
import { formatEgfrResult } from 'src/app/common/utility-functions';
import { EgfrTableData } from 'src/app/data-model/egfr';
import { from } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'egfr-graph',
    templateUrl: './egfr.component.html',
    styleUrls: ['./egfr.component.scss']
})
export class EGFRGraphComponent implements OnInit {
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
    ready: boolean = false;

    // table
    displayedColumns = [];
    tableDataSource: any;
    egfrRowMax = 7;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public egfrService: EgfrService
    ) {

    }

    ngOnInit() {
        this.chartInit();
    }

    chartInit = async (): Promise<void> => {
        this.matTableWorkaroud();
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

    tableReady: boolean = false;
    matTableWorkaroud = (): void => {
        let counter = 0;
        let int = setInterval(() => {
            if (this.tableDataSource && this.tableDataSource.filteredData && this.tableDataSource.filteredData.length > 0) {
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