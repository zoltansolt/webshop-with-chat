import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { ProductBoxComponent } from './products/product-box/product-box.component';
import {AppRoutingModule} from "./app-routing.module";
import {ProductsResolver} from "./products/products.resolver";
import {ProductsService} from "./products/products.service";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChatComponent} from "./chat/chat.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsComponent,
    ProductDetailComponent,
    CartComponent,
    ProductBoxComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatBadgeModule
  ],
  providers: [
    ProductsResolver,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
