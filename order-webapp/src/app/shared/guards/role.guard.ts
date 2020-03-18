import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from '../services/token.service';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private router: Router,
                private tokenService: TokenService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const roles = this.tokenService.getAuthorities();
        if (roles.includes(route.data.allowedRole)) {
            return true;
        }
        return false;
    }
}
