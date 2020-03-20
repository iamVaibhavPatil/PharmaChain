import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { Store } from '../store.model';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-store-search',
  templateUrl: './store-search.component.html',
  styleUrls: ['./store-search.component.scss']
})
export class StoreSearchComponent implements OnInit {

  storeSearchForm: FormGroup;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private orderService: OrderService,
              private alertService: AlertService) { }

  ngOnInit() {

    // Initialize the form
    this.storeSearchForm = new FormGroup({
      'storeName': new FormControl(null)
    });
  }

  onAddNewStore() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  onSearch() {
    const storeName = this.storeSearchForm.get('storeName').value;
    if (!storeName) {
      this.alertService.showError('PLEASE ENTER STORE NAME');
    } else {
      this.orderService.searchStore(storeName)
          .subscribe((stores: Store[]) => {
            this.orderService.storesUpdated.next(stores.slice());
          });
    }
  }
}
