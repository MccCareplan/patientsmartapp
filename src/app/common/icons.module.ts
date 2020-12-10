import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {AppMaterialModule} from '../app-material/app-material.module';
import {MatIconRegistry} from '@angular/material/icon';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AppMaterialModule
    ],
    exports: [],
    providers: []
})

export class IconsModule {
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
            gear_ltgrey = 'gear_ltgrey',
            gear_blue = 'gear_blue',
            gear = 'gear',
            target = 'target',
            target_blue = 'target_blue',
            target_ltgrey = 'target_ltgrey',
            heart = 'heart',
            heart_blue = 'heart_blue',
            heart_ltgrey = 'heart_ltgrey',
            twopeople = 'twopeople_blk',
            twopeople_blue = 'twopeople_blue',
            twopeople_ltgrey = 'twopeople_ltgrey',
            cool2 = 'cool2'
        }
        const iconKeys = Object.values(Icons);
        iconKeys.forEach(key => {
            // console.log(`[custom-icon.service.ts] key: ${key}, iconUrl ${iconUrl}`);
            this.matIconRegistry.addSvgIconInNamespace('icons', key, this.setIconPath(`${iconUrl}/${key}.svg`));
        });
        // console.log('[icons.module.ts] matIconRegistry: ', this.matIconRegistry);

    }

    private setIconPath(icon: string): SafeResourceUrl {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(icon);
    }

}
