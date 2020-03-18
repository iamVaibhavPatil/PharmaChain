import { NgModule } from '@angular/core';
import { StoresComponent } from './stores.component';
import { StoreEditComponent } from './store-edit/store-edit.component';
import { StoreListComponent } from './store-search/store-list/store-list.component';
import { StoreItemComponent } from './store-search/store-list/store-item/store-item.component';
import { StoreSearchComponent } from './store-search/store-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { StoresRoutingModule } from './stores-routing.module';
import { StoreUsersComponent } from './store-users/store-users.component';

@NgModule({
  declarations: [
    StoresComponent,
    StoreEditComponent,
    StoreListComponent,
    StoreItemComponent,
    StoreSearchComponent,
    StoreUsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoresRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class StoresModule { }
