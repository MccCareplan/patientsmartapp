import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

enum ConditionMapTypes {
    "panel",
    "valueset",
    "code"
}

interface ConditionMap {
    key: string;
    data: string[];
    type: ConditionMapTypes
}

@Injectable()
export class ConditionMappingService {
    private kv = new Map<string, ConditionMap[]>([]);
    constructor(
        protected http: HttpClient
    ) {

    }

    updateKv = (key, value, type): void => {
        let newKey = key + value + type;
        if (this.kv.has(key)) {
            let conMaps: ConditionMap[] = this.kv.get(key);
            let conMapByKey: ConditionMap = conMaps.find(x => x.key == key)
            conMapByKey.data = value;
        }
        else {
            this.kv.set()
        }
    }

    _observationUrl = "find/latest/observation";
    getObservation(patientId: string, code: string): Promise<any> {
        const key = patientId + "-" + code;

        if (this.OBSERVATIONS.has(key)) {
            return Promise.resolve(this.OBSERVATIONS.get(key));
        }
        else {
            return this.http.get(`${environment.mccapiUrl}/${this._observationUrl}?subject=${patientId}&code=${code}`).toPromise()
                .then(res => {
                    this.OBSERVATIONS.set(key, res);
                    return res;
                });
        }
    };

    _observationByValueSetUrl = "observationsbyvalueset"
    getObservationsByValueSet = (patientId: string, valueSet: string): Promise<any> => {
        const key = patientId + "-" + valueSet;

        if (this.OBSERVATIONS.has(key)) {
            return Promise.resolve(this.OBSERVATIONS.get(key));
        }
        else {
            return this.http.get(`${environment.mccapiUrl}/${this._observationByValueSetUrl}?subject=${patientId}&valueset=${valueSet}`, this.HTTP_OPTIONS).toPromise()
                .then(res => {
                    this.OBSERVATIONS.set(key, res);
                    return res;
                });
        }
    }

    _observationsByPanelUrl = "observations"
    getObservationsByPanel(patientId: string, code: string): Promise<any> {
        const key = patientId + "-" + code + "-panel";

        return this.http.get(`${environment.mccapiUrl}/${this._observationsByPanelUrl}?subject=${patientId}&code=${code}&mode=panel`, this.HTTP_OPTIONS).toPromise()
            .then(res => {
                this.OBSERVATIONS.set(key, res);
                return res;
            });
    }
}