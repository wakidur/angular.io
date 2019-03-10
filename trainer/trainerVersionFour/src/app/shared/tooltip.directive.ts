import { Directive, ElementRef } from "@angular/core";

declare var jQuery: any;

@Directive({
  selector: "[appTooltip]"
})
export class TooltipDirective {
  constructor(private elementRef: ElementRef) {
    jQuery(elementRef.nativeElement).tooltip();
  }
}
