import { Injectable, inject, signal, computed } from '@angular/core';
import { finalize, firstValueFrom, Observable, of } from 'rxjs';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Product } from '../../../core/models/product.model';

@Injectable({
  providedIn: 'root' // Asegura que sea un Singleton
})
export class ProductsFacade {
  
  private readonly productService = inject(ProductService);
  private readonly notificationService = inject(NotificationService);

  // --- ESTADO (Signals) ---
  private readonly _products = signal<Product[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _searchTerm = signal<string>('');

  readonly filteredProducts = computed(() => {
    const term = this._searchTerm().toLowerCase().trim();
    const products = this._products();
    
    if (!term) return products;

    return products.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.description.toLowerCase().includes(term)
    );
  });

  readonly isLoading = this._loading.asReadonly();
  readonly totalProducts = computed(() => this.filteredProducts().length);

  // --- ACCIONES ---

  /**
   * Carga inicial de productos desde la API
   */
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

  /**
   * Actualiza el término de búsqueda (F2)
   */
  setSearchTerm(term: string): void {
    this._searchTerm.set(term);
  }

  /**
   * Crear un nuevo producto (F4)
   */
  addProduct(product: Product): void {
    this._loading.set(true);
    this.productService.createProduct(product)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: () => {
          // Actualización inmutable del estado
          this._products.update(prev => [...prev, product]);
          this.notificationService.show('Producto agregado exitosamente', 'success');
        }
      });
  }

  /**
   * Actualizar un producto existente (F5)
   */
  updateProduct(id: string, product: Omit<Product, 'id'>): void {
    this._loading.set(true);
    this.productService.updateProduct(id, product)
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (response) => {
          this._products.update(prev => 
            prev.map(p => p.id === id ? { ...p, ...response.data } : p)
          );
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



  /**
   * Validador para verificar si el ID ya existe 
   * Se usa Arrow Function para no perder el contexto de 'this'
   */
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
