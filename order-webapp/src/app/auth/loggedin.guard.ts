import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from '../shared/services/token.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(private router: Router,
                private tokenService: TokenService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // If already logged in, then show dashboard otherwise continue to login page
        if (this.tokenService.isAuthenticated()) {
            this.router.navigate(['/dashboard']);
            return false;
        }
        return true;
    }
}
