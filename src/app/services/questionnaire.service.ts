import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class QuestionnaireService {

    constructor(public http: HttpClient) {
    }

    getQuestionnaireResponsesForSubject(subject: string) {
        return this.http.get("https://api.logicahealth.org/MCCeCarePlanTest/open/QuestionnaireResponse?subject=" + subject).toPromise();
    }

    getQuestionnaire(code?: string): Promise<any> {
        return this.http.get("https://api.logicahealth.org/MCCeCarePlanTest/open/QuestionnaireResponse/" + code).toPromise();
    }

    submit(qrObject: any): any {
        this.http.post("https://api.logicahealth.org/MCCeCarePlanTest/open/QuestionnaireResponse", qrObject).toPromise().then(x => {
            debugger;
        }).catch(x => {
            debugger;
        })

    }
}
