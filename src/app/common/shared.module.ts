import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {AppMaterialModule} from '../app-material/app-material.module';
import {MatIconRegistry} from '@angular/material/icon';
import { CharPipe } from './char.pipe';


@NgModule({
    declarations: [ CharPipe],
    imports: [
        CommonModule,
        AppMaterialModule
    ],
    exports: [
        CharPipe
    ],
    providers: [CharPipe]
})

export class SharedModule {
    constructor(
        private domSanitizer: DomSanitizer,
        public matIconRegistry: MatIconRegistry
    ) {
        const iconUrl = '../../assets/svg';
        // todo:  put all icons in the enum..
        // note:  icon keys and values below must both be lower case.
        enum Icons {
            clipboard = 'clipboard',
            clipboard_blue = 'clipboard_blue',
            clipboard_ltgrey = 'clipboard_ltgrey',
            dr_circle = 'dr_circle',
            dr_circle_blue = 'dr_circle_blue',
            gear_ltgrey = 'gear_ltgrey',
            gear_blue = 'gear_blue',
            gear = 'gear',
            scales = 'scales',
            target = 'target',
            target_blue = 'target_blue',
            target_ltgrey = 'target_ltgrey',
            heart = 'heart',
            heart_blue = 'heart_blue',
            heart_ltgrey = 'heart_ltgrey',
            twopeople = 'twopeople_blk',
            twopeople_blue = 'twopeople_blue',
            twopeople_ltgrey = 'twopeople_ltgrey',
            twopeople_money = 'twopeople_money',
            cool2 = 'cool2'
        }
        const iconKeys = Object.values(Icons);
        iconKeys.forEach(key => {
            // console.log(`[custom-icon.service.ts] key: ${key}, iconUrl ${iconUrl}`);  // todo: remove after testing..
            this.matIconRegistry.addSvgIconInNamespace('icons', key, this.setIconPath(`${iconUrl}/${key}.svg`));
        });
        // console.log('[shared.module.ts] matIconRegistry: ', this.matIconRegistry);   // todo: remove after testing

    }

    private setIconPath(icon: string): SafeResourceUrl {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(icon);
    }

}

