import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { GoalLists, GoalSummary } from '../generated-data-api';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GoalsSummaryService extends DataService {

    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/goalsummary`, http);
    }

    getGoalsSummaryByPatientId(subjectId: string): Observable<GoalLists> {
        return this.getGoalsSummaryById(subjectId);
    }
}
