import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductListComponent } from "./shop/product-list/product-list.component";
import { ProductDetailsComponent } from "./shop/product-details/product-details.component";
import { CartComponent } from "./shop/cart/cart.component";
const routes: Routes = [
  {
    path: "",
    component: ProductListComponent
  },
  {
    path: "products/:productId",
    component: ProductDetailsComponent
  },
  {
    path: "cart",
    component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
