import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-careteam',
  templateUrl: './careteam.component.html',
  styleUrls: ['./careteam.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CareteamComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const mt =
        (document.getElementsByClassName('mat-tab-labels'))[0] as HTMLElement;
    mt.style.display = 'grid';
    mt.style.gridTemplateColumns = 'repeat(auto-fit, minmax(5em, 1fr))';
  }

}
