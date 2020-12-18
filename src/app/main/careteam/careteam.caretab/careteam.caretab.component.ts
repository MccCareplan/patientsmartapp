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

    iconNames = {
        types:
            [
                {type: 'person', icon: 'person'},
                {type: 'organization', icon: 'group'}
            ],
        roles:
            [
                {role: 'patient', icon: 'sick'},
                {role: 'catering', icon: 'food_bank'},
                {role: 'physician', icon: 'medical_services'},
                {role: 'nurse', icon: 'medical_services'},
                {role: 'caregiver', icon: 'medical_services'},
                {role: 'ologist', icon: 'medical_services'},
                {role: 'dietician', icon: 'fastfood'},
                {role: 'social worker', icon: 'psychology'},
                {role: 'pharmacist', icon: 'medical_services'},
            ]
    };

    constructor(private char: CharPipe, private store: Store<fromRoot.State>) {

    }

    // https://stackblitz.com/edit/angular-filtering-rxjs
    ngOnInit(): void {
        this.contacts$ = this.store.select(fromRoot.getContacts);
        this.filter$ = of('patient');
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
    }

    onSelect(charCode): void {
        // console.log('[careteam.caretab.component.ts] onSelect(charCode) charCode: ', charCode);  // todo: remove after testing
        this.selectedCharacter = this.char.transform(charCode);
        this.selectedCharCode = charCode;
    }

    getTypeIcon(type): string {
        const icon = this.iconNames.types.filter( t => type.toLowerCase().includes(t.type.toLowerCase()));
        if (icon.length >  0) {
            return icon[0].icon;
        } else {
            return '';
        }
    }

    getRoleIcon(role): string {
        const icon = this.iconNames.roles.filter( r => role.toLowerCase().includes(r.role.toLowerCase()));
        if (icon.length > 0) {
            return icon[0].icon;
        } else {
            return '';
        }
    }

}
