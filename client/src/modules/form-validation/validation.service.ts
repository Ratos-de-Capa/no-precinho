import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  matchPassword(password: string, confirmPassword: string): ValidatorFn {
    const validationError = { passwordMismatch: true };

    return (formGroup: FormGroup): ValidationErrors | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (passwordControl.value && confirmPasswordControl.value) {
        const isMatchedPassword = passwordControl.value === confirmPasswordControl.value;

        if (!isMatchedPassword) {
          confirmPasswordControl.setErrors(validationError);
        
          return validationError;
        }
        
        return null;
      }

      return null;
    }
  }
}
