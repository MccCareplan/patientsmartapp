import { Injectable } from '@angular/core';
import featureToggling from "../../assets/json/feature-toggling.json";
import featureTogglingOverride from "../../assets/json/overrides/feature-toggling.json";

@Injectable()
export class FeatureTogglingService {

    constructor() {
    }

    test() {
        featureToggling;
        featureTogglingOverride;
        debugger;
    }
}
