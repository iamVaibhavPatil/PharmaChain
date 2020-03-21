import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { SummaryBoardComponent } from './summary-board/summary-board.component';
import { OrdersModule } from '../orders/orders.module';

@NgModule({
  declarations: [
    DashboardComponent,
    SummaryBoardComponent
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
