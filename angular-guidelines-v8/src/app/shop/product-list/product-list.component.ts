import { Component, OnInit } from "@angular/core";

import { products } from "../../core/mock-data/products";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styles: []
})
export class ProductListComponent implements OnInit {
  products = products;

  constructor() {}

  ngOnInit() {}

  share() {
    window.alert("The product has been shared!");
  }

  /**
   * onNotify
   */
  public onNotify() {
    window.alert("You will be notified when the product goes on sale");
  }
}
