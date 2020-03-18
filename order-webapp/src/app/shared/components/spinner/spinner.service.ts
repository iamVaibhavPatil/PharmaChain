import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

    spinnerUpdated = new Subject<boolean>();

    constructor() { }

    public display(value: boolean) {
        this.spinnerUpdated.next(value);
    }
}
