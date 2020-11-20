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
import { StatusComponent } from './main/status/status.component';
import { InterventionComponent } from './main/intervention/intervention.component';
import { GoalsComponent } from './main/goals/goals.component';
import { HealthComponent } from './main/health/health.component';
import { CareteamComponent } from './main/careteam/careteam.component';
import {StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './reducers';
import {EffectsModule} from '@ngrx/effects';
import { PatientEffects } from './effects/patient.effects';
import { SelectPatientComponent } from './develop-mode/select-patient/select-patient.component';
import { PatientLoadedGuard } from './guards/patient-loaded.guard';
import { DataService} from './services/data.service';


@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LaunchComponent,
        HeaderMobileComponent,
        FooterMobileComponent,
        SidenavComponent,
        StatusComponent,
        InterventionComponent,
        GoalsComponent,
        HealthComponent,
        CareteamComponent,
        SidenavComponent,
        SelectPatientComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        FlexLayoutModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        AppRoutingModule,
        StoreModule.forRoot({topLevel: reducer}),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([PatientEffects])    ],
    providers: [PatientLoadedGuard, DataService],
    exports: [RouterModule],
    bootstrap: [AppComponent]
})
export class AppModule {
}
