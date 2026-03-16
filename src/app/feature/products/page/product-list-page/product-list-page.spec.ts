import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListPage } from './product-list-page';
import { of } from 'rxjs';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductService } from '../../../../core/services/product.service';

describe('ProductListPage', () => {
  let component: ProductListPage;
  let fixture: ComponentFixture<ProductListPage>;

  // 1. Mock con Vitest (vi.fn)
  const mockProductService = {
    getProducts: vi.fn().mockReturnValue(of([
      { id: 1, name: 'Laptop', price: 999 },
      { id: 2, name: 'Mouse', price: 25 }
    ]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // En Angular moderno, si es Standalone va en imports
      imports: [ProductListPage], 
      providers: [
        { provide: ProductService, useValue: mockProductService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Vital para disparar el renderizado inicial
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe llamar al servicio de productos al cargar', () => {
    expect(mockProductService.getProducts).toHaveBeenCalled();
  });

  it('debe renderizar la lista de productos en el HTML', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Asumiendo que usas una clase o tag para los productos
    const items = compiled.querySelectorAll('.product-card'); 
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('Laptop');
  });
});
