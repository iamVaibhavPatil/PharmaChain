import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  template: `<span *ngIf="showSpinner" class="loading"></span>`,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  showSpinner = false;
  spinnerSubscription: Subscription;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
    this.spinnerSubscription = this.spinnerService.spinnerUpdated.subscribe((value: boolean) => {
      this.showSpinner = value;
    });
  }

  ngOnDestroy(): void {
    this.spinnerSubscription.unsubscribe();
  }

}
