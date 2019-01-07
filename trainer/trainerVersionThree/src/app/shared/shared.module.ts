import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderByPipe } from "./order-by.pipe";
import { SearchPipe } from "./search.pipe";

@NgModule({
  declarations: [
    OrderByPipe,
    SearchPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OrderByPipe,
    SearchPipe
  ]
})
export class SharedModule {}
