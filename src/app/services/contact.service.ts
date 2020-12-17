import { Injectable } from '@angular/core';
import {DataService} from './data.service';
import {Contact, MccCarePlan} from '../generated-data-api';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends DataService {

  constructor(http: HttpClient) {
    super(`${environment.mccapiUrl}/contact`, http);
  }

  getContactsBySubjectAndCareplan(subjectId: string, carePlanId: string): Observable<Contact> {
    console.log(`[contact.service.ts]: getContactsBySubjectAndCareplan() subjectID:${subjectId} carePlanId: ${carePlanId}`);  // todo : remove after testing
    return this.getBySubjectIdAndCarePlanId(subjectId, carePlanId);
  }


}
