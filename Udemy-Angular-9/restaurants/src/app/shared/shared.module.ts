import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicHighlightDirective } from './directive/basic-highlight.directive';
import { BetterHighlightDirective } from './directive/better-highlight.directive';
import { UnlessDirective } from './directive/unless.directive';



@NgModule({
  declarations: [BasicHighlightDirective, BetterHighlightDirective, UnlessDirective],
  imports: [
    CommonModule
  ],
  exports: [
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective
  ]
})
export class SharedModule { }
