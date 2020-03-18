import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { tap, catchError, finalize } from 'rxjs/operators';
import { SpinnerService } from '../components/spinner/spinner.service';
import { throwError } from 'rxjs';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    private totalRequests = 0;

    constructor(private spinnerService: SpinnerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        this.totalRequests++;
        this.spinnerService.display(true);
        return next.handle(request).pipe(
            tap(response => {
                if (response instanceof HttpResponse) {
                    this.decreaseRequests();
                }
            }),
            catchError(error => {
                this.decreaseRequests();
                return throwError(error);
            })
        );
    }

    private decreaseRequests() {
        this.totalRequests--;
        if (this.totalRequests === 0) {
            this.spinnerService.display(false);
        }
    }
}
