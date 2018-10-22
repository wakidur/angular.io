import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderByPipe } from "./order-by.pipe";
import { SearchPipe } from "./search.pipe";
import { SecondsToTimePipe } from "./seconds-to-time.pipe";
import { TrainingInstructionsAudioDirective } from "./training-instructions-audio.directive";
import { MyAudioDirective } from "./my-audio.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [
    OrderByPipe,
    SearchPipe,
    SecondsToTimePipe,
    TrainingInstructionsAudioDirective,
    MyAudioDirective
  ],
  exports: [
    OrderByPipe,
    SearchPipe,
    SecondsToTimePipe,
    TrainingInstructionsAudioDirective,
    MyAudioDirective
  ]
})
export class SharedModule {}
