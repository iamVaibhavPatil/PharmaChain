import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Order } from './order.model';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseAPIUrl = environment.baseAPIUrl + '/orders';
  ordersUpdated = new Subject<Order[]>();

  constructor(private httpClient: HttpClient) { }

  public getOrder(orderId: string) {
    return this.httpClient.get<Order>(this.baseAPIUrl + `/${orderId}`);
  }

  public createOrder(newOrder: Order) {
    return this.httpClient.post(this.baseAPIUrl, newOrder);
  }

  public updateOrder(orderId: string, updatedOrder: Order) {
    return this.httpClient.put(this.baseAPIUrl + `/${orderId}`, updatedOrder);
  }

  public deleteOrder(orderId: string) {
    return this.httpClient.delete(this.baseAPIUrl + `/${orderId}`);
  }

  public searchProducts(productName: string) {
    return this.httpClient.get<Product[]>(environment.baseAPIUrl + '/products/search?q=' + productName);
  }

  public getOrderHistory(customerId: string) {
    return this.httpClient.get<Order[]>(this.baseAPIUrl + '/history' + `/${customerId}`);
  }
}
