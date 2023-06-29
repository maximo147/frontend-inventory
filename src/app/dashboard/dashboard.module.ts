import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { MaterialModule } from '../material/material.module';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    HomeDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgChartsModule,
    MaterialModule
  ]
})
export class DashboardModule { }
