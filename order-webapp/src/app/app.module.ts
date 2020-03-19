import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RoutingModule } from './routing.module';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { StoresModule } from './stores/stores.module';
// import { CompaniesModule } from './companies/companies.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummaryBoardComponent } from './dashboard/summary-board/summary-board.component';
import { OrdersBoardComponent } from './dashboard/orders-board/orders-board.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    DashboardComponent,
    SummaryBoardComponent,
    OrdersBoardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    RoutingModule,
    SharedModule,
    StoresModule,
    // CompaniesModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
