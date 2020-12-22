import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ConditionLists, MccObservation } from '../generated-data-api';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BloodPresureService extends DataService {

    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/observations`, http);
    }

    getBloodPressureByPatientId(subjectId: string): Observable<MccObservation[]> {
        return this.getBloodPressureById(subjectId);
    }
}
