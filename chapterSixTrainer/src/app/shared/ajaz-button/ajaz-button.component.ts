import { Component, OnInit, Input, HostListener } from "@angular/core";
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
