import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MainComponent } from './main/main.component';
import { LaunchComponent } from './launch/launch.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import { HeaderMobileComponent } from './navigation/header-mobile/header-mobile.component';
import { FooterMobileComponent } from './navigation/footer-mobile/footer-mobile.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';


@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LaunchComponent,
        HeaderMobileComponent,
        FooterMobileComponent,
        SidenavComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        FlexLayoutModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        AppRoutingModule
    ],
    providers: [],
    exports: [RouterModule],
    bootstrap: [AppComponent]
})
export class AppModule {
}
