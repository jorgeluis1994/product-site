import { Component, inject } from '@angular/core';
import { ProductTable } from "../../components/product-table/product-table";
import { ProductsFacade } from '../../facade/products.facade';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DialogFormService } from '../../../../shared/services/dialog.service';
import { DialogForm } from "../../../../shared/dialog/dialog-form/dialog-form";
import { ProductFormPage } from '../product-form-page/product-form-page';
import { ProductForm } from "../../components/product-form/product-form";

@Component({
  selector: 'app-product-list-page',
  imports: [
    CommonModule,
    DialogForm,
    ProductFormPage
],
  providers: [ProductsFacade],
  templateUrl: './product-list-page.html',
  styleUrl: './product-list-page.scss',
})
export class ProductListPage {

  public readonly facade = inject(ProductsFacade);
  public readonly dialogForm = inject(DialogFormService);

  ngOnInit(): void {
    this.facade.loadProducts();

    
  }
   onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.facade.setSearchTerm(input.value);
  }

  openForm() {
    this.dialogForm.open();
  }

}
