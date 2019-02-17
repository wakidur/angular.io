import { ElementRef } from "@angular/core";

import { MyAudioDirective } from "./my-audio.directive";



describe("MyAudioDirective", () => {
  const elementRef = new ElementRef(null);
  it("should create an instance", () => {
    const directive = new MyAudioDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
