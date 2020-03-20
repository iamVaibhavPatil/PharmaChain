import { Injectable } from '@angular/core';
import { Store } from './store.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseAPIUrl = environment.baseAPIUrl + '/stores';
  storesUpdated = new Subject<Store[]>();

  constructor(private httpClient: HttpClient) { }

  public getStore(storeId: string) {
    return this.httpClient.get<Store>(this.baseAPIUrl + `/${storeId}`);
  }

  public addStore(newStore: Store) {
    return this.httpClient.post(this.baseAPIUrl, newStore);
  }

  public updateStore(storeId: string, updatedStore: Store) {
    return this.httpClient.put(this.baseAPIUrl + `/${storeId}`, updatedStore);
  }

  public deleteStore(storeId: string) {
    return this.httpClient.delete(this.baseAPIUrl + `/${storeId}`);
  }

  public searchStore(storeName: string) {
    return this.httpClient.get<Store[]>(this.baseAPIUrl + '/search?q=' + storeName);
  }
}
