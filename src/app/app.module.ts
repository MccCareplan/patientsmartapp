import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material/app-material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MainComponent } from './main/main.component';
import { LaunchComponent } from './launch/launch.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';


@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LaunchComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        AppRoutingModule
    ],
    providers: [],
    exports: [RouterModule],
    bootstrap: [AppComponent]
})
export class AppModule {
}
