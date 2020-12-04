import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MccPatient} from '../generated-data-api';
import {DataService } from './data.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class SubjectDataServiceService extends DataService {

    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/patient`, http);

    }

    getAll(): Observable<string[]> {
        // console.log('[data.service.ts]: getAll() testPatients:', environment.testPatients);  // todo : remove after testing
        // return of(environment.testPatients);
        // return of (["cc-pat-pnoelle", "cc-pat-betsy"]);
        // return of(['Betsy', 'Patricia']);
        return of(environment.testPatients);
    }

    getPatientProfile(fhirid: string): Observable<MccPatient> {
        // console.log('[data.service.ts]: getPatientProfile() fhirid:', fhirid);  // todo : remove after testing
        // return of(this.patients[id]);
        // const fhirid = this.patients[id].fhirid;
        return this.getById(fhirid);
    }

}
