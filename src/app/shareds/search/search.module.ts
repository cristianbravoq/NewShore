import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModules } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';

// import { SearchComponent } from './search.component';

@NgModule({
  declarations: [
    SearchComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModules,
    ReactiveFormsModule,
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule { }
