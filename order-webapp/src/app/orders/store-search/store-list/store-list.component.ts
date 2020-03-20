import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoreService } from '../../store.service';
import { Store } from '../../store.model';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) { }

  storesSubscription: Subscription;
  stores: Store[];

  ngOnInit() {
    // Watch for Store Search Results
    this.storesSubscription = this.storeService.storesUpdated.subscribe((stores: Store[]) => {
      this.stores = stores;
    });
  }

  ngOnDestroy() {
    this.storesSubscription.unsubscribe();
  }
}
