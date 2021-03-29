import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MccCarePlanSummary } from 'src/generated-data-api/models/MccCarePlanSummary';

@Injectable({
    providedIn: 'root'
})
export class CareplansSummaryService extends DataService {

    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/find/best/careplan`, http);
    }

    getCarePlansByPatientId(subjectId: string): Observable<MccCarePlanSummary[]> {
        return this.getBySubjectId(subjectId);
    }
}
