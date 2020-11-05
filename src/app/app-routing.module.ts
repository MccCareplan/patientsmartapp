import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {LaunchComponent} from './launch/launch.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'launch', component: LaunchComponent}
];

export const appRouting = RouterModule.forRoot(routes, {enableTracing: false});

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {enableTracing: false}),
    CommonModule
  ],
  exports: [ RouterModule ],

})
export class AppRoutingModule { }
