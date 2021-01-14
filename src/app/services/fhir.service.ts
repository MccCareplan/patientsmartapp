import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ObservationsService } from './observations.service.new';

@Injectable({
  providedIn: 'root'
})
export class FhirService extends DataService {

  constructor(
    http: HttpClient,
    private obsService: ObservationsService
  ) {
    super(`${environment.mccapiUrl}/observationsbyvalueset`, http);
  }

  updateFHIRConnection(server: string, token: string) {
    this.authorizationToken = token;
    console.log('Token = ' + token);
    this.mainfhirserver = server;
    let headersobj = new HttpHeaders();
    headersobj = headersobj.set('Content-Type', 'application/json').set('mcc-fhir-server', server).set('mcc-token', token);
    this.commonHttpOptions = { headers: headersobj };
    this.obsService.HTTP_OPTIONS = { headers: headersobj };
  }

}