import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelRoutingModule } from './travel-routing.module';
import { AngularMaterialModules } from 'src/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { TravelComponent } from './travel.component';

@NgModule({
  declarations: [
    TravelComponent
  ],
  imports: [
    CommonModule,
    TravelRoutingModule,
    AngularMaterialModules,
    ReactiveFormsModule
  ],
  exports: [
    TravelComponent
  ]
})
export class TravelModule { }
