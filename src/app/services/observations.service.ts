import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { GoalTarget, MccObservation } from '../generated-data-api';
import { formatGoalTargetValue } from '../common/chart-utility-functions';
import { TargetValue } from '../main/goals/goals.tab/target-value';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ObservationsService extends DataService {
    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/find/latest/observation`, http);
    }

    getMostRecentObservation(subjectId: string, code: string): Observable<MccObservation> {
        return this.getBySubjectIdAndCode(subjectId, code);
    }

    getTargetValues = (patientId: string, activeTarget: GoalTarget[]): Observable<TargetValue[]> => {
        if (!patientId || !activeTarget || activeTarget.length == 0) {
            return;
        }
        let calls: any = [];
        activeTarget.forEach(v => {
            calls.push(this.getMostRecentObservation(patientId, v.measure.coding[0].code));
        })

        return forkJoin(calls).pipe(
            map(results => {
                let targetValues: TargetValue[] = [];
                results.forEach((obs: MccObservation, index) => {
                    let gt: GoalTarget = activeTarget[index];
                    let mostRecentResultValue = '';
                    let observationDate = '';
                    let rowHighlighted = false;
                    let formattedTargetValue = '';
                    if (obs !== undefined && obs.status !== "notfound") {
                        if (obs.value !== undefined) {
                            mostRecentResultValue = obs.value.quantityValue.value.toString();
                        }
                        if (obs.components !== undefined) {
                            obs.components.map(c => {
                                if (c.code.coding[0].code === gt.measure.coding[0].code) {
                                    if (c.value !== undefined) {
                                        mostRecentResultValue = c.value.quantityValue.value.toString();
                                    }
                                }
                            });
                        }

                        if (obs.effective !== undefined) {
                            if (obs.effective.type.toUpperCase() === 'DATETIME') {
                                observationDate = obs.effective.dateTime.date;
                            }
                        }
                        [formattedTargetValue, rowHighlighted] = formatGoalTargetValue(gt, mostRecentResultValue);
                        const tv: TargetValue = {
                            measure: gt.measure.text,
                            date: observationDate, // todo: Get observation date when API is updated
                            mostRecentResult: mostRecentResultValue.toString(),
                            target: formattedTargetValue,
                            highlighted: rowHighlighted,
                            status: obs.status
                        };
                        targetValues.push(tv);
                    }
                });
                return targetValues;
            })
        );
    }
}