import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable()
export class QuestionnaireService {
    constructor(public http: HttpClient) {
    }

    getQuestionnaireResponsesForSubject(subject: string) {
        return this.http.get(environment.questionnaireEndpoint + "?subject=" + subject).toPromise();
    }

    getQuestionnaire(code?: string): Promise<any> {
        return this.http.get(environment.questionnaireEndpoint + "/" + code).toPromise();
    }

    submit(qrObject: any): any {
        return this.http.post(environment.questionnaireEndpoint, qrObject).toPromise();
    }
}
