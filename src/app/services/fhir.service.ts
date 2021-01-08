import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FhirService extends DataService {
 
    constructor(http: HttpClient) {
        super(`${environment.mccapiUrl}/observationsbyvalueset`, http);
    }
   
    updateFHIRConnection(server: string, token: string) {
        this.authorizationToken = token;
        console.log('Token = ' + token);
        this.mainfhirserver = server;
        let headersobj = new HttpHeaders();
        headersobj = headersobj.set('Content-Type', 'application/json').set('mcc-fhir-server', server).set('mcc-token', token);
        this.commonHttpOptions = {
          headers: headersobj
        };
      }

}