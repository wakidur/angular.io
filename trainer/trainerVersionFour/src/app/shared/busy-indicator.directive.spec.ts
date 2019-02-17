import { FormsModule, NgModel } from "@angular/forms";

import { BusyIndicatorDirective } from './busy-indicator.directive';

describe('BusyIndicatorDirective', () => {
  const ngModel = new NgModel(null, null, null, null);
  it('should create an instance', () => {
    const directive = new BusyIndicatorDirective(ngModel);
    expect(directive).toBeTruthy();
  });
});
