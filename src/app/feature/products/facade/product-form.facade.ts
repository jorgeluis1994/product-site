import { inject, Injectable, signal } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ProductsFacade } from './products.facade';

@Injectable()
export class ProductFormFacade {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly productsFacade = inject(ProductsFacade);

  // 1. DEFINICIÓN DEL FORMULARIO
  // Usamos NonNullable para que al resetear vuelva a '' y no a null
  readonly form = this.fb.group({
    id: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10)
    ]],
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
    fechaLiberacion: ['', [Validators.required]],
    // Fecha de creación automática (YYYY-MM-DD)
    fechaCreacion: [new Date().toISOString().split('T')[0], [Validators.required]]
  });

  // 2. ESTADO DE UI (Signals)
  private readonly _isSaving = signal(false);
  readonly isSaving = this._isSaving.asReadonly();

  // 3. ACCIONES LÓGICAS

  /**
   * Valida el formulario y marca los errores visualmente si es necesario.
   */
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('--- [FORM] Formulario inválido, revisa los campos.');
      return;
    }

    // Aquí solo activamos el estado de carga y reseteamos, como pediste
    this._isSaving.set(true);

    // Simulamos un pequeño delay o proceso y reseteamos
    setTimeout(() => {
      this.form.reset();
      this._isSaving.set(false);
      console.log('--- [FORM] Formulario procesado y reseteado.');
    }, 500);
  }

  /**
   * Limpia el formulario a sus valores iniciales
   */
  resetForm() {
    this.form.reset();
  }
}
