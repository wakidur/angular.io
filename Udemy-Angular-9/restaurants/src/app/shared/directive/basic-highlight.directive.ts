import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: "[appBasicHighlight]"
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    /**
     * Accessing elements directly like this is not a good practice, you should use a different tool.
     * Angular actually is also able to render your templates without a DOM and then these properties might not be available.
     *
     */
    this.elementRef.nativeElement.style.backgroundColor = "green";
  }
}
