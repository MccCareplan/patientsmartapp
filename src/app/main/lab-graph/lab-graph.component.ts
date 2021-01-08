import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { formatEgfrResult, getEgrLineChartAnnotationsObject } from 'src/app/common/chart-utility-functions';
import { ActivatedRoute } from '@angular/router';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { BloodPresureService } from 'src/app/services/blood-pressure.service';
import { EgfrService } from 'src/app/services/egfr.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EgfrTableData } from 'src/app/data-model/egfr';

@Component({
  selector: 'lab-graph',
  templateUrl: './lab-graph.component.html',
  styleUrls: ['./lab-graph.component.scss']
})
export class LabGraphComponent implements OnInit {
  key: string;
  title: string;
  description: string;

  // chart
  lineChartAnnotations: any;
  lineChartColors: Color[];
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartLegend: boolean;
  lineChartOptions: any;
  lineChartPlugins: any[];
  lineChartType: string;

  // table
  vitalSignsRowMax = 7;
  egfrRowMax = 7;
  displayedColumns = [];
  tableDataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private bpService: BloodPresureService,
    private egfrService: EgfrService
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
    this.tableDataSource = this.bpService.vitalSignsDataSource;
    this.displayedColumns = ['date', 'systolic', 'diastolic'];
    this.title = "My Blood Pressure";
    this.description = "Systolic and Dystolic values over time";
    this.lineChartLabels = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
    this.lineChartData = this.bpService.vitalSigns.chartData;
    this.lineChartOptions = this.bpService.vitalSigns.lineChartOptions;
    this.lineChartColors = [
      {
        borderColor: 'black',
      },
    ];

    this.lineChartLegend = true;
    this.lineChartPlugins = [
      {
        annotation: {
          annotations: {
            drawTime: 'beforeDatasetsDraw',
            type: 'box',
            xScaleID: 'x-axis-0',
            yScaleID: 'y-axis-0',
            borderWidth: 0,
            yMin: 70,
            yMax: 130,
            backgroundColor: 'rgba(46, 204, 113,0.3)'
          }
        }
      }];
    this.lineChartType = 'line';
  }

  egfr = (): void => {
    this.tableDataSource = this.egfrService.egfrDataSource;
    this.lineChartData = this.egfrService.egfr.chartData;
    this.lineChartOptions = this.egfrService.egfr.lineChartOptions;
    this.displayedColumns = ['date', 'result'];
    this.title = "My GFR Results";
    this.description = "GFR Tests how well your kidneys work";
    this.lineChartColors = [
      {
        borderColor: 'black',
      },
    ];
    this.lineChartLegend = false;
    this.lineChartPlugins = [pluginAnnotations];
    this.lineChartType = 'line';
  }

  EgfrResult(egfr: EgfrTableData): string {
    return formatEgfrResult(egfr.egfr, egfr.unit);
  }

  getEgfrRowCssClass(egfr: EgfrTableData): string {
    let cssClass = '';
    const val = egfr.egfr;
    if (val) {
      switch (true) {
        case (val >= 60):
          cssClass = 'resultBorderline';
          break;
        case (val < 60 && val >= 15):
          cssClass = 'resultGood';
          break;
        case (val < 15):
          cssClass = 'resultCritical';
          break;
        default:
          break;
      }
    }
    return cssClass;
  }

  uacr = (): void => {
    this.title = "UACR Results";
    this.testData();
  }

  weight = (): void => {
    this.title = "My Weight Results";
    this.description = "Your weight over time"
    this.testData();
  }

  testData = (): void => {
    this.lineChartAnnotations = getEgrLineChartAnnotationsObject();
    this.lineChartData = [
      {
        data: [41.0, 40.0, 34.8, 26.0],
        fill: false,
        pointRadius: 6,
        pointHoverRadius: 10,
        pointBackgroundColor: "yellow",
        pointBorderColor: "black",
        barThickness: 50
      }
    ];
    this.lineChartLabels = ["1/13/20", "4/16/20", "7/20/20", "9/26/20"];
    this.lineChartOptions = {
      elements: {
        line: {
          tension: 0
        }
      },
      responsive: true,
      annotation: this.lineChartAnnotations,
      scales: {
        xAxes: [{
          display: false,
          gridLines: {
            display: false,
          }
        }],
        yAxes: [{
          display: true,
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.5)",
            drawBorder: false
          },
          ticks: {
            min: 0,
            max: 75,
            stepSize: 15,
            suggestedMin: 0.5,
            suggestedMax: 5.5,
            callback: function (label, index, labels) {
              switch (label) {
                case 0:
                  return "0";
                case 15:
                  return '15';
                case 30:
                  return '30';
                case 45:
                  return '45';
                case 60:
                  return '60';
                case 75:
                  return "75";
              }
            }
          }
        }],
      }
    };
    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: "none",
      },
    ];
    this.lineChartLegend = false;
    this.lineChartType = "line";
    this.lineChartPlugins = [pluginAnnotations];
  }
}
