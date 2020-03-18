import { Injectable } from '@angular/core';
import { Region } from '../models/region.model';
import { environment } from 'src/environments/environment.prod';
import { State } from '../models/state.model';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country.model';
import { StoreType } from '../models/storetype.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseAPIUrl = environment.baseAPIUrl + '/data';

  constructor(private httpClient: HttpClient) { }

  public getCountries() {
    return this.httpClient.get<Country[]>(this.baseAPIUrl + '/countries');
  }

  public getStates() {
    return this.httpClient.get<State[]>(this.baseAPIUrl + '/states');
  }

  public getRegions() {
    return this.httpClient.get<Region[]>(this.baseAPIUrl + '/regions');
  }

  public getStoreTypes() {
    return this.httpClient.get<StoreType[]>(this.baseAPIUrl + '/storetypes');
  }
}
