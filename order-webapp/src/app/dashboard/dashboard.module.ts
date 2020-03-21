import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { OrdersModule } from '../orders/orders.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardWidgetComponent } from './dashboard-widget/dashboard-widget.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardWidgetComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MaterialModule,
    SharedModule,
    OrdersModule
  ]
})
export class DashboardModule { }
