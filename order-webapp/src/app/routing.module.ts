import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoresModule } from './stores/stores.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';
// import { CompaniesModule } from './companies/companies.module';
// import { ProductsModule } from './products/products.module';

export function loadStoresModule() {
  return StoresModule;
}

export function loadAuthModule() {
  return AuthModule;
}

/*export function loadCompaniesModule() {
  return CompaniesModule;
}

export function loadProductsModule() {
  return ProductsModule;
}*/

const routes: Routes = [
  {
    path: '',
    loadChildren: loadAuthModule
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
    /*data: {allowedRole: 'ROLE_SUPER_ADMIN'}*/
  },
  {
    path: 'stores',
    loadChildren: loadStoresModule,
    canActivate: [AuthGuard]
  },
  /*{
    path: 'companies',
    loadChildren: loadCompaniesModule,
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren: loadProductsModule,
    canActivate: [AuthGuard]
  }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
