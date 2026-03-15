import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ProductValidators {
  
  // Validar que la fecha sea mayor o igual a hoy
  static atLeastToday(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      
      if (!control.value) return null;
      
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); 

      return selectedDate >= today ? null : { invalidDate: true };
    };
  }

}
