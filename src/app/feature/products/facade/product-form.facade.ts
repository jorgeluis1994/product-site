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
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
      asyncValidators: [this.productsFacade.checkIdExists()],
      updateOn: 'blur'
    }],
    nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', [Validators.required]],
    fecha_liberacion: ['', [Validators.required, ProductValidators.atLeastToday()]],
    fecha_revision: [{ value: '', disabled: true }, [Validators.required]]
  });

  constructor() {
    this.setupDateSubscription();
  }

  private setupDateSubscription() {
    this.form.controls.fecha_liberacion.valueChanges.subscribe(value => {
      if (value) {
        const date = new Date(value);
        date.setFullYear(date.getFullYear() + 1);
        const [formattedDate] = date.toISOString().split('T');
        this.form.controls.fecha_revision.setValue(formattedDate);
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Para el backend, recuerda mapear estos nombres a los que pide el API (id, name, etc)
    console.log(this.form.getRawValue());
  }

  resetForm() {
    this.form.reset();
  }
}

