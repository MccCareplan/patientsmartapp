import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CounselingSummary } from 'src/generated-data-api/models/CounselingSummary';

@Injectable({
    providedIn: 'root'
})
export class CounselingSummaryService extends DataService {

    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/summary/counselings`, http);
    }

    getCounselingSummaryByPatientId(subjectId: string, carePlanId?: string): Observable<CounselingSummary[]> {
        if (carePlanId) {
            return this.getBySubjectIdAndCarePlanId(subjectId, carePlanId);
        }
        else {
            return this.getBySubjectId(subjectId);
        }
    }
}