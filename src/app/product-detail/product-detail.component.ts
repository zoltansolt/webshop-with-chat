import { Component, OnInit } from '@angular/core';
import {Product} from "../shared/models/product";
import {ProductsService} from "../products/products.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = new Product();
  quantity: number = 1;
  id: number = 0;
  cart: Product[] = [];
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      const products = this.route.snapshot.data['products'].products;
      this.product = products.find((e: Product) => e.id === this.id)
    });

    this.productService.currentCart.subscribe(data => {
      this.cart = data;
    });
  }

  addToCart(): void {
    this.product['quantity'] = this.quantity;
    this.cart.push(this.product);
    this.productService.changeCart(this.cart);
  }

}
