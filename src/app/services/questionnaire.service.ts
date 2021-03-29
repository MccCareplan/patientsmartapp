import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
@Injectable()
export class QuestionnaireService {

    constructor(public http: HttpClient) {
    }

    getQuestionnaire(code: string): Promise<any> {
        return this.http.get(environment.questionnaireEndpoint).toPromise();
    }

    submit(arg0: any): any {
        debugger;
    }
}
