import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const ordersRoutes: Routes = [
    {
      path: '',
      component: DashboardComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(ordersRoutes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
