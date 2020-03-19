import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DashboardService } from './dashboard.service';
import { OrderSummary } from './ordersummary.model';
import { SummaryBoard } from './summary-board/summary-board.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  cards;

  constructor(private breakpointObserver: BreakpointObserver,
              private dashboardService: DashboardService) {}

  ngOnInit() {
    const orderSummaryRequest = new OrderSummary();
    orderSummaryRequest.customerId = 'da01555c-c4e9-4c4a-9e3b-360ef7a70c62';
    this.dashboardService.getOrderSummary(orderSummaryRequest).subscribe((orderSummary: OrderSummary) => {
      this.updateOrderSummary(orderSummary);
    });
  }

  updateOrderSummary(orderSummary) {

    const totalSummary = new SummaryBoard('total', 'Total', 'bg-info', orderSummary.total);
    const progressSummary = new SummaryBoard('inprogress', 'In Progress', 'bg-warning', orderSummary.inProgress);
    const cancelledSummary = new SummaryBoard('cancelled', 'Cancelled', 'bg-danger', orderSummary.cancelled);
    const completedSummary = new SummaryBoard('completed', 'Completed', 'bg-success', orderSummary.completed);
    const order = new SummaryBoard('orders');

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
          order.cols = 4;
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
          totalSummary.rows = 1;
          progressSummary.cols = 1;
          progressSummary.rows = 1;
          cancelledSummary.cols = 1;
          cancelledSummary.rows = 1;
          completedSummary.cols = 1;
          completedSummary.rows = 1;
          order.cols = 4;
          order.rows = 2;
          return [
            totalSummary,
            progressSummary,
            cancelledSummary,
            completedSummary,
            order
          ];
        }
      })
    );
  }
}
