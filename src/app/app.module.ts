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
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ChatComponent } from './chat/chat.component';
import {ChatService} from "./chat/chat.service";
import {MatBadgeModule} from "@angular/material/badge";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    MatBadgeModule,
    BrowserAnimationsModule
  ],
  providers: [
    ProductsResolver,
    ProductsService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
