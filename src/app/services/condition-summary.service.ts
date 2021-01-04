import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ConditionLists } from '../generated-data-api';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConditionSummaryService extends DataService {

    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/summary/conditions`, http);
    }

    getConditionsSummaryPatientId(subjectId: string, carePlanId?: string): Observable<ConditionLists> {
        if (carePlanId) {
            return this.getBySubjectIdAndCarePlanId(subjectId, carePlanId);
        }
        else {
            return this.getBySubjectId(subjectId);
        }
    }
}
