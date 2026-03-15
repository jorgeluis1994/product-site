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

  // addProduct corregido
  addProduct(product: Product): void {
    this._loading.set(true);
    this.productService.createProduct(product)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (response) => {
          const productFromApi = response.data;

          this._products.update(prev => [...prev, productFromApi]);
          this.loadProducts(); 

          this.notificationService.show('Producto agregado exitosamente', 'success');
        },
        error: (err) => {
          const errorMsg = err.error?.message || 'Error al agregar producto';
          this.notificationService.show(errorMsg, 'error');
        }
      });
  }

  // updateProduct corregido
  updateProduct(id: string, product: Product): void {
    this._loading.set(true);
    this.productService.updateProduct(id, product)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (response) => {
          this._products.update(prev =>
            // El map crea un nuevo array, notificando a la tabla del cambio
            prev.map(p => p.id === id ? { ...p, ...response.data } : p)
          );
          this.loadProducts(); 
          this.notificationService.show('Producto actualizado correctamente', 'success');
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
