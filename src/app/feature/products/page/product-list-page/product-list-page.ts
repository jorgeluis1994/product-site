import { Component, inject } from '@angular/core';
import { ProductTable } from "../../components/product-table/product-table";
import { ProductsFacade } from '../../facade/products.facade';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list-page',
  imports: [
    CommonModule,
    RouterLink
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

}
