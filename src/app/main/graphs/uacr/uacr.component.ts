import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { formatUacrResult } from 'src/app/common/utility-functions';
import { UacrTableData } from 'src/app/data-model/uacr';
import { UacrService } from 'src/app/services/uacr.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import moment from 'moment';

@Component({
    selector: 'uacr-graph',
    templateUrl: './uacr.component.html',
    styleUrls: ['./uacr.component.scss']
})
export class UACRGraphComponent implements OnInit {
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
    uacrRowMax = 7;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public uacrService: UacrService
    ) {

    }

    ngOnInit() {
        this.matTableWorkaroud();
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

    tableReady: boolean = false;
    matTableWorkaroud = (): void => {
        let counter = 0;
        let int = setInterval(() => {
            if (this.tableDataSource.filteredData.length > 0) {
                this.tableDataSource.sort = this.sort;
                this.tableDataSource.sortingDataAccessor = (data: UacrTableData, header: string) => {
                    switch (header) {
                        case ('result'): {
                            return data.uacr;
                        }
                        case ('date'): {
                            return moment(data.date);
                        }
                        default: {
                            return data[header];
                        }
                    }
                };
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