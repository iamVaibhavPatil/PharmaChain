import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercaseDirective } from './directives/uppercase.directive';
import { LowercaseDirective } from './directives/lowercase.directive';
import { AutofocusDirective } from './directives/autofocus.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { LoaderInterceptor } from './interceptor/loader.interceptor';

export const HTTP_INTERCEPTOR_PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
];

@NgModule({
  declarations: [
    UppercaseDirective,
    LowercaseDirective,
    AutofocusDirective,
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UppercaseDirective,
    LowercaseDirective,
    AutofocusDirective,
    SpinnerComponent
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    HTTP_INTERCEPTOR_PROVIDERS
  ],
})
export class SharedModule {}
