import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    // Esto carga el archivo de rutas completo de forma perezosa
    loadChildren: () => import('./feature/products/products.routes')
      .then((m) => m.PRODUCT_ROUTES),
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  }
];
