import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  view: string = "status";

  constructor() { }

  ngOnInit(): void {
  }

  generateChart = (): void => {

  }


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
    annotation: undefined,
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
          color: "red",
          drawBorder: false
        },
        ticks: {
          fontColor: "green",
          
          min: 15,
          max: 60,
          stepSize: 15,
          suggestedMin: 0.5,
          suggestedMax: 5.5,
          callback: function (label, index, labels) {
            switch (label) {
              case 15:
                return '15';
              case 30:
                return '30';
              case 45:
                return '45';
              case 60:
                return '60';
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
  public lineChartPlugins = [];
}
