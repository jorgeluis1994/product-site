// src/app/features/products/guards/unsaved-changes.guard.ts
import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { ProductFormFacade } from '../facade/product-form.facade';
import { DialogFormService } from '../../../shared/services/dialog.service';

export const unsavedChangesGuard: CanDeactivateFn<unknown> = () => {
  const formFacade = inject(ProductFormFacade);
  const dialogService = inject(DialogFormService);

  if (!dialogService.isOpen()) return true;

  if (formFacade.form.pristine) return true;

  
  return confirm('Tienes cambios sin guardar. ¿Seguro que quieres salir?');
};