import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nonZeroValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = control.value != 0;
    return isValid ? null : { nonZero: true };
  };
}