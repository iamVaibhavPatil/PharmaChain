import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private tokenService: TokenService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // Authenticated
        if (this.tokenService.isAuthenticated()) {
            return true;
        }

        // Navigate to login page, if not authenticated
        this.router.navigate(['/login']);
        return false;
    }
}
