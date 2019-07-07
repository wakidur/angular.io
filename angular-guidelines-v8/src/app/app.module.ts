import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { ProductListComponent } from "./shop/product-list/product-list.component";
import { TopBarComponent } from "./shop/top-bar/top-bar.component";
import { ProductDetailsComponent } from "./shop/product-details/product-details.component";
import { ShopServiceModule } from "./shop/service/shop-service.module";
import { ProductAlertsComponent } from "./shop/product-alerts/product-alerts.component";
import { CartComponent } from "./shop/cart/cart.component";
import { ShippingComponent } from './shop/shipping/shipping.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    TopBarComponent,
    ProductDetailsComponent,
    ProductAlertsComponent,
    CartComponent,
    ShippingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShopServiceModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
