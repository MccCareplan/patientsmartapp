import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChartDataSets } from 'chart.js';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { reformatYYYYMMDD, getLineChartOptionsObject, formatEgfrResult, getEgrLineChartAnnotationsObject } from '../common/chart-utility-functions';
import { MatTableDataSource } from '@angular/material/table';
import { Egfr, emptyEgfr, EgfrTableData } from '../data-model/egfr';
import { codes } from '../data-model/codes';
import { MccCoding } from 'src/generated-data-api';

@Injectable({
    providedIn: 'root'
})
export class EgfrService extends DataService {
    egfr: Egfr = emptyEgfr;
    egfrDataSource: any;
    aggregatedChartData: ChartDataSets[] = [];
    aggregatedTableData: any[] = [];

    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/observationssegmented`, http);
    }

    async getPatientEgfrInfo(patientId): Promise<boolean> {
        this.egfr = emptyEgfr;
        this.egfrDataSource = new MatTableDataSource(this.egfr.tableData);
        this.egfr.tableData = [];
        this.egfr.chartData = [];
        this.getPatientEgfr(patientId)
            .pipe(
                finalize(() => {
                    this.filterDataSet(0);
                })
            )
            .subscribe(res => {
                const egfr = {
                    x: new Date(res.date),
                    y: res.egfr
                };
                if (!this.aggregatedChartData.find(x => x.label === res.test)) {
                    this.aggregatedChartData.push({
                        data: [egfr],
                        label: res.test,
                        fill: false
                    })
                    this.aggregatedTableData.push({
                        data: [res],
                        label: res.test
                    })
                }
                else {
                    // @ts-ignore
                    this.aggregatedChartData.find(x => x.label === res.test).data.push(egfr);
                    this.aggregatedTableData.find(x => x.label === res.test).data.push(res);
                }
            });

        return true;
    }

    filterDataSet(index: number): void {
        const xAxisLabels: string[] = [];

        this.egfr.chartData = [];
        this.egfr.chartData.push(this.aggregatedChartData[index]);

        this.egfr.tableData = [];
        this.egfr.tableData.push(this.aggregatedTableData[index].data);
        debugger;

        this.egfrDataSource.data = this.egfr.tableData;
        const vsLowDateRow: EgfrTableData = (this.egfr.tableData.reduce((low, e) =>
            reformatYYYYMMDD(low.date) < reformatYYYYMMDD(e.date) ? low : e));
        const vsHighDateRow: EgfrTableData = (this.egfr.tableData.reduce((high, e) =>
            reformatYYYYMMDD(high.date) >= reformatYYYYMMDD(e.date) ? high : e));
        this.egfr.mostRecentEgfr.date = vsHighDateRow.date;
        this.egfr.mostRecentEgfr.value = vsHighDateRow.egfr;
        this.egfr.mostRecentEgfr.unit = vsHighDateRow.unit;
        this.egfr.mostRecentEgfr.test = vsHighDateRow.test;
        this.egfr.mostRecentEgfr.result = formatEgfrResult(vsHighDateRow.egfr, vsHighDateRow.unit);
        const minDate = new Date(moment(vsLowDateRow.date.toString()).startOf('month').format('MMMM DD YYYY H:mm A'));
        this.egfr.suggestedMin = minDate;
        const maxDate = new Date(moment(vsHighDateRow.date.toString()).add(1, 'M').startOf('month').format('YYYY-MM-DD hh:mm:ss'));
        this.egfr.suggestedMax = maxDate;
        const lineChartOptions = getLineChartOptionsObject(10, 70, this.egfr.suggestedMin, this.egfr.suggestedMax);
        const lineChartAnnotations = getEgrLineChartAnnotationsObject();
        this.egfr.lineChartOptions = { ...lineChartOptions, annotation: lineChartAnnotations };
        this.egfr.xAxisLabels = [];
        let yr = '';
        let prevYr = '';
        this.egfr.tableData.map(vs => {
            if (moment(vs.date.toString()).format('YYYY') !== prevYr) {
                yr = moment(vs.date.toString()).format('YYYY');
                prevYr = yr;
            } else {
                yr = '';
            }
            // @ts-ignore
            xAxisLabels.push([moment(vs.date.toString()).format('MMM'),
            moment(vs.date.toString()).format('DD'),
                yr]
            );
        });
        this.egfr.xAxisLabels = xAxisLabels;
    }

    getPatientEgfr(patientId: string): Observable<EgfrTableData> {
        return new Observable(observer => {
            this.getSegementedObservationsByValueSet(patientId, codes.observationValuesets.Egfr)
                .pipe(finalize(() => {
                    observer.complete();
                }))
                .subscribe(obsCollection => {
                    obsCollection.observations.map(observations => {
                        observations.primaryCode.display = this.formatEGFRCode(observations.primaryCode);
                        observations.observations.forEach(obs => {
                            const egfr: EgfrTableData = {
                                date: obs.effective.dateTime.date,
                                egfr: obs.value.quantityValue.value,
                                unit: obs.value.quantityValue.unit,
                                test: observations.primaryCode.display
                            };
                            observer.next(egfr);
                        });
                    })
                });
        });
    }

    formatEGFRCode(primaryCode: MccCoding): string {
        //"Glomerular filtration rate/1.73 sq M.predicted [Volume Rate/Area] in Serum, Plasma or Blood"
        return primaryCode.display.substr(0, primaryCode.display.indexOf("[")) + "[" + primaryCode.code + "]";
    }
}