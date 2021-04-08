import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.scss']
})
export class InterventionComponent implements OnInit {
  featureToggling: any = Constants.featureToggling;

  constructor() { }

  ngOnInit(): void {
  }

}
