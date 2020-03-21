import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DashboardService } from './dashboard.service';
import { OrderSummary } from './ordersummary.model';
import { TokenService } from '../shared/services/token.service';
import { DashboardWidget } from './dashboard-widget/dashboard-widget.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  cards;

  constructor(private breakpointObserver: BreakpointObserver,
              private dashboardService: DashboardService,
              private tokenService: TokenService) {}

  ngOnInit() {
    const orderSummaryRequest = new OrderSummary();
    orderSummaryRequest.customerId = this.tokenService.getCustomerId();
    this.dashboardService.getDashboardOrderSummary(orderSummaryRequest).subscribe((orderSummary: OrderSummary) => {
      this.updateOrderSummary(orderSummary);
    });
  }

  updateOrderSummary(orderSummary) {

    const totalSummary = new DashboardWidget('total', 'Total', 'bg-info', orderSummary.total);
    const progressSummary = new DashboardWidget('inprogress', 'In Progress', 'bg-warning', orderSummary.inProgress);
    const cancelledSummary = new DashboardWidget('cancelled', 'Cancelled', 'bg-danger', orderSummary.cancelled);
    const completedSummary = new DashboardWidget('completed', 'Completed', 'bg-success', orderSummary.completed);
    const order = new DashboardWidget('orders');

    /** Based on the screen size, switch from standard to one column per row */
    this.cards = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(

      map(({ matches }) => {
        if (matches) {
          totalSummary.cols = 2;
          totalSummary.rows = 1;
          progressSummary.cols = 2;
          progressSummary.rows = 1;
          cancelledSummary.cols = 2;
          cancelledSummary.rows = 1;
          completedSummary.cols = 2;
          completedSummary.rows = 1;
          order.cols = 2;
          order.rows = 2;
          return [
            totalSummary,
            progressSummary,
            cancelledSummary,
            completedSummary,
            order
          ];
        } else {
          totalSummary.cols = 1;
          totalSummary.rows = 2;
          progressSummary.cols = 1;
          progressSummary.rows = 1;
          cancelledSummary.cols = 1;
          cancelledSummary.rows = 1;
          completedSummary.cols = 1;
          completedSummary.rows = 1;
          order.cols = 1;
          order.rows = 2;
          return [
            totalSummary,
            order
          ];
        }
      })
    );
  }
}
