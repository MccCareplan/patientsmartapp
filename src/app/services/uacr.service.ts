import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { MccObservation } from '../generated-data-api';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChartDataSets } from 'chart.js';
import moment from 'moment';
import { finalize } from 'rxjs/operators';
import { reformatYYYYMMDD, getLineChartOptionsObject, formatWotResult, getWotLineChartAnnotationsObject, formatUacrResult, getUacrLineChartAnnotationsObject } from '../common/chart-utility-functions';
import { MatTableDataSource } from '@angular/material/table';
import { Wot, emptyWot, WotTableData } from '../data-model/weight-over-time';
import { emptyUacr, Uacr, UacrTableData } from '../data-model/uacr';
import { Constants } from '../common/constants';

enum observationCodes {
    Systolic = '8480-6',
    Diastolic = '8462-4',
    Egfr = '69405-9',
    Uacr = '9318-7',
    Wot = '29463-7',
    Blood_pressure = '85354-9'
}

enum observationValuesets {
    // Egfr = '2.16.840.1.113883.3.6929.3.1000',
    Egfr = '2.16.840.1.113762.1.4.1222.179',
    Uacr = '2.16.840.1.113883.3.6929.2.1002'
}


@Injectable({
    providedIn: 'root'
})
export class UacrService extends DataService {
    uacr: Uacr = emptyUacr;
    uacrDataSource = new MatTableDataSource(this.uacr.tableData);

    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/observationsbyvalueset`, http);
    }

    async getPatientUacrInfo(patientId): Promise<boolean> {
        const uacrChartData: ChartDataSets = { data: [], label: 'Uacr', fill: false };
        const xAxisLabels: string[] = [];
        this.uacr = emptyUacr;
        this.uacr.tableData = [];
        this.uacr.chartData = [];
        this.getPatientUacr(patientId)
            .pipe(
                finalize(() => {
                    this.uacr.chartData.push(uacrChartData);
                    this.uacrDataSource.data = this.uacr.tableData;
                    if (!this.uacr.tableData || this.uacr.tableData.length === 0) return;
                    const vsLowDateRow: UacrTableData = (this.uacr.tableData.reduce((low, e) =>
                        reformatYYYYMMDD(low.date) < reformatYYYYMMDD(e.date) ? low : e));
                    const vsHighDateRow: UacrTableData = (this.uacr.tableData.reduce((high, e) =>
                        reformatYYYYMMDD(high.date) >= reformatYYYYMMDD(e.date) ? high : e));
                    this.uacr.mostRecentUacr.date = vsHighDateRow.date;
                    this.uacr.mostRecentUacr.value = vsHighDateRow.uacr;
                    this.uacr.mostRecentUacr.unit = vsHighDateRow.unit;
                    this.uacr.mostRecentUacr.test = vsHighDateRow.test;
                    this.uacr.mostRecentUacr.result = formatUacrResult(vsHighDateRow.uacr, vsHighDateRow.unit);
                    const minDate = new Date(moment(vsLowDateRow.date.toString()).startOf('month').format('MMMM DD YYYY H:mm A'));
                    this.uacr.suggestedMin = minDate;
                    const maxDate = new Date(moment(vsHighDateRow.date.toString()).add(1, 'M').startOf('month').format('YYYY-MM-DD hh:mm:ss'));
                    this.uacr.suggestedMax = maxDate;
                    const lineChartOptions = getLineChartOptionsObject(0, 400, this.uacr.suggestedMin, this.uacr.suggestedMax);
                    const lineChartAnnotations = getUacrLineChartAnnotationsObject();
                    this.uacr.lineChartOptions = { ...lineChartOptions, annotation: lineChartAnnotations };
                    this.uacr.xAxisLabels = [];
                    let yr = '';
                    let prevYr = '';
                    this.uacr.tableData.map(vs => {
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
                    this.uacr.xAxisLabels = xAxisLabels;
                    setTimeout(() => { window[Constants.UACRisLoaded] = true; }, 1000);
                })
            )
            .subscribe(res => {
                this.uacr.tableData.push(res);
                const uacr = {
                    x: new Date(res.date),
                    y: res.uacr
                };
                // @ts-ignore
                uacrChartData.data.push(uacr);
            });

        return true;
    }

    getPatientUacr(patientId: string): Observable<UacrTableData> {
        return new Observable(observer => {
            this.getObservationsByValueset(patientId, observationValuesets.Uacr)
                .pipe(finalize(() => {
                    observer.complete();
                }))
                .subscribe(observations => {
                    observations.map(obs => {
                        const uacr: UacrTableData = {
                            date: obs.effective.dateTime.date,
                            uacr: obs.value.quantityValue.value,
                            unit: obs.value.quantityValue.unit,
                            test: obs.code.text
                        };
                        observer.next(uacr);
                    });
                });
        });
    }
}