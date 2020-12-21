import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { getEgrLineChartAnnotationsObject } from 'src/app/common/chart-utility-functions';
import { ActivatedRoute } from '@angular/router';
import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'lab-graph',
  templateUrl: './lab-graph.component.html',
  styleUrls: ['./lab-graph.component.scss']
})
export class LabGraphComponent implements OnInit {
  description: string;
  lineChartAnnotations: any;
  lineChartColors: Color[];
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartLegend: boolean;
  lineChartOptions: (ChartOptions & { annotation: any })
  lineChartPlugins: any[];
  lineChartType: string;
  title: string;


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.key) {
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
    //http://localhost:8081/observationsbyvalueset?subject=cc-pat-pnoelle&valueset=2.16.840.1.113762.1.4.1222.179  EGFR
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

  uacr = (): void => {
    //http://localhost:8081/observationsbyvalueset?subject=cc-pat-pnoelle&valueset=2.16.840.1.113883.3.6929.2.1002 UACR
    this.title = "UACR Results";
  }

  weight = (): void => {
    this.title = "My Weight Results";
    this.description = "Your weight over time"
  }
}
