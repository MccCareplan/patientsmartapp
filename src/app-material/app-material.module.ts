import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatToolbarModule
    ],
    exports: [
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatToolbarModule
    ]
})
export class AppMaterialModule {
}
