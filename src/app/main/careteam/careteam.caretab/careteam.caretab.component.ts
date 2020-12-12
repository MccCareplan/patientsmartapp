import { Component, OnInit } from '@angular/core';
import { SharedModule} from '../../../common/shared.module';
import {CharPipe} from '../../../common/char.pipe';

@Component({
  selector: 'app-careteam-caretab',
  templateUrl: './careteam.caretab.component.html',
  styleUrls: ['./careteam.caretab.component.css']
})

export class CareteamCaretabComponent implements OnInit {

  charCodes = Array.from(Array(26), (_, index) => 65 + index);
  selectedCharacter = '';
  selectedCharCode = 0;

  constructor(private char: CharPipe) {



  }



  ngOnInit(): void {
  }

  onSelect(charCode): void {
    console.log('[careteam.caretab.component.ts] onSelect(charCode) charCode: ', charCode);
    this.selectedCharacter = this.char.transform(charCode);
    this.selectedCharCode = charCode;
  }

}
