import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderByPipe } from "./order-by.pipe";
import { SearchPipe } from "./search.pipe";
import { WrapAudioDirective } from "./wrap-audio.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [OrderByPipe, SearchPipe, WrapAudioDirective],
  exports: [OrderByPipe, SearchPipe, WrapAudioDirective]
})
export class SharedModule {}
