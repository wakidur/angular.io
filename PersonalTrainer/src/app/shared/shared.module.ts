import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderByPipe } from "./order-by.pipe";
import { SearchPipe } from "./search.pipe";
import { WrapAudioDirective } from "./wrap-audio.directive";
import { SecondsToTimePipe } from "./seconds-to-time.pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [
    OrderByPipe,
    SearchPipe,
    WrapAudioDirective,
    SecondsToTimePipe
  ],
  exports: [OrderByPipe, SearchPipe, WrapAudioDirective, SecondsToTimePipe]
})
export class SharedModule {}
