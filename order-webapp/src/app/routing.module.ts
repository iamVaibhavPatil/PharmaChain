import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';

export function loadOrdersModule() {
  return OrdersModule;
}

export function loadAuthModule() {
  return AuthModule;
}

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
    path: 'orders',
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
