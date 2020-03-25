import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { OrderService } from '../order.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Product } from '../product.model';
import { Order, OrderItem } from '../order.model';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent implements OnInit, OnDestroy {

  orderId: string;
  editMode = false;
  orderForm: FormGroup;

  filteredProducts: Product[];
  valueChangesSubscription: Subscription;
  productSearchSubscription: Subscription;

  order: Order = new Order();

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private dataService: DataService,
              private orderService: OrderService,
              private alertService: AlertService,
              private tokenService: TokenService) { }

  ngOnInit() {

    // Check for Edit or New
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['orderId'] != null && params['orderId'].length > 0) {
        this.orderId = params['orderId'];
      }
      this.editMode = params['orderId'] != null;
      this.initForm();
    });

    // Create empty order - Initialize
    this.order.customerId = this.tokenService.getCustomerId();
    this.order.orderItems = [];

    // Product search listener
    this.valueChangesSubscription = this.orderForm
      .get('productName')
      .valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(data => {
        if (data) {
          if (this.productSearchSubscription) {
            this.productSearchSubscription.unsubscribe();
          }
          this.productSearchSubscription = this.orderService.searchProducts(data).subscribe(response => {
            this.filteredProducts = response;
          });
        }
      });
  }

  onProductSelected(product: Product) {
    if (product && product.productName) {
      const orderItem: OrderItem = new OrderItem();
      orderItem.productId = product.productId;
      orderItem.productName = product.productName;
      orderItem.price = product.price;
      orderItem.quantity = 1;
      orderItem.total = product.price * 1;
      this.order.orderItems.push(orderItem);
    }
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

  ngOnDestroy(): void {
    this.valueChangesSubscription.unsubscribe();
  }
}
