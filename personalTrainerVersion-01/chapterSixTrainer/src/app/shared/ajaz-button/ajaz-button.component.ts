import { Component, OnInit, Input, HostListener, ContentChild, ElementRef } from "@angular/core";
import { createHostBinding } from "@angular/compiler/src/core";

@Component({
  selector: "app-ajaz-button",
  templateUrl: "./ajaz-button.component.html",
  styles: []
})
export class AjazButtonComponent implements OnInit {
  busy: boolean = null;
  @Input() execute: any;
  @Input() parameter: any;

  @ContentChild("spinner") spinner: ElementRef;
  @ContentChild("text") text: ElementRef;

  constructor() {}

  @HostListener("click", ["$event"])

  onclick(event: any) {
    const result: any = this.execute(this.parameter);
    if (result instanceof Promise) {
      this.busy = true;
      result.then(
        () => { this.busy = null; },
        (error: any) => {this.busy = null; }
      );
    }
  }
  ngOnInit() {}
}
