import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss']
})
export class HealthComponent implements OnInit {
  featureToggling: any = Constants.featureToggling;
  constructor() { }

  ngOnInit(): void {
  }
}
