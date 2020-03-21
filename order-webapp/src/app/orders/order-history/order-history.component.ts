import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onCreateOrder() {
    this.router.navigateByUrl('/orders/new');
  }
}
