import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as devmode from './ngrx/actions/dev-mode.actions';
import * as fromRoot from './ngrx/reducers';
import * as patient from './ngrx/actions/patient.actions';
import {CustomIconService} from './services/custom-icon.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Patient Smart App';

    constructor(private customIconService: CustomIconService,
                private route: ActivatedRoute,
                private store: Store<fromRoot.State>) {
    }

    devmode = false;
    currentSubjectId = '';


    ngOnInit(): void {

        this.route.queryParams.subscribe(params => {
            // console.log('[app.component.ts] params:', params);  // todo: remove after testing..
            const dev = params.devmode;
            this.devmode = (dev === 'true');
            // console.log('[app.component.ts] Development Mode: ' + this.devmode); // todo: remove after testing..
            this.store.dispatch(devmode.EditAction({data: this.devmode}));
            if (params.subject != null) {
                this.currentSubjectId = params.subject;
                this.store.dispatch(patient.SelectAction({data: this.currentSubjectId}));
            }
        });

        this.customIconService.registerIcons();

    }

}
