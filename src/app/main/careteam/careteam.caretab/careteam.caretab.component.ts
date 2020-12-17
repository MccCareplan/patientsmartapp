import {Component, OnInit, Input} from '@angular/core';
import {SharedModule} from '../../../common/shared.module';
import {CharPipe} from '../../../common/char.pipe';
import {Store} from '@ngrx/store';
import * as contact from '../../../ngrx/actions';
import * as fromRoot from '../../../ngrx/reducers';
import {Contact} from '../../../generated-data-api';
import {Observable, of, combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
    selector: 'app-careteam-caretab',
    templateUrl: './careteam.caretab.component.html',
    styleUrls: ['./careteam.caretab.component.css']
})

export class CareteamCaretabComponent implements OnInit {
    @Input()
    displayFilter: string;

    contacts$: Observable<Contact[]>;
    filteredContacts$: Observable<Contact[]>;
    filter$: Observable<string>;


    charCodes = Array.from(Array(26), (_, index) => 65 + index);
    selectedCharacter = '';
    selectedCharCode = 0;

    constructor(private char: CharPipe, private store: Store<fromRoot.State>) {

    }

    // https://stackblitz.com/edit/angular-filtering-rxjs

    ngOnInit(): void {
        this.contacts$ = this.store.select(fromRoot.getContacts);
        this.filter$ = of('patient');
        console.log('[careteam.caretab.component.ts] ngOnInit() displayFilter: ', this.displayFilter);
        if (this.displayFilter === 'careteam') {
            this.filteredContacts$ = combineLatest(this.contacts$, this.filter$)
                .pipe(
                    map(([contacts, filterString]) => contacts.filter(c => c.role.toLowerCase() !== filterString))
                );
        } else if (this.displayFilter === 'profile') {
            this.filteredContacts$ = combineLatest(this.contacts$, this.filter$)
                .pipe(
                    map(([contacts, filterString]) => contacts.filter(c => c.role.toLowerCase() === filterString))
                );
        } else {
           this.filteredContacts$ = this.contacts$;
        }

        this.filteredContacts$.subscribe(c => console.log('[careteam.caretab.component.ts] ngOnInit() filteredContacts$.subscribe() ', c));

    }

    onSelect(charCode): void {
        console.log('[careteam.caretab.component.ts] onSelect(charCode) charCode: ', charCode);
        this.selectedCharacter = this.char.transform(charCode);
        this.selectedCharCode = charCode;
    }

}
