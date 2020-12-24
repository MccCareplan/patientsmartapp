import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { SocialConcern } from '../generated-data-api';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SocialConcernsService extends DataService {

    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/socialconcerns`, http);
    }

    getSocialConcernsByPatientId(subjectId: string): Observable<SocialConcern[]> {
        return this.getSocialConcernsById(subjectId);
    }
}
