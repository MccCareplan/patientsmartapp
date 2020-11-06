import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-footer-mobile',
  templateUrl: './footer-mobile.component.html',
  styleUrls: ['./footer-mobile.component.css']
})
export class FooterMobileComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
