import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MainComponent } from './main/main.component';
import { LaunchComponent } from './launch/launch.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HeaderMobileComponent } from './navigation/header-mobile/header-mobile.component';
import { FooterMobileComponent } from './navigation/footer-mobile/footer-mobile.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { StatusComponent } from './main/status/status.component';
import { InterventionComponent } from './main/intervention/intervention.component';
import { GoalsComponent } from './main/goals/goals.component';
import { HealthComponent } from './main/health/health.component';
import { CareteamComponent } from './main/careteam/careteam.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './ngrx/reducers';
import { EffectsModule } from '@ngrx/effects';
import { PatientEffects } from './ngrx/effects/patient.effects';
import { SelectPatientComponent } from './develop-mode/select-patient/select-patient.component';
import { PatientLoadedGuard } from './guards/patient-loaded.guard';
import { ChartsModule } from 'ng2-charts';
import { LabGraphComponent } from './main/lab-graph/lab-graph.component';
import { LabResultsComponent } from './main/lab-results/lab-results.component';
import { VitalSignsComponent } from './main/vital-signs/vital-signs.component';
import { SubjectDataServiceService } from './services/subject-data-service.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './common/shared.module';
import { CareteamCaretabComponent } from './main/careteam/careteam.caretab/careteam.caretab.component';
import { CareplanEffects } from './ngrx/effects/careplan.effects';
import { FormsModule } from '@angular/forms';
import { ContactEffects } from './ngrx/effects/contact.effects';
import { ConditionsSummaryEffects } from './ngrx/effects/condition-summary';
import { GoalsTabComponent } from './main/goals/goals.tab/goals.tab.component';
import { HealthTabComponent } from './main/health/health.tab/health.tab.component';
import { InterventionsTabComponent } from './main/intervention/intervention.tab/intervention.tab.component';
import { GoalsSummaryEffects } from './ngrx/effects/goals-summary.effects';
import { MedicationSummaryEffects } from './ngrx/effects/medication-summary.effects';
import { SocialConcernsEffects } from './ngrx/effects/social-concerns.effects';
import { CareplansSummaryEffects } from './ngrx/effects/careplans-summary.effects';
import { EducationSummaryEffects } from './ngrx/effects/education-summary.effects';
import { ReferralsSummaryEffects } from './ngrx/effects/referrals-summary.effects';
import { CounselingSummaryEffects } from './ngrx/effects/counseling-summary.effects';
import { BPGraphComponent } from './main/graphs/bp/bp.component';
import { EGFRGraphComponent } from './main/graphs/egfr/egfr.component';
import { WeightGraphComponent } from './main/graphs/weight/weight.component';
import { UACRGraphComponent } from './main/graphs/uacr/uacr.component';
import { ObservationsService } from './services/observations.service.new';
import { GenericGraphComponent } from './main/graphs/generic/generic.component';
import { RetryInterceptor } from './interceptors/404.retry.interceptor';

@NgModule({
        declarations: [
                AppComponent,
                MainComponent,
                LaunchComponent,
                HeaderMobileComponent,
                FooterMobileComponent,
                LabGraphComponent,
                LabResultsComponent,
                SidenavComponent,
                StatusComponent,
                InterventionComponent,
                GoalsComponent,
                HealthComponent,
                CareteamComponent,
                SidenavComponent,
                SelectPatientComponent,
                VitalSignsComponent,
                CareteamCaretabComponent,
                GoalsTabComponent,
                HealthTabComponent,
                InterventionsTabComponent,
                BPGraphComponent,
                EGFRGraphComponent,
                WeightGraphComponent,
                UACRGraphComponent,
                GenericGraphComponent
        ],
        imports: [
                BrowserModule,
                BrowserAnimationsModule,
                ChartsModule,
                AppMaterialModule,
                FlexLayoutModule,
                ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
                AppRoutingModule,
                StoreModule.forRoot({ topLevel: reducer }),
                StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
                EffectsModule.forRoot([]),
                EffectsModule.forFeature([PatientEffects, CareplanEffects, ContactEffects, ConditionsSummaryEffects, GoalsSummaryEffects, MedicationSummaryEffects, SocialConcernsEffects, CareplansSummaryEffects, EducationSummaryEffects, ReferralsSummaryEffects, CounselingSummaryEffects]),
                HttpClientModule,
                SharedModule,
                FormsModule
        ],
        providers: [PatientLoadedGuard, SubjectDataServiceService, ObservationsService, { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true }],
        exports: [RouterModule],
        bootstrap: [AppComponent]
})
export class AppModule {
}
