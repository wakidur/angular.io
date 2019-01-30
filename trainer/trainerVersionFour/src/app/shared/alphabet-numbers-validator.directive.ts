import { Directive, Input } from "@angular/core";
import { Validator, NG_VALIDATORS, FormControl } from "@angular/forms";

@Directive({
  selector: "[appAlphabetNumbersValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: AlphabetNumbersValidatorDirective,
      multi: true
    }
  ]
})
export class AlphabetNumbersValidatorDirective implements Validator {
  @Input("appAlphabetNumbersValidator") invalidAlphaNumeric: string;
  validate(control: FormControl): { [key: string]: boolean } {
    if (control.value.length && !control.value.match(/^[a-z0-9]+$/i)) {
      return { invalidAlphaNumeric: true };
    }
    return null;
  }
}
