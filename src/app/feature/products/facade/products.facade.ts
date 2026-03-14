import { Injectable, inject, signal, computed } from '@angular/core';
import { finalize, firstValueFrom } from 'rxjs';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { AbstractControl, ValidationErrors } from '@angular/forms';

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
    this._loading.set(true);

    this.productService
      .getProducts()
      .pipe(
        finalize(() => {
          this._loading.set(false);
        }),
      )
      .subscribe({
        next: (response) => {
          this._products.set(response.data);
        },
        error: (err) => {
          console.error('--- [FACHADA] ERROR: No se pudo conectar al Back:', err);
        },
      });
  }

  // Buscar (Actualiza el término para el computed)
  setSearchTerm(term: string) {
    this._searchTerm.set(term);
  }

  // Crear Producto
  addProduct(product: Product) {
    this.productService.createProduct(product).subscribe(() => {
      this._products.update((prev) => [...prev, product]);
    });
  }

  // Actualizar Producto
  updateProduct(id: string, product: Omit<Product, 'id'>) {
    this.productService.updateProduct(id, product).subscribe((updated) => {
      this._products.update((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updated.data } : p)),
      );
    });
  }

  // Eliminar Producto
  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(() => {
      this._products.update((prev) => prev.filter((p) => p.id !== id));
    });
  }

  // Validar ID (Async Validator)
  checkIdExists() {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      if (!control.value) return null;

      try {

        const exists = await firstValueFrom(this.productService.verifyId(control.value));
        return exists ? { idExists: true } : null;
      } catch (error) {

        return null;
      }
    };
  }

}
