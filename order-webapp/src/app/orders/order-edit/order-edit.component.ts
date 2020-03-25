import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { OrderService } from '../order.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import * as moment from 'moment';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged } from 'rxjs/operators';
import { Product } from '../product.model';
import { Order } from '../order.model';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit {

  orderId: string;
  editMode = false;
  orderForm: FormGroup;

  filteredProducts: Product[];
  isLoading = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private dataService: DataService,
              private orderService: OrderService,
              private alertService: AlertService) { }

  ngOnInit() {

    // Check for Edit or New
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['orderId'] != null && params['orderId'].length > 0) {
        this.orderId = params['orderId'];
      }
      this.editMode = params['orderId'] != null;
      this.initForm();
    });

    this.orderForm
      .get('productName')
      .valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.filteredProducts = [];
          this.isLoading = true;
        }),
        switchMap(value => this.orderService.searchProducts(value)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          )
        )
      )
      .subscribe((data: Product[]) => {
        if (data === undefined) {
          this.filteredProducts = [];
        } else {
          this.filteredProducts = data;
        }
      });
  }

  displayFn(product: Product) {
    return product && product.productName ? product.productName : '';
  }

  initForm() {

    // If Edit Mode, then get the details of Order and Patch the Form
    if (this.editMode) {
      this.orderService.getOrder(this.orderId)
          .subscribe((order: Order) => {
            this.patchOrderForm(order);
          });
    }

    // Initiate the form
    this.orderForm = new FormGroup({
      'orderId': new FormControl(this.orderId),
      'customerId': new FormControl(null),
      'productName': new FormControl(null)
    });
  }

  // Patch the Form for Update
  patchOrderForm(order: Order) {
    this.orderForm.patchValue({
      'orderId': new FormControl(order.orderId),
      'customerId': new FormControl(order.customerId),
      'productName': new FormControl(order.orderItems[0].productName)
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.orderService.updateOrder(this.orderId, this.orderForm.value)
          .subscribe(response => {
            this.alertService.showSuccess('ORDER UPDATED SUCCESSFULLY');
            this.onCancel();
          });
    } else {
      this.orderService.createOrder(this.orderForm.value)
          .subscribe(response => {
            this.alertService.showSuccess('ORDER CREATED SUCCESSFULLY');
            this.onCancel();
          });
    }
  }

  onCancel() {
    this.router.navigate(['/dashboard'], { relativeTo: this.activatedRoute });
  }

  onDelete() {
    this.orderService.deleteOrder(this.orderId)
        .subscribe(response => {
          this.alertService.showSuccess('ORDER DELETED SUCCESSFULLY');
          this.onCancel();
        });
  }

  onReset() {
    this.orderForm.reset();
  }
}
