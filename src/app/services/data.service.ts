import { Injectable } from '@angular/core';
import { BadInput } from './../common/bad-input.error';
import { NotFound } from './../common/not-found.error';
import { AppError } from '../common/app.error';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MccObservation } from '../generated-data-api';
import { VitalSignsTableData } from '../data-model/vitalSigns';
import { ObservationCollection } from '../generated-data-api/models/ObservationCollection';

enum observationCodes {
  Systolic = '8480-6',
  Diastolic = '8462-4',
  Egfr = '69405-9',
  Uacr = '9318-7',
  Wot = '29463-7',
  Blood_pressure = '85354-9'
}

enum observationValuesets {
  // Egfr = '2.16.840.1.113883.3.6929.3.1000',
  Egfr = '2.16.840.1.113762.1.4.1222.179',
  Uacr = '2.16.840.1.113883.3.6929.2.1002'
}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  authorizationToken: string;
  mainfhirserver: string;
  commonHttpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  currentPatientId: string;
  currentCareplanId: string;

  constructor(private url: string, private http: HttpClient) {
  }

  get(): Observable<any> {
    return this.http.get(this.url)
      .pipe(
        catchError(this.handleError));
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.url}\\${id}`)
      .pipe(catchError(this.handleError));
  }

  getBySubjectId(subjectId: string): Observable<any> {
    return this.http.get(`${this.url}\\?subject=${subjectId}`)
      .pipe(catchError(this.handleError));
  }

  getBySubjectIdAndCarePlanId(subjectId: string, carePlanId: string): Observable<any> {
    return this.http.get(`${this.url}\\?subject=${subjectId}&careplan=${carePlanId}`)
      .pipe(catchError(this.handleError));
  }

  getBySubjectIdAndCode(subjectId: string, code: string): Observable<any> {
    return this.http.get(`${this.url}\\?subject=${subjectId}&code=${code}`)
      .pipe(catchError(this.handleError));
  }

  getBloodPressureById(id: string): Observable<any> {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), params: new HttpParams({ fromString: "subject=" + id }).set("code", "8480-6") };
    return this.http.get(this.url, options).pipe(
      catchError(this.handleError));
  }

  getPatientVitalSigns(patientId: string): Observable<VitalSignsTableData> {
    return new Observable(observer => {
      this.getObservationsByPanel(patientId, observationCodes.Blood_pressure)
        .pipe(finalize(() => {
          observer.complete();
        }))
        .subscribe(observations => {
          observations.map(obs => {
            let systolic = 0;
            let diastolic = 0;
            obs.components.map(c => {
              switch (c.code.coding[0].code) {
                case observationCodes.Diastolic:
                  diastolic = c.value.quantityValue.value;
                  break;
                case observationCodes.Systolic:
                  systolic = c.value.quantityValue.value;
                  break;
                default:
              }
            });
            const vs: VitalSignsTableData = {
              date: obs.effective.dateTime.date,
              diastolic,
              systolic
            };
            observer.next(vs);
          });
        });
    });
  }

  getObservationsByPanel(patientId: string, code: string): Observable<MccObservation[]> {
    return this.http.get<MccObservation[]>(`${this.url}\\?subject=${patientId}&code=${code}&mode=panel`)
      .pipe(catchError(this.handleError));
  }

  getObservationsByValueset(patientId: string, valueSet: string): Observable<MccObservation[]> {
    return this.http.get<MccObservation[]>(`${this.url}\\?subject=${patientId}&valueset=${valueSet}`)
      .pipe(catchError(this.handleError));
  }

  getSegementedObservationsByValueSet(patientId: string, valueSet: string): Observable<ObservationCollection> {
    return this.http.get<ObservationCollection>(`${this.url}\\?subject=${patientId}&valueset=${valueSet}`)
      .pipe(catchError(this.handleError));
  }

  create(resource): Observable<any> {
    return this.http.post(this.url, JSON.stringify(resource))
      .pipe(
        catchError(this.handleError));
  }

  update(resource): Observable<any> {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }))
      .pipe(
        catchError(this.handleError));
  }

  delete(id): Observable<any> {
    return this.http.delete(this.url + '/' + id)
      .pipe(
        catchError(this.handleError));
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return throwError(new BadInput(error.json()));
    }

    if (error.status === 404) {
      return throwError(new NotFound());
    }

    return throwError(new AppError(error));
  }
}
