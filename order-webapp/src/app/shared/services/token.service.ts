import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const ROLES_KEY = 'AuthRoles';
const CUSTOMER_ID = 'CustomerId';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

    constructor() { }

    public logOut() {
        localStorage.clear();
    }

    public isAuthenticated() {
        return this.getToken() != null;
    }

    public saveToken(token: string) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string {
        return localStorage.getItem(TOKEN_KEY);
    }

    public saveUsername(username: string) {
        localStorage.removeItem(USERNAME_KEY);
        localStorage.setItem(USERNAME_KEY, username);
    }

    public getUsername(): string {
        return localStorage.getItem(USERNAME_KEY);
    }

    public saveAuthorities(authorities: string[]) {
        localStorage.removeItem(ROLES_KEY);
        localStorage.setItem(ROLES_KEY, JSON.stringify(authorities));
    }

    public getAuthorities(): string[] {
        const roles: Array<string> = [];
        if (localStorage.getItem(TOKEN_KEY)) {
            JSON.parse(localStorage.getItem(ROLES_KEY)).forEach(role => {
                roles.push(role);
            });
        }
        return roles;
    }

    public saveCustomerId(customerId: string) {
        localStorage.removeItem(CUSTOMER_ID);
        localStorage.setItem(CUSTOMER_ID, customerId);
    }

    public getCustomerId(): string {
        return localStorage.getItem(CUSTOMER_ID);
    }
}
