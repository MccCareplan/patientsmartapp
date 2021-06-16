import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { MccObservation } from '../generated-data-api';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChartDataSets } from 'chart.js';
import moment from 'moment';
import { finalize } from 'rxjs/operators';
import { reformatYYYYMMDD, getLineChartOptionsObject, formatWotResult, getWotLineChartAnnotationsObject } from '../common/chart-utility-functions';
import { MatTableDataSource } from '@angular/material/table';
import { Wot, emptyWot, WotTableData } from '../data-model/weight-over-time';
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
export class WeightService extends DataService {
    wot: Wot = emptyWot;
    wotDataSource = new MatTableDataSource(this.wot.tableData);

    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/observations`, http);
    }

    async getPatientWotInfo(patientId): Promise<boolean> {
        const wotChartData: ChartDataSets = { data: [], label: 'Wot', fill: false };
        const xAxisLabels: string[] = [];
        this.wot = emptyWot;
        this.wot.tableData = [];
        this.wot.chartData = [];
        this.getPatientWot(patientId)
            .pipe(
                finalize(() => {
                    this.wot.chartData.push(wotChartData);
                    this.wotDataSource.data = this.wot.tableData;
                    if (!this.wot.tableData || this.wot.tableData.length === 0) return;

                    const vsLowDateRow: WotTableData = (this.wot.tableData.reduce((low, e) =>
                        reformatYYYYMMDD(low.date) < reformatYYYYMMDD(e.date) ? low : e));
                    const vsHighDateRow: WotTableData = (this.wot.tableData.reduce((high, e) =>
                        reformatYYYYMMDD(high.date) >= reformatYYYYMMDD(e.date) ? high : e));
                    this.wot.mostRecentWot.date = vsHighDateRow.date;
                    this.wot.mostRecentWot.value = vsHighDateRow.value;
                    this.wot.mostRecentWot.unit = vsHighDateRow.unit;
                    this.wot.mostRecentWot.test = vsHighDateRow.test;
                    this.wot.mostRecentWot.result = formatWotResult(vsHighDateRow.value, vsHighDateRow.unit);
                    const minDate = new Date(moment(vsLowDateRow.date.toString()).startOf('month').format('MMMM DD YYYY H:mm A'));
                    this.wot.suggestedMin = minDate;
                    const maxDate = new Date(moment(vsHighDateRow.date.toString()).add(1, 'M').startOf('month').format('YYYY-MM-DD hh:mm:ss'));
                    this.wot.suggestedMax = maxDate;
                    const lineChartOptions = getLineChartOptionsObject(null, null, this.wot.suggestedMin, this.wot.suggestedMax);
                    const lineChartAnnotations = getWotLineChartAnnotationsObject();
                    this.wot.lineChartOptions = { ...lineChartOptions, annotation: lineChartAnnotations };
                    this.wot.xAxisLabels = [];
                    let yr = '';
                    let prevYr = '';
                    this.wot.tableData.map(vs => {
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
                    this.wot.xAxisLabels = xAxisLabels;
                })
            )
            .subscribe(res => {
                this.wot.tableData.push(res);
                const wot = {
                    x: new Date(res.date),
                    y: res.value
                };
                // @ts-ignore
                wotChartData.data.push(wot);
            });

        return true;
    }

    getPatientWot(patientId: string): Observable<WotTableData> {
        return new Observable(observer => {
            this.getBySubjectIdAndCode(patientId, observationCodes.Wot)
                .pipe(finalize(() => {
                    observer.complete();
                }))
                .subscribe(observations => {
                    observations.map(obs => {
                        switch (Constants.featureToggling.preferredUnits.wot) {
                            case "kg":
                                if (obs.value.quantityValue.unit === "lb") {
                                    obs.value.quantityValue.value = +(obs.value.quantityValue.value * 0.453592).toFixed(1);
                                    obs.value.quantityValue.unit = "kg";
                                }
                                break;
                            case "lb":
                                if (obs.value.quantityValue.unit === "kg") {
                                    obs.value.quantityValue.value = +(obs.value.quantityValue.value * 2.20462).toFixed(0);
                                    obs.value.quantityValue.unit = "lb";
                                }
                                break;
                        };
                        const wot: WotTableData = {
                            date: obs.effective.dateTime.date,
                            value: obs.value.quantityValue.value,
                            unit: obs.value.quantityValue.unit,
                            test: obs.code.text
                        };
                        observer.next(wot);
                    });
                });
        });
    }
}