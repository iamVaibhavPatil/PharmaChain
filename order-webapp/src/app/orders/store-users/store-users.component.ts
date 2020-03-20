import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-store-users',
  templateUrl: './store-users.component.html',
  styleUrls: ['./store-users.component.scss']
})
export class StoreUsersComponent implements OnInit {

  @Input() storeId: string;

  constructor() { }

  ngOnInit() {
    console.log('Store ID --> ' + this.storeId);
  }

}
