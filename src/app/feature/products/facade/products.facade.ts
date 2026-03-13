import { Injectable, inject, signal, computed } from '@angular/core';
import { finalize, firstValueFrom } from 'rxjs';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';

@Injectable()
export class ProductsFacade {
  private readonly productService = inject(ProductService);

  // ESTADO (Signals)
  private readonly _products = signal<Product[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _searchTerm = signal<string>('');

  // SELECTORES (Para los componentes)
  readonly filteredProducts = computed(() => {
    const term = this._searchTerm().toLowerCase();
    return this._products().filter(
      (p) => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term),
    );
  });

  readonly isLoading = this._loading.asReadonly();

  // ACCIONES
  loadProducts() {
    console.log('--- [FACHADA] 1. Iniciando carga de productos');
    this._loading.set(true);

    this.productService
      .getProducts()
      .pipe(
        finalize(() => {
          console.log('--- [FACHADA] 3. Finalize: Carga terminada (Loading = false)');
          this._loading.set(false);
        }),
      )
      .subscribe({
        next: (response) => {
          console.log('--- [FACHADA] 2. Éxito: Datos recibidos del Back:', response);
          this._products.set(response.data);
        },
        error: (err) => {
          console.error('--- [FACHADA] ERROR: No se pudo conectar al Back:', err);
        },
      });
  }

  // 2. Buscar (Actualiza el término para el computed)
  setSearchTerm(term: string) {
    this._searchTerm.set(term);
  }

  // 3. Crear Producto
  addProduct(product: Product) {
    this.productService.createProduct(product).subscribe(() => {
      this._products.update((prev) => [...prev, product]);
    });
  }

  // 4. Actualizar Producto
  updateProduct(id: string, product: Omit<Product, 'id'>) {
    this.productService.updateProduct(id, product).subscribe((updated) => {
      this._products.update((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updated.data } : p)),
      );
    });
  }

  // 5. Eliminar Producto
  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(() => {
      this._products.update((prev) => prev.filter((p) => p.id !== id));
    });
  }

  // 6. Validar ID (Útil para Validadores Asíncronos en el formulario)
  async checkIdExists(id: string): Promise<boolean> {
    return await firstValueFrom(this.productService.verifyId(id));
  }
}
