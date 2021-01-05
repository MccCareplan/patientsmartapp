import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { GoalLists, GoalSummary, GoalTarget } from '../generated-data-api';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { formatGoalTargetValue } from '../common/chart-utility-functions';
import { TargetValue } from '../main/goals/goals.tab/target-value';

@Injectable({
    providedIn: 'root'
})
export class GoalsSummaryService extends DataService {

    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/summary/goals`, http);
    }

    getGoalsSummaryByPatientId(subjectId: string, carePlanId?: string): Observable<GoalLists> {
        if (carePlanId) {
            return this.getBySubjectIdAndCarePlanId(subjectId, carePlanId);
        }
        else {
            return this.getBySubjectId(subjectId);
        }
    }


}
