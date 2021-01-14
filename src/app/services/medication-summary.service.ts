import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { MedicationLists } from '../generated-data-api';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MedicationSummaryService extends DataService {

    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/summary/medications`, http);
    }

    getMedicationSummaryByPatientId(subjectId: string, carePlanId?: string): Observable<MedicationLists> {
        if (carePlanId) {
            return this.getBySubjectIdAndCarePlanId(subjectId, carePlanId);
        }
        else {
            return this.getBySubjectId(subjectId);
        }
    }
}
