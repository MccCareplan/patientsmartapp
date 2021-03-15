import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { MccObservation, SimpleQuestionnaireItem } from "../generated-data-api";

@Injectable()
export class ObservationsService {
    public HTTP_OPTIONS = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    public OBSERVATIONS: Map<string, any> = new Map<string, any>();
    public QUESTIONNAIRES: Map<string, any> = new Map<string, any>();

    _defaultUrl = environment.mccapiUrl;
    constructor(
        protected http: HttpClient
    ) {
    }

    _observationUrl = "find/latest/observation";
    getObservation(patientId: string, code: string, keyToStore?: string, translate?: boolean): Promise<any> {
        const key = patientId + "-" + code;

        if (this.OBSERVATIONS.has(key)) {
            let returnVal = this.OBSERVATIONS.get(key);
            if (keyToStore) {
                returnVal.key = keyToStore;
            }
            return Promise.resolve(returnVal);
        }
        else {
            return this.http.get(`${environment.mccapiUrl}/${this._observationUrl}?subject=${patientId}&code=${code}&translate=${translate ? "true" : "false"}`, this.HTTP_OPTIONS).toPromise()
                .then((res: MccObservation) => {
                    this.OBSERVATIONS.set(key, res);
                    return res;
                }).catch((reason) => {
                    console.log("Error querying: " + code);
                });
        }
    };

    _observationsUrl = "observations";
    getObservations(patientId: string, code: string, keyToStore?: string): Promise<any> {
        const key = patientId + "-" + code + "-multiple";

        if (this.OBSERVATIONS.has(key)) {
            let returnVal = this.OBSERVATIONS.get(key);
            return Promise.resolve(this.OBSERVATIONS.get(key));
        }
        else {
            return this.http.get(`${environment.mccapiUrl}/${this._observationsUrl}?subject=${patientId}&code=${code}&sort=descending`, this.HTTP_OPTIONS).toPromise()
                .then((res: MccObservation[]) => {
                    this.OBSERVATIONS.set(key, res);
                    return res;
                }).catch((reason) => {
                    console.log("Error querying: " + code);
                });
        }
    };
    _observationByValueSetUrl = "observationsbyvalueset"
    getObservationsByValueSet = (patientId: string, valueSet: string, sort?: string, max?: string, keyToStore?: string): Promise<any> => {
        const key = patientId + "-" + valueSet + (sort ? "-" + sort : "") + (max ? "-" + max : "") + (keyToStore ? "-" + keyToStore : "");
        const url = `${environment.mccapiUrl}/${this._observationByValueSetUrl}?subject=${patientId}&valueset=${valueSet}` + (sort ? `&sort=${sort}` : ``) + (max ? `&max=${max}` : ``);

        if (this.OBSERVATIONS.has(key)) {
            let returnVal = this.OBSERVATIONS.get(key);
            return Promise.resolve(returnVal);
        }
        else {
            return this.http.get(url, this.HTTP_OPTIONS).toPromise()
                .then((res: MccObservation[]) => {
                    this.OBSERVATIONS.set(key, res);
                    return res;
                }).catch((reason) => {
                    console.log("Error querying: " + url);
                });
        }
    }

    _observationsByPanelUrl = "observations"
    getObservationsByPanel(patientId: string, code: string, sort?: string, max?: string, keyToStore?: string): Promise<any> {
        const key = patientId + "-" + code + (sort ? "-" + sort : "") + (max ? "-" + max : "") + (keyToStore ? "-" + keyToStore : "");

        if (this.OBSERVATIONS.has(key)) {
            let returnVal = this.OBSERVATIONS.get(key);
            return Promise.resolve(returnVal);
        }
        else {
            return this.http.get(`${environment.mccapiUrl}/${this._observationsByPanelUrl}?subject=${patientId}&code=${code}` + (sort ? `&sort=${sort}` : ``) + (max ? `&max=${max}` : ``) + `&mode=panel`, this.HTTP_OPTIONS).toPromise()
                .then((res: MccObservation[]) => {
                    this.OBSERVATIONS.set(key, res);
                    return res;
                }).catch((reason) => {
                    console.log("Error querying: " + code);
                });
        }
    }

    _questionnaireLatestItemUrl = "find/latest/questionnaireresponseitem";
    getQuestionnaireItem(patientId: string, code: string): Promise<any> {
        const key = patientId + "-" + code;

        if (this.QUESTIONNAIRES.has(key)) {
            return Promise.resolve(this.QUESTIONNAIRES.get(key));
        } else {
            return this.http.get(`${environment.mccapiUrl}/${this._questionnaireLatestItemUrl}?subject=${patientId}&code=${code}`, this.HTTP_OPTIONS).toPromise()
                .then((res: SimpleQuestionnaireItem) => {
                    this.QUESTIONNAIRES.set(key, res);
                    return res;
                }).catch((reason) => {
                    console.log("Error querying: " + code);
                });
        }
    }

    _questionnaireAllItemsUrl = "find/all/questionnaireresponseitems";
    getQuestionnaireItems(patientId: string, code: string): Promise<any> {
        const key = patientId + "-" + code + "-all";

        if (this.QUESTIONNAIRES.has(key)) {
            return Promise.resolve(this.QUESTIONNAIRES.get(key));
        } else {
            return this.http.get(`${environment.mccapiUrl}/${this._questionnaireAllItemsUrl}?subject=${patientId}&code=${code}`, this.HTTP_OPTIONS).toPromise()
                .then((res: SimpleQuestionnaireItem[]) => {
                    this.QUESTIONNAIRES.set(key, res);
                    return res;
                }).catch((reason) => {
                    console.log("Error querying: " + code);
                });
        }
    }
}