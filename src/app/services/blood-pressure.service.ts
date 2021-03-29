import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { MccObservation } from '../generated-data-api';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChartDataSets } from 'chart.js';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { reformatYYYYMMDD, getLineChartOptionsObject } from '../common/chart-utility-functions';
import { emptyVitalSigns, VitalSigns, VitalSignsTableData } from '../data-model/vitalSigns';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
    providedIn: 'root'
})
export class BloodPresureService extends DataService {
    vitalSigns: VitalSigns = emptyVitalSigns;
    vitalSignsDataSource: any = new MatTableDataSource(this.vitalSigns.tableData);

    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/observations`, http);
    }

    getBloodPressureByPatientId(subjectId: string): Observable<MccObservation[]> {
        return this.getBloodPressureById(subjectId);
    }

    async getPatientBPInfo(patientId): Promise<boolean> {
        this.vitalSignsDataSource.data = this.vitalSigns.tableData;

        const systolicChartData: ChartDataSets = { data: [], label: 'Systolic', fill: false };
        const diastolicChartData: ChartDataSets = { data: [], label: 'Diastolic', fill: false };
        // const xAxisLabels: string[] = [];
        const xAxisLabels: string[] = [];
        this.vitalSigns = emptyVitalSigns;
        this.vitalSigns.tableData = [];
        this.vitalSigns.chartData = [];

        this.getPatientVitalSigns(patientId)
            .pipe(
                finalize(() => {
                    this.vitalSigns.chartData = [];
                    this.vitalSigns.chartData.push(systolicChartData);
                    this.vitalSigns.chartData.push(diastolicChartData);
                    this.vitalSignsDataSource.data = this.vitalSigns.tableData;
                    if (!this.vitalSigns.tableData || this.vitalSigns.tableData.length === 0) return;

                    const vsLowDateRow: VitalSignsTableData = (this.vitalSigns.tableData.reduce((low, vs) =>
                        reformatYYYYMMDD(low.date) < reformatYYYYMMDD(vs.date) ? low : vs));
                    const vsHighDateRow: VitalSignsTableData = (this.vitalSigns.tableData.reduce((high, vs) =>
                        reformatYYYYMMDD(high.date) >= reformatYYYYMMDD(vs.date) ? high : vs));
                    this.vitalSigns.mostRecentSystolic.date = vsHighDateRow.date;
                    this.vitalSigns.mostRecentSystolic.value = vsHighDateRow.systolic;
                    this.vitalSigns.mostRecentDiastolic.date = vsHighDateRow.date;
                    this.vitalSigns.mostRecentDiastolic.value = vsHighDateRow.diastolic;
                    const minDate = new Date(moment(vsLowDateRow.date.toString()).startOf('month').format('MMMM DD YYYY H:mm A'));
                    this.vitalSigns.suggestedMin = minDate;
                    const maxDate = new Date(moment(vsHighDateRow.date.toString()).add(1, 'M').startOf('month').format('YYYY-MM-DD hh:mm:ss'));
                    this.vitalSigns.suggestedMax = maxDate;
                    this.vitalSigns.lineChartOptions = getLineChartOptionsObject(50, 180, this.vitalSigns.suggestedMin, this.vitalSigns.suggestedMax);
                    this.vitalSigns.xAxisLabels = [];
                    let yr = '';
                    let prevYr = '';
                    this.vitalSigns.tableData.map(vs => {
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
                    this.vitalSigns.xAxisLabels = xAxisLabels;
                })
            )
            .subscribe(res => {
                this.vitalSigns.tableData.push(res);
                const systolicVitalSign = {
                    x: new Date(res.date),
                    y: res.systolic
                };
                const diastolicVitalSign = {
                    x: new Date(res.date),
                    y: res.diastolic
                };
                // @ts-ignore
                systolicChartData.data.push(systolicVitalSign);
                // @ts-ignore
                diastolicChartData.data.push(diastolicVitalSign);
            });
        return true;
    }
}