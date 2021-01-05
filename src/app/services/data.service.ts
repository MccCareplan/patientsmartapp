import { Injectable } from '@angular/core';
import { BadInput } from './../common/bad-input.error';
import { NotFound } from './../common/not-found.error';
import { AppError } from '../common/app.error';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConditionLists, MccObservation } from '../generated-data-api';

@Injectable({
  providedIn: 'root'
})
export class DataService {

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
