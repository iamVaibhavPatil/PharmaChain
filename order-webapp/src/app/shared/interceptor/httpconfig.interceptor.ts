import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService,
                private alertService: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Set Authorization Token
        const token = this.tokenService.getToken();
        if (token != null) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        // Set Content Type
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        // Set Accept Header
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            retry(1),
            tap((response: HttpEvent<any>) => {
                if (response instanceof HttpResponse) {
                    console.log('Event -->', response.body);
                }
            }),
            catchError((error: any) => {
                let errorMessage = '';
                if (error instanceof HttpErrorResponse) {
                    try {
                        if (error.error instanceof ErrorEvent || error.error instanceof ProgressEvent) {
                            errorMessage = `${error.message}`;
                        } else {
                            errorMessage = `${error.error.code} - ${error.error.message}`;
                        }
                    } catch (e) {
                        errorMessage = `AN ERROR OCCURED - ${e.message}`;
                    }
                }
                this.alertService.showError(errorMessage);
                return throwError(error);
            })
        );
    }
}
