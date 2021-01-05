import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoalTarget, MccObservation } from '../generated-data-api';
import { formatGoalTargetValue } from '../common/chart-utility-functions';
import { TargetValue } from '../main/goals/goals.tab/target-value';

@Injectable({
    providedIn: 'root'
})
export class ObservationsService extends DataService {
    private observationURL = '/find/latest/observation';
    private observationsURL = '/observations';
    private observationsbyvaluesetURL = '/observationsbyvalueset';

    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/find/latest/observation`, http);
    }

    getMostRecentObservation(subjectId: string, code: string): Observable<MccObservation> {
        return this.getBySubjectIdAndCode(subjectId, code);
    }

    formatTargets = (patientId: string, activeTarget: GoalTarget[]): any => {
        if (!patientId || !activeTarget || activeTarget.length == 0){
            return new Observable();
        }
        return new Observable(observer => {
            activeTarget.map(gt => {
                this.getMostRecentObservation(patientId, gt.measure.coding[0].code)
                    .subscribe(obs => {
                        let mostRecentResultValue = '';
                        let observationDate = '';
                        let rowHighlighted = false;
                        let formattedTargetValue = '';
                        if (obs !== undefined) {
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
                                if (obs.effective.type === 'DateTime') {
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
                            observer.next(tv);
                        }
                    });
            });
        });
    }
}
