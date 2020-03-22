import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Order } from '../../order.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() order: Order;

  isHandset: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onEditOrder() {
    // this.router.navigate(['edit', this.order.orderId], { relativeTo: this.activatedRoute });
    this.router.navigateByUrl('order/edit/' + this.order.orderId);
  }
}
