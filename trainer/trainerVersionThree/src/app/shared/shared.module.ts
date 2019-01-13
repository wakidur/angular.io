import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderByPipe } from "./order-by.pipe";
import { SearchPipe } from "./search.pipe";
import { MyAudioDirective } from "./my-audio.directive";
import { WorkoutAudioDirective } from "./workout-audio.directive";

@NgModule({
  declarations: [
    OrderByPipe,
    SearchPipe,
    MyAudioDirective,
    WorkoutAudioDirective
  ],
  imports: [CommonModule],
  exports: [
    OrderByPipe,
    SearchPipe,
    MyAudioDirective,
    WorkoutAudioDirective
    ]
})
export class SharedModule {}
