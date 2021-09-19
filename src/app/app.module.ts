import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule, orderByComparator } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileSaverModule } from 'ngx-filesaver';
import { OrderPageComponent } from './order-page/order-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderPageComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxDatatableModule,
    BrowserModule /* or CommonModule */, 
      FormsModule,
   ReactiveFormsModule,
   FileSaverModule,
   RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
