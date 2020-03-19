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
          { name: 'total', cols: 2, rows: 1 },
          { name: 'inprogress', cols: 2, rows: 1 },
          { name: 'cancelled', cols: 2, rows: 1 },
          { name: 'completed', cols: 2, rows: 1 },
          { name: 'orders', cols: 4, rows: 2 }
        ];
      }
      return [
        { name: 'total', cols: 1, rows: 1 },
        { name: 'inprogress', cols: 1, rows: 1 },
        { name: 'cancelled', cols: 1, rows: 1 },
        { name: 'completed', cols: 1, rows: 1 },
        { name: 'orders', cols: 4, rows: 2 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
