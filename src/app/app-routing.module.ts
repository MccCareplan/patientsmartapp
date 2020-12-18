import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {LaunchComponent} from './launch/launch.component';
import {StatusComponent} from './main/status/status.component';
import {InterventionComponent} from './main/intervention/intervention.component';
import {GoalsComponent} from './main/goals/goals.component';
import {HealthComponent} from './main/health/health.component';
import {CareteamComponent} from './main/careteam/careteam.component';
import {PatientLoadedGuard} from './guards/patient-loaded.guard';
import {SelectPatientComponent} from './develop-mode/select-patient/select-patient.component';
import {DevModeGuard} from './guards/dev-mode.guard';

const routes: Routes = [
    {path: '', redirectTo: 'status', pathMatch: 'full'},
    {path: 'main', component: MainComponent},
    {path: 'launch', component: LaunchComponent},
    {path: 'status', component: StatusComponent, canActivate: [PatientLoadedGuard]},
    {path: 'intervention', component: InterventionComponent},
    {path: 'goals', component: GoalsComponent},
    {path: 'health', component: HealthComponent},
    {path: 'careteam', component: CareteamComponent},
    {path: 'devmode', component: SelectPatientComponent, canActivate: [DevModeGuard, PatientLoadedGuard]}
];

export const appRouting = RouterModule.forRoot(routes, {enableTracing: false});

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes, {enableTracing: false}),
        CommonModule
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}

