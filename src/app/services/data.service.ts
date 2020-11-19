import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MccPatient} from '../generated-data-api';


@Injectable({
    providedIn: 'root'
})
export class DataService {
    patients: { [key: string]: MccPatient } = {};

    constructor() {
        this.patients.Betsy = {
            name: 'Betsy Johnson',
            fhirid: 'cc-pat-betsy'
        };
        this.patients.Patricia = {
            name: 'Patricia Noelle',
            fhirid: 'cc-pat-pnoelle'
        };
    }

    getAll(): Observable<string[]> {
        return of(['Betsy', 'Patricia']);
    }

    getPatientProfile(id: string): Observable<MccPatient> {
        return of(this.patients[id]);
    }

}
