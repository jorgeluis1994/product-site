import { inject, Injectable, signal } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ProductsFacade } from './products.facade';
import { ProductValidators } from '../utils/product-form.validators';
import { Product } from '../models/product-form.model';

@Injectable({ providedIn: 'root' })
export class ProductFormFacade {
  
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly productsFacade = inject(ProductsFacade);

  private readonly _isEditMode = signal(false);
  readonly isEditMode = this._isEditMode.asReadonly();

  readonly form = this.fb.group({
    id: ['', {
      validators: [Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(10)],
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

  setEditMode(product: any) {
    this._isEditMode.set(true);

    const cleanDate = (dateStr: any) => {
      if (!dateStr) return '';
      return dateStr.split('T')[0];
    };

    this.form.patchValue({
      id: product.id,
      nombre: product.name,
      descripcion: product.description,
      logo: product.logo,
      fecha_liberacion: cleanDate(product.date_release),
      fecha_revision: cleanDate(product.date_revision)
    });

    this.form.controls.id.disable();
  }



  submit() {
    if (this.form.invalid || this.form.pending) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.getRawValue();
    const payload: Product = {
      id: values.id,
      name: values.nombre,
      description: values.descripcion,
      logo: values.logo,
      date_release: values.fecha_liberacion,
      date_revision: values.fecha_revision
    };

    if (this._isEditMode()) {
      this.productsFacade.updateProduct(payload.id!, payload);
    } else {
      this.productsFacade.addProduct(payload);
    }

    this.resetForm();
  }


  resetForm() {
    this._isEditMode.set(false);
    this.form.controls.id.enable();
    this.form.reset();
  }
}

