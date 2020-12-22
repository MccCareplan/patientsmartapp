import { Component, OnInit, Input } from '@angular/core';
import { SharedModule } from '../../../common/shared.module';
import { CharPipe } from '../../../common/char.pipe';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../ngrx/reducers';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-goals-tab',
    templateUrl: './goals.tab.component.html',
    styleUrls: ['./goals.tab.component.scss']
})

export class GoalsTabComponent implements OnInit {
    @Input()
    displayFilter: string;

    constructor(private char: CharPipe, private store: Store<fromRoot.State>) {

    }

    ngOnInit(): void {

    }
}
