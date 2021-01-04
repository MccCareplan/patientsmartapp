import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EducationSummary } from 'src/generated-data-api/models/EducationSummary';

@Injectable({
    providedIn: 'root'
})
export class EducationSummaryService extends DataService {

    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/summary/educations`, http);
    }

    getEducationSummaryByPatientId(subjectId: string, carePlanId?: string): Observable<EducationSummary[]> {
        if (carePlanId) {
            return this.getBySubjectIdAndCarePlanId(subjectId, carePlanId);
        }
        else {
            return this.getBySubjectId(subjectId);
        }
    }
}
