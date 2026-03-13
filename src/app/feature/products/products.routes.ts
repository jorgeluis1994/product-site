import { Routes } from '@angular/router';
import { ProductsFacade } from './facade/products.facade'; // Importa tu fachada

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    // 🚀 Proveemos la fachada para todas las rutas hijas aquí
    providers: [ProductsFacade],
    children: [
      {
        path: '',
        loadComponent: () => import('./page/product-list-page/product-list-page')
          .then((m) => m.ProductListPage),
      },
      {
        path: 'add',
        loadComponent: () => import('./page/product-form-page/product-form-page')
          .then((m) => m.ProductFormPage),
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./page/product-form-page/product-form-page')
          .then((m) => m.ProductFormPage),
      }
    ]
  }
];
