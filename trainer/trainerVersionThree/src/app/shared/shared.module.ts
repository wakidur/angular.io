import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderByPipe } from "./order-by.pipe";
import { SearchPipe } from "./search.pipe";
import { MyAudioDirective } from "./my-audio.directive";
import { WorkoutAudioDirective } from "./workout-audio.directive";
import { SecondsToTimePipe } from "./seconds-to-time.pipe";

@NgModule({
  declarations: [
    OrderByPipe,
    SearchPipe,
    MyAudioDirective,
    WorkoutAudioDirective,
    SecondsToTimePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OrderByPipe,
    SearchPipe,
    MyAudioDirective,
    WorkoutAudioDirective,
    SecondsToTimePipe
  ]
})
export class SharedModule {}
