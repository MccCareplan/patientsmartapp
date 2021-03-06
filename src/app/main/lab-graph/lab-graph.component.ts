import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Constants } from 'src/app/common/constants';
import { ObservationsService } from 'src/app/services/observations.service.new';
import * as fromRoot from '../../ngrx/reducers';

@Component({
  selector: 'lab-graph',
  templateUrl: './lab-graph.component.html',
  styleUrls: ['./lab-graph.component.scss']
})
export class LabGraphComponent implements OnInit {
  key: string;
  title: string;
  description: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private obsService: ObservationsService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.key) {
        this.key = params.key;
        this.populateData(params.key);
      }
    });
  }

  goBack = (): void => {
    window.history.back();
  }

  populateData = (key): void => {
    switch (key) {
      case "egfr":
        this.egfr();
        return;
      case "bp":
        this.bp();
        return;
      case "weight":
        this.weight();
        return;
      case "uacr":
        this.uacr();
        return;
      default:
        this.generic(key);
        break;
    }
  }

  generic = (key: string): void => {
    this.title = key;
  }

  bp = (): void => {
    this.title = "My Blood Pressure";
    this.description = "Systolic and Diastolic values over time";
  }

  egfr = (): void => {
    this.title = "My EGFR Results";
    this.description = "EGFR Tests how well your kidneys work";
  }

  uacr = (): void => {
    this.title = "UACR Results";
    this.description = "Urine Albumin-to-Creatinine Ratio";
  }

  weight = (): void => {
    this.title = "My Weight Results (" + Constants.featureToggling.preferredUnits.wot + "s)";
    this.description = "Your weight over time"
  }
}