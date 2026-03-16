import { Injectable, inject, signal, computed } from '@angular/core';
import { finalize, firstValueFrom, Observable, of } from 'rxjs';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Product } from '../../../core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsFacade {

  private readonly productService = inject(ProductService);
  private readonly notificationService = inject(NotificationService);
  private readonly _products = signal<Product[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _searchTerm = signal<string>('');

  readonly isLoading = this._loading.asReadonly();
  readonly totalProducts = computed(() => this.filteredProducts().length);

  readonly filteredProducts = computed(() => {
    const term = this._searchTerm().toLowerCase().trim();
    const products = this._products();

    if (!term) return products;

    return products.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  });


  loadProducts(): void {
    this._loading.set(true);

    this.productService.getProducts()
      .pipe(
        finalize(() => this._loading.set(false))
      )
      .subscribe({
        next: (response) => {
          this._products.set(response.data);
        },
        error: () => {
          this._products.set([]);
        }
      });
  }

  setSearchTerm(term: string): void {
    this._searchTerm.set(term);
  }
  addProduct(product: Product, onSuccess?: () => void): void {
    this._loading.set(true);
    this.productService.createProduct(product)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (response) => {

          this.loadProducts();
          this.notificationService.show('Producto agregado exitosamente', 'success');
          onSuccess?.();
        },
        error: (err) => {
          console.log('error:', err);
          this.notificationService.show(err.error?.message || 'Error', 'error');
        }
      });
  }

  updateProduct(id: string, product: Product, onSuccess?: () => void): void {
    this._loading.set(true);
    this.productService.updateProduct(id, product)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (response) => {
          this._products.update(prev =>
            prev.map(p => p.id === id ? { ...p, ...response.data } : p)
          );
          this.notificationService.show('Producto actualizado correctamente', 'success');
          onSuccess?.(); // ← avisa cuando terminó
        },
        error: (err) => {
          const errorMsg = err.error?.message || 'Error al actualizar producto';
          this.notificationService.show(errorMsg, 'error');
        }
      });
  }


  /**
   * Eliminar un producto
   */
  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this._products.update(prev => prev.filter(p => p.id !== id));
        this.notificationService.show('Producto eliminado con éxito', 'success');
      }
    });
  }

  checkIdExists = (): AsyncValidatorFn => {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      const value = control.value;

      if (!value || value.length < 3) return null;

      try {

        const isRegistered = await firstValueFrom(this.productService.verifyId(value));

        return isRegistered ? { idExists: true } : null;
      } catch (error) {
        return null;
      }
    };
  };
}
