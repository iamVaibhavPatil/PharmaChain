import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../order.model';
import { TokenService } from 'src/app/shared/services/token.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orders: Order[];

  isHandset: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private tokenService: TokenService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrderHistory(this.tokenService.getCustomerId()).subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }

  onCreateOrder() {
    this.router.navigateByUrl('/order/new');
  }
}
