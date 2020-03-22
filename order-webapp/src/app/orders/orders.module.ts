import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders.component';
import { StoreEditComponent } from './store-edit/store-edit.component';
import { StoreListComponent } from './store-search/store-list/store-list.component';
import { StoreItemComponent } from './store-search/store-list/store-item/store-item.component';
import { StoreSearchComponent } from './store-search/store-search.component';
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
    StoreEditComponent,
    StoreListComponent,
    StoreItemComponent,
    StoreSearchComponent,
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
