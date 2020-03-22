import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders.component';
import { StoreSearchComponent } from './store-search/store-search.component';
import { OrderEditComponent } from './order-edit/order-edit.component';

const ordersRoutes: Routes = [
    { path: '',
        component: OrdersComponent,
        children: [
            { path: '', component: StoreSearchComponent },
            { path: 'new', component: OrderEditComponent },
            { path: 'edit/:orderId', component: OrderEditComponent }
        ]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(ordersRoutes)
  ],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
