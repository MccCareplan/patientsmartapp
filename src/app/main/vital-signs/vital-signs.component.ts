import { Component, OnInit } from "@angular/core";

@Component({
    selector: "vital-signs",
    templateUrl: "./vital-signs.component.html",
    styleUrls: ["./vital-signs.component.scss"]
})
export class VitalSignsComponent implements OnInit {
    //http://localhost:8081/observations?subject=cc-pat-pnoelle&code=29463-7  Weight
    //http://localhost:8081/observations?subject=cc-pat-pnoelle&code=8480-6   BP
    
    constructor() {

    }

    ngOnInit(): void {

    }
}