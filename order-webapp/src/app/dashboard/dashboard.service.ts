import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { OrderSummary } from './ordersummary.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseAPIUrl = environment.baseAPIUrl + '/dashboards';

  constructor(private httpClient: HttpClient) { }

  public getDashboardOrderSummary(orderSummary: OrderSummary) {
    return this.httpClient.post<OrderSummary>(this.baseAPIUrl + '/ordersummary', orderSummary);
  }
}
