import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { name: 'summary', cols: 2, rows: 1 },
          { name: 'orders', cols: 2, rows: 1 },
          { name: 'payments', cols: 2, rows: 1 }
        ];
      }
      return [
        { name: 'summary', cols: 1, rows: 1 },
        { name: 'orders', cols: 1, rows: 2 },
        { name: 'payments', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
