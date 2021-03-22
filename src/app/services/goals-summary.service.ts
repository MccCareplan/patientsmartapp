import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { GoalLists } from '../generated-data-api';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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
            debugger;
            return this.getBySubjectId(subjectId);
        }
    }


}
