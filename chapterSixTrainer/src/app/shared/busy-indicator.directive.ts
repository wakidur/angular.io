import { Directive, HostBinding, ElementRef, Renderer, OnDestroy, AfterViewInit  } from "@angular/core";
import { NgModel } from "@angular/forms";

@Directive({
  selector: "[appBusyIndicator][ngModel]"
})
export class BusyIndicatorDirective implements  AfterViewInit , OnDestroy {
  // constructor(private model: NgModel) {}
  // Opthinal decorator,
  constructor(
    private model: NgModel,
    private element: ElementRef,
    private renderer: Renderer
  ) {}

  private subscriptions: Array<any> = [];

  ngAfterViewInit() {
    this.subscriptions.push(
      this.model.control.statusChanges.subscribe((status: any) => {
        if (this.model.control.pending) {
          this.renderer.setElementStyle(
            this.element.nativeElement,
            "border-width",
            "3px"
          );
          this.renderer.setElementStyle(
            this.element.nativeElement,
            "border-color",
            "red"
          );
        } else {
          this.renderer.setElementStyle(
            this.element.nativeElement,
            "border-width",
            null
          );
          this.renderer.setElementStyle(
            this.element.nativeElement,
            "border-color",
            null
          );
        }
      })
    );
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
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

  // @HostBinding("readOnly") get busy() {
  //   return this.isbusy;
  // }

  // @HostBinding("attr.disable") get canEdit(): string {
  //   return !this.isAdmin? "disable" : null
  // }
}
