import { Component, OnInit, Input } from '@angular/core';
import { DashboardWidget } from './dashboard-widget.model';

@Component({
  selector: 'app-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss']
})
export class DashboardWidgetComponent implements OnInit {

  @Input() card: DashboardWidget;

  constructor() { }

  ngOnInit() {
  }

}
