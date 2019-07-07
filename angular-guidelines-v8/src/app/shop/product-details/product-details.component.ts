/**
 * framework dependency
 */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

/**
 * Application dependency
 */
import { products } from "../../core/mock-data/products";
import { CartService } from "../service/cart.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styles: []
})
export class ProductDetailsComponent implements OnInit {
  product;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.product = products[+params.get("productId")];
    });
  }

  /**
   * addToCart
   */
  public addToCart(product) {
    window.alert("Your product has been added to the cars!");
    this.cartService.addToCart(product);
  }
}
