import { Directive, HostBinding  } from "@angular/core";
import { NgModel } from "@angular/forms";

@Directive({
  selector: "[appBusyIndicator][ngModel]"
})
export class BusyIndicatorDirective  {
  // constructor(private model: NgModel) {}
  // Opthinal decorator,
  constructor(
    private model: NgModel
  ) {}

  private get validating(): boolean {
    return this.model.control != null && this.model.control.pending;
  }

  @HostBinding("style.borderWidth")
  get controlBorderWidth(): string {
    return this.validating ? "3px" : null;
  }

  @HostBinding("style.borderColor")
  get controlBorderColor(): string {
    return this.validating ? "gray" : null;
  }
}
