import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../products/products.service";
import {Product} from "../shared/models/product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Product[] = [];
  sumPrice: number = 0;
  sumQuantity: number = 0;
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.currentCart.subscribe(data => {
      this.cart = data;
      this.cart.forEach(product => {
        this.sumPrice += product.price * product.quantity * (1 + (product.tax/100));
        this.sumQuantity += product.quantity;
      })
    });
  }

}
