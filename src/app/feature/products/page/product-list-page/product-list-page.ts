import { Component, inject } from '@angular/core';
import { ProductTable } from "../../components/product-table/product-table";
import { ProductsFacade } from '../../facade/products.facade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list-page',
  imports: [
    CommonModule
  ],
  providers: [ProductsFacade],
  templateUrl: './product-list-page.html',
  styleUrl: './product-list-page.scss',
})
export class ProductListPage {

  public readonly facade = inject(ProductsFacade);


  ngOnInit(): void {

    this.facade.loadProducts();
  }

   onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.facade.setSearchTerm(input.value);
  }



   mockProducts = [
    {
      id: 'trj-crd',
      name: 'Tarjeta de Crédito',
      description: 'Tarjeta de consumo bajo modalidad de crédito',
      logo: '',
      date_release: '2025-01-01',
      date_revision: '2026-01-01'
    },
    {
      id: 'sav-acc',
      name: 'Cuenta de Ahorros',
      description: 'Cuenta para ahorrar con intereses altos',
      logo: '',
      date_release: '2025-02-15',
      date_revision: '2026-02-15'
    }
  ];
}
