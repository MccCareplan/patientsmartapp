import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Injectable({
    providedIn: 'root'
})

export class CustomIconService {

    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
    }

    public registerIcons(): void {
        this.loadIcons(Object.values(Icons), '../assets/svg');
    }

    private loadIcons(iconKeys: string[], iconUrl: string): void {
        iconKeys.forEach(key => {
            console.log(`[custom-icon.service.ts] key: ${key}, iconUrl ${iconUrl}`);
            this.matIconRegistry.addSvgIconInNamespace('assets', key, this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`));
        });
        console.log('[custom-icon.service.ts] matIconRegistry: ', this.matIconRegistry);
    }
}

export enum Icons {
    clipboard = 'clipboard',
    clipboard_blue = 'clipboard_blue',
    clipboard_ltgrey = 'clipboard_ltgrey',
    cool2 = 'cool2'
}
