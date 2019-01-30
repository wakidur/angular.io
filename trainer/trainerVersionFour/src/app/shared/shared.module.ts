import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrderByPipe } from "./order-by.pipe";
import { SearchPipe } from "./search.pipe";
import { MyAudioDirective } from "./my-audio.directive";
import { WorkoutAudioDirective } from "./workout-audio.directive";
import { SecondsToTimePipe } from "./seconds-to-time.pipe";
import { AlphabetNumbersValidatorDirective } from "./alphabet-numbers-validator.directive";

@NgModule({
  declarations: [
    OrderByPipe,
    SearchPipe,
    MyAudioDirective,
    WorkoutAudioDirective,
    SecondsToTimePipe,
    AlphabetNumbersValidatorDirective
  ],
  imports: [CommonModule],
  exports: [
    OrderByPipe,
    SearchPipe,
    MyAudioDirective,
    WorkoutAudioDirective,
    AlphabetNumbersValidatorDirective,
    SecondsToTimePipe
  ]
})
export class SharedModule {}
