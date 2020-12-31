import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ReferralSummary } from '../generated-data-api/models/ReferralSummary';

@Injectable({
    providedIn: 'root'
})
export class ReferralsSummaryService extends DataService {

    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/summary/referrals`, http);
    }

    getReferralsSummaryByPatientId(subjectId: string): Observable<ReferralSummary[]> {
        return this.getBySubjectId(subjectId);
    }
}
