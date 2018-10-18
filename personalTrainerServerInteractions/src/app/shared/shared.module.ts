import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OrderByPipe } from "./order-by.pipe";
import { SearchPipe } from "./search.pipe";
import { SecondsToTimePipe } from "./seconds-to-time.pipe";
import { TrainingInstructionsAudioDirective } from "./training-instructions-audio.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [
    OrderByPipe,
    SearchPipe,
    SecondsToTimePipe,
    TrainingInstructionsAudioDirective
  ],
  exports: [
    OrderByPipe,
    SearchPipe,
    SecondsToTimePipe,
    TrainingInstructionsAudioDirective
  ]
})
export class SharedModule {}
