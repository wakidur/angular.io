import { Component, OnInit } from "@angular/core";
import { CartService } from "../service/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styles: []
})
export class CartComponent implements OnInit {
  items;
  constructor(private cartService: CartService) {
    this.items = this.cartService.getItems();
  }

  ngOnInit() {}
}
