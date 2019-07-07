import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ShopServiceModule } from "./shop-service.module";

@Injectable({
  providedIn: ShopServiceModule
})
export class CartService {
  public items = [];
  constructor(private httpClient: HttpClient) {}

  /**
   * addToCart
   */
  public addToCart(product: any) {
    this.items.push(product);
  }

  /**
   * getItems
   */
  public getItems() {
    return this.items;
  }

  /**
   * clearCart
   */
  public clearCart() {
    this.items = [];
    return this.items;
  }

  /**
   * getShippingPrices
   */
  public getShippingPrices() {
    return this.httpClient.get("/assets/shipping.json");
  }
}
