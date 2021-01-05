import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { GoalLists, GoalSummary, GoalTarget } from '../generated-data-api';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GoalsSummaryService extends DataService {
    goalsSummary: Observable<GoalLists>;


    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/summary/goals`, http);
    }

    getGoalsSummaryByPatientId(subjectId: string, carePlanId?: string, forceFresh?: true): Observable<GoalLists> {
        if (this.goalsSummary && !forceFresh) {
            return this.goalsSummary;
        }
        else {
            if (carePlanId) {
                this.goalsSummary = this.getBySubjectIdAndCarePlanId(subjectId, carePlanId);
            }
            else {
                this.goalsSummary = this.getBySubjectId(subjectId);
            }
            return this.goalsSummary;
        }
    }
}
