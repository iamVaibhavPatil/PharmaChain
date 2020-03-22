import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderItemComponent } from './order-history/order-item/order-item.component';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderHistoryComponent,
    OrderEditComponent,
    OrderItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    OrderHistoryComponent
  ]
})
export class OrdersModule { }
