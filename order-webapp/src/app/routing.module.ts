import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrdersModule } from './orders/orders.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';

export function loadOrdersModule() {
  return OrdersModule;
}

export function loadAuthModule() {
  return AuthModule;
}

export function loadDashboardModule() {
  return DashboardModule;
}

const routes: Routes = [
  {
    path: '',
    loadChildren: loadAuthModule
  },
  {
    path: 'dashboard',
    loadChildren: loadDashboardModule,
    canActivate: [AuthGuard]
    /*data: {allowedRole: 'ROLE_SUPER_ADMIN'}*/
  },
  {
    path: 'order',
    loadChildren: loadOrdersModule,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
