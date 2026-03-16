import { Routes } from '@angular/router';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    providers: [],
    children: [
      {
        path: '',
        canDeactivate: [unsavedChangesGuard],
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
