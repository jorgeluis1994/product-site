import { inject, Injectable, signal } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ProductsFacade } from './products.facade';
import { ProductValidators } from '../utils/product-form.validators';

@Injectable()
export class ProductFormFacade {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly productsFacade = inject(ProductsFacade);

  readonly form = this.fb.group({
    id: ['', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ],
      asyncValidators: [this.productsFacade.checkIdExists()],
      updateOn: 'blur'
    }],
    name: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]],
    description: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200)
    ]],
    logo: ['', [Validators.required]],
    fechaLiberacion: ['', [
      Validators.required,
      ProductValidators.atLeastToday()
    ]],
    fechaRevision: [{ value: '', disabled: true }, [Validators.required]]
  });



  private readonly _isSaving = signal(false);
  readonly isSaving = this._isSaving.asReadonly();



  /**
   * Valida el formulario y marca los errores visualmente si es necesario.
   */
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this._isSaving.set(true);


    setTimeout(() => {
      this.form.reset();
      this._isSaving.set(false);
    }, 500);
  }

  /**
   * Limpia el formulario a sus valores iniciales
   */
  resetForm() {
    this.form.reset();
  }
}
