import { Injectable } from '@angular/core';
import {DataService} from './data.service';
import {MccCarePlan, MccPatient} from '../generated-data-api';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CareplanService extends DataService {

  constructor(http: HttpClient) {
    super(`${environment.mccapiUrl}/careplan`, http);
  }

  getCarePlansBySubject(subjectId: string): Observable<MccCarePlan> {
    // console.log('[careplan.service.ts]: getCarePlansBySubject() subjectID:', subjectId);  // todo : remove after testing
    debugger;
    return this.getBySubjectId(subjectId);
  }

}
