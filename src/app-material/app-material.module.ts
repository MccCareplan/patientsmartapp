import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule
  ]
})
export class AppMaterialModule { }
