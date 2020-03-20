import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoresComponent } from './stores.component';
import { StoreSearchComponent } from './store-search/store-search.component';
import { StoreEditComponent } from './store-edit/store-edit.component';

const storesRoutes: Routes = [
    { path: '',
        component: StoresComponent,
        children: [
            { path: '', component: StoreSearchComponent },
            { path: 'new', component: StoreEditComponent },
            { path: 'edit/:storeId', component: StoreEditComponent }
        ]
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(storesRoutes)
  ],
  exports: [RouterModule]
})
export class StoresRoutingModule {}
