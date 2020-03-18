import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Auth } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    baseAPIUrl = environment.baseAPIUrl + '/auth';

    constructor(private httpClient: HttpClient) {}

    login(auth: Auth): Observable<Auth> {
        return this.httpClient.post<Auth>(this.baseAPIUrl + '/login', auth);
    }

    register(auth: Auth): Observable<Auth> {
        return this.httpClient.post<Auth>(this.baseAPIUrl + '/register', auth);
    }
}
