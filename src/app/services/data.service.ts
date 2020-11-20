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
            dateOfBirth: '2020-01-01',
            ethnicity: 'white',
            gender: 'female',
            id: 'Betsy',
            race: 'white',
            fhirid: 'cc-pat-betsy'
        };
        this.patients.Patricia = {
            name: 'Patricia Noelle',
            dateOfBirth: '2020-01-01',
            ethnicity: 'white',
            gender: 'female',
            id: 'Patricia',
            race: 'white',
            fhirid: 'cc-pat-pnoelle'
        };
    }

    getAll(): Observable<string[]> {
        // console.log('in DataService: getAll()');  // todo : remove after testing
        return of(['Betsy', 'Patricia']);
    }

    getPatientProfile(id: string): Observable<MccPatient> {
        // console.log('in DataService: getPatientProfile() id:', id);  // todo : remove after testing
        return of(this.patients[id]);
    }

}
