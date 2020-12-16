import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { getEgrLineChartAnnotationsObject } from 'src/app/common/chart-utility-functions';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Router } from '@angular/router';

@Component({
  selector: 'lab-graph',
  templateUrl: './lab-graph.component.html',
  styleUrls: ['./lab-graph.component.css']
})
export class LabGraphComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBack = (): void => {
    this.router.navigateByUrl('/lab-results');
  }

  public lineChartAnnotations = getEgrLineChartAnnotationsObject();
  public lineChartData: ChartDataSets[] = [
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
  public lineChartLabels: Label[] = ["1/13/20", "4/16/20", "7/20/20", "9/26/20"];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
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
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: "none",
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
}
