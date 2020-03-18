import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from '../shared/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent {

  isTabOrHandset: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private tokenService: TokenService) {}

  onLogOut() {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.tokenService.isAuthenticated();
  }

  getUserName() {
    return this.tokenService.getUsername();
  }
}
