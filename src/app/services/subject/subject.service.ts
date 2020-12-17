import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { AppError } from "src/app/common/app.error";
import { BadInput } from "src/app/common/bad-input.error";
import { NotFound } from "src/app/common/not-found.error";
import { ConditionLists, MccPatient } from "src/app/generated-data-api";
import { environment } from "src/environments/environment";

export interface ISubjectService {
    getPatientById(fhirid: string): Observable<MccPatient>;
    getPatientConditionsById(id: string): Observable<ConditionLists>;
}

@Injectable()
export class SubjectService {
    private baseServer = environment.mccapiUrl;
    private patientURL = '/patient';
    private conditionSummaryURL = '/conditionsummary';
    private concernURL = '/socialconcerns';
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {

    }

    getPatientById(fhirid: string): Observable<MccPatient> {
        return this.http.get(this.baseServer + this.patientURL + "/" + fhirid, this.httpOptions)
            .pipe(catchError(this.handleError));
    }

    getPatientConditionsById(id: string): Observable<ConditionLists> {
        const url = this.baseServer + this.conditionSummaryURL;
        const options = { ...this.httpOptions, params: new HttpParams({ fromString: "subject=" + id }) };

        return this.http.get(url, options).pipe(
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