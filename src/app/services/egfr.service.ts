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

@Injectable({
    providedIn: 'root'
})
export class EgfrService extends DataService {
    egfr: Egfr = emptyEgfr;
    egfrDataSource: any;

    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/observationsbyvalueset`, http);
    }

    async getPatientEgfrInfo(patientId): Promise<boolean> {
        const egfrChartData: ChartDataSets = { data: [], label: 'eGfr', fill: false };
        const xAxisLabels: string[] = [];
        this.egfr = emptyEgfr;
        this.egfrDataSource = new MatTableDataSource(this.egfr.tableData);
        this.egfr.tableData = [];
        this.egfr.chartData = [];
        this.getPatientEgfr(patientId)
            .pipe(
                finalize(() => {
                    this.egfr.chartData.push(egfrChartData);
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
                })
            )
            .subscribe(res => {
                this.egfr.tableData.push(res);
                const egfr = {
                    x: new Date(res.date),
                    y: res.egfr
                };
                // @ts-ignore
                egfrChartData.data.push(egfr);
            });

        return true;
    }

    getPatientEgfr(patientId: string): Observable<EgfrTableData> {
        return new Observable(observer => {
            this.getObservationsByValueset(patientId, codes.observationValuesets.Egfr)
                .pipe(finalize(() => {
                    observer.complete();
                }))
                .subscribe(observations => {
                    observations.map(obs => {
                        switch (obs.code.coding[0].code) {
                            case codes.observationCodes.Egfr:
                                const egfr: EgfrTableData = {
                                    date: obs.effective.dateTime.date,
                                    egfr: obs.value.quantityValue.value,
                                    unit: obs.value.quantityValue.unit,
                                    test: obs.code.text
                                };
                                observer.next(egfr);
                                break;
                            default:
                        }
                    });
                });
        });
    }
}