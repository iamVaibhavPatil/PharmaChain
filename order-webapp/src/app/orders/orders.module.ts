import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders.component';
import { StoreEditComponent } from './store-edit/store-edit.component';
import { StoreListComponent } from './store-search/store-list/store-list.component';
import { StoreItemComponent } from './store-search/store-list/store-item/store-item.component';
import { StoreSearchComponent } from './store-search/store-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
  declarations: [
    OrdersComponent,
    StoreEditComponent,
    StoreListComponent,
    StoreItemComponent,
    StoreSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class OrdersModule { }
