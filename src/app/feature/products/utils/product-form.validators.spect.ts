import { FormControl, FormGroup } from '@angular/forms';
import { ProductValidators } from './product-form.validators';
import { describe, it } from 'node:test';

describe('ProductValidators', () => {

  it('debe validar que la fecha de revisión sea exactamente un año posterior a la de liberación', () => {
    // Escenario 1: Fecha correcta (Exactamente 1 año después)
    const formValido = new FormGroup({
      date_release: new FormControl('2024-01-01'),
      date_revision: new FormControl('2025-01-01')
    });

    // Escenario 2: Fecha incorrecta (Mismo año)
    const formInvalido = new FormGroup({
      date_release: new FormControl('2024-01-01'),
      date_revision: new FormControl('2024-01-01')
    });

   
  });

});
