/**
 * Frameworks dependency
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

/**
 * Application dependency
 */
import { OrderByPipe } from "./order-by.pipe";
import { SearchPipe } from "./search.pipe";
import { MyAudioDirective } from "./my-audio.directive";
import { WorkoutAudioDirective } from "./workout-audio.directive";
import { SecondsToTimePipe } from "./seconds-to-time.pipe";
import { AlphabetNumbersValidatorDirective } from "./alphabet-numbers-validator.directive";
import { RemoteValidatorDirective } from "./remote-validator.directive";
import { BusyIndicatorDirective } from "./busy-indicator.directive";
import { AjaxButtonComponent } from "./ajax-button/ajax-button.component";
import { TooltipDirective } from "./tooltip.directive";
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    OrderByPipe,
    SearchPipe,
    MyAudioDirective,
    WorkoutAudioDirective,
    SecondsToTimePipe,
    AlphabetNumbersValidatorDirective,
    RemoteValidatorDirective,
    BusyIndicatorDirective,
    AjaxButtonComponent,
    TooltipDirective,
    FilterPipe
  ],
  imports: [CommonModule, HttpClientModule],
  exports: [
    OrderByPipe,
    SearchPipe,
    MyAudioDirective,
    WorkoutAudioDirective,
    AlphabetNumbersValidatorDirective,
    SecondsToTimePipe,
    RemoteValidatorDirective,
    BusyIndicatorDirective,
    AjaxButtonComponent,
    TooltipDirective,
    FilterPipe
  ]
})
export class SharedModule {}
