import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nonZeroValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return value === 0 || value === "0" ? { nonZero: true } : null; // Return an error if value is zero
  };
}