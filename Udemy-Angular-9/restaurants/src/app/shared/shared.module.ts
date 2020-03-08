import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicHighlightDirective } from './directive/basic-highlight.directive';
import { BetterHighlightDirective } from './directive/better-highlight.directive';



@NgModule({
  declarations: [BasicHighlightDirective, BetterHighlightDirective],
  imports: [
    CommonModule
  ],
  exports: [
    BasicHighlightDirective,
    BetterHighlightDirective
  ]
})
export class SharedModule { }
