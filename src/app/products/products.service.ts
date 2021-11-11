import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Product} from "../shared/models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  cart: Product[] = [];
  productsInCart = new BehaviorSubject<Product[]>([]);
  currentCart = this.productsInCart.asObservable();
  constructor(private http: HttpClient) { }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/api.json");
  }

  public changeCart(cart: Product[]) {
    this.productsInCart.next(cart);
  }
}
