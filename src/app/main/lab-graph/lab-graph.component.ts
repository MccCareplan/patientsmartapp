import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { formatEgfrResult, formatUacrResult, formatWotResult, getEgrLineChartAnnotationsObject, reformatYYYYMMDD } from 'src/app/common/chart-utility-functions';
import { ActivatedRoute } from '@angular/router';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { BloodPresureService } from 'src/app/services/blood-pressure.service';
import { EgfrService } from 'src/app/services/egfr.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { EgfrTableData } from 'src/app/data-model/egfr';
import { WotTableData } from 'src/app/data-model/weight-over-time';
import { WeightService } from 'src/app/services/weight.service';
import { UacrTableData } from 'src/app/data-model/uacr';
import { UacrService } from 'src/app/services/uacr.service';

@Component({
  selector: 'lab-graph',
  templateUrl: './lab-graph.component.html',
  styleUrls: ['./lab-graph.component.scss']
})
export class LabGraphComponent implements OnInit {
  key: string;
  title: string;
  description: string;

  // table
  wotRowMax = 7;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private weightService: WeightService
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
    }
  }

  bp = (): void => {
    this.title = "My Blood Pressure";
    this.description = "Systolic and Dystolic values over time";
  }

  egfr = (): void => {
    this.title = "My GFR Results";
    this.description = "GFR Tests how well your kidneys work";
  }

  uacr = (): void => {
    this.title = "UACR Results";
    this.description = "Urine Albumin-to-Creatinine Ratio";
  }

  weight = (): void => {
    this.title = "My Weight Results";
    this.description = "Your weight over time"
  }
}