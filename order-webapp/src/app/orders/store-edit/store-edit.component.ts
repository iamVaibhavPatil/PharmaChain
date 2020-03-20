import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { StoreService } from '../store.service';
import { Region } from 'src/app/shared/models/region.model';
import { State } from 'src/app/shared/models/state.model';
import { StoreType } from 'src/app/shared/models/storetype.model';
import { Store } from '../store.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import * as moment from 'moment';

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.scss']
})
export class StoreEditComponent implements OnInit {

  storeId: string;
  editMode = false;
  storeForm: FormGroup;
  states: State[];
  regions: Region[];
  storeTypes: StoreType[];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private dataService: DataService,
              private storeService: StoreService,
              private alertService: AlertService) { }

  ngOnInit() {

    // Load Static Data
    this.dataService.getStoreTypes().subscribe((storeTypes: StoreType[]) => { this.storeTypes = storeTypes; });
    this.dataService.getRegions().subscribe((regions: Region[]) => { this.regions = regions; });
    this.dataService.getStates().subscribe((states: State[]) => { this.states = states; });

    // Check for Edit or New
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['storeId'] != null && params['storeId'].length > 0) {
        this.storeId = params['storeId'];
      }
      this.editMode = params['storeId'] != null;
      this.initForm();
    });
  }

  initForm() {

    // If Edit Mode, then get the details of Store and Patch the Form
    if (this.editMode) {
      this.storeService.getStore(this.storeId)
          .subscribe((store: Store) => {
            this.patchStoreForm(store);
          });
    }

    // Initiate the form
    this.storeForm = new FormGroup({
      'storeId': new FormControl(this.storeId),
      'storeType': new FormControl(null, Validators.required),
      'storeRegion': new FormControl(null, Validators.required),
      'storeName': new FormControl(null, Validators.required),
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.email),
      'mobileNumber': new FormControl(null, [Validators.required, Validators.min(10)]),
      'address': new FormGroup({
        'type': new FormControl('1', Validators.required),
        'addressLine1': new FormControl(null, Validators.required),
        'addressLine2': new FormControl(null),
        'city': new FormControl(null, Validators.required),
        'state': new FormControl(null, Validators.required),
        'postalCode': new FormControl(null, Validators.required),
        'country': new FormControl('IN', Validators.required)
      }),
      'taxInfo': new FormGroup({
        'gstNumber': new FormControl(null),
        'panNumber': new FormControl(null, Validators.required),
        'vatNumber': new FormControl(null)
      }),
      'licenseInfo': new FormGroup({
        'licenseNumber': new FormControl(null, Validators.required),
        'issueDate': new FormControl(null, Validators.required),
        'expiryDate': new FormControl(null, Validators.required),
        'imageUrl': new FormControl(null)
      }),
      'creditInfo': new FormGroup({
        'creditPeriod': new FormControl('15', Validators.required),
        'discountBefore': new FormControl('0', Validators.required),
        'discountAfter': new FormControl('0', Validators.required),
        'billingAmountLimit': new FormControl('100000', Validators.required),
        'orderAmountLimit': new FormControl('10000', Validators.required)
      }),
      'verified': new FormControl('Y'),
      'status': new FormControl('A')
    });
  }

  // Patch the Form for Update
  patchStoreForm(store: Store) {
    this.storeForm.patchValue({
      'storeId': store.storeId,
      'storeType': store.storeType,
      'storeRegion': store.storeRegion,
      'storeName': store.storeName,
      'firstName': store.firstName,
      'lastName': store.lastName,
      'email': store.email,
      'mobileNumber': store.mobileNumber,
      'address': {
        'type': store.address.type,
        'addressLine1': store.address.addressLine1,
        'addressLine2': store.address.addressLine2,
        'city': store.address.city,
        'state': store.address.state,
        'postalCode': store.address.postalCode,
        'country': store.address.country
      },
      'taxInfo': {
        'gstNumber': store.taxInfo.gstNumber,
        'panNumber': store.taxInfo.panNumber,
        'vatNumber': store.taxInfo.vatNumber
      },
      'licenseInfo': {
        'licenseNumber': store.licenseInfo.licenseNumber,
        'issueDate': moment(store.licenseInfo.issueDate),
        'expiryDate': moment(store.licenseInfo.expiryDate),
        'imageUrl': store.licenseInfo.imageUrl
      },
      'creditInfo': {
        'creditPeriod': store.creditInfo.creditPeriod,
        'discountBefore': store.creditInfo.discountBefore,
        'discountAfter': store.creditInfo.discountAfter,
        'billingAmountLimit': store.creditInfo.billingAmountLimit,
        'orderAmountLimit': store.creditInfo.orderAmountLimit
      },
      'verified': store.verified,
      'status': store.status
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.storeService.updateStore(this.storeId, this.storeForm.value)
          .subscribe(response => {
            this.alertService.showSuccess('STORE UPDATED SUCCESSFULLY');
            this.onCancel();
          });
    } else {
      this.storeService.addStore(this.storeForm.value)
          .subscribe(response => {
            this.alertService.showSuccess('STORE ADDED SUCCESSFULLY');
            this.onCancel();
          });
    }
  }

  onCancel() {
    this.router.navigate(['/stores'], { relativeTo: this.activatedRoute });
  }

  onDelete() {
    this.storeService.deleteStore(this.storeId)
        .subscribe(response => {
          this.alertService.showSuccess('STORE DELETED SUCCESSFULLY');
          this.onCancel();
        });
  }

  onReset() {
    this.storeForm.reset();
  }
}
