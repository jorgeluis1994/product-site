import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./page/product-list-page/product-list-page')
      .then((m) => m.ProductListPage),
  },
  {
    path: 'add',
    // F4: Agregar Producto
    loadComponent: () => import('./page/product-form-page/product-form-page')
      .then((m) => m.ProductFormPage),
  },
  {
    path: 'edit/:id',
    // F5: Editar Producto (Reutilizamos el mismo componente de formulario)
    loadComponent: () => import('./page/product-form-page/product-form-page')
      .then((m) => m.ProductFormPage),
  }
];
