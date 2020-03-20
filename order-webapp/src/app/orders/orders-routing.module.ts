import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders.component';
import { StoreSearchComponent } from './store-search/store-search.component';
import { StoreEditComponent } from './store-edit/store-edit.component';

const ordersRoutes: Routes = [
    { path: '',
        component: OrdersComponent,
        children: [
            { path: '', component: StoreSearchComponent },
            { path: 'new', component: StoreEditComponent },
            { path: 'edit/:storeId', component: StoreEditComponent }
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
