import { Directive, Renderer2, ElementRef, OnInit, HostListener, HostBinding, Input } from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]"
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = '#eaeaea';
  @Input() highlightColor: string = "#a4a4a4";
  @HostBinding('style.backgroundColor') backgroundColor: string;
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    /**
     * The Renderer Which is a better approach of accessing the DOM.
     * Now why is it a better approach?
     * Angular is not limited to running in the browser here,
     * it for exmaple also works with service workers and these are environments where you might not have access to the DOM.
     * So if you try to change the DOM as you did here in basic highlight by directly accessing the native element and the style of this element,
     * you might get an error in some circumastances.
     *
     */
    // this.renderer.setStyle(this.elRef.nativeElement, "background-color", "#eaeaea");
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', '#a4a4a4');
    // this.backgroundColor = '#a4a4a4';
    this.backgroundColor = this.highlightColor;
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', '#eaeaea');
    // this.backgroundColor = 'transparent';
    this.backgroundColor = this.defaultColor;
  }
}
