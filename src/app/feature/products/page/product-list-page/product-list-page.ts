import { Component, inject, signal } from '@angular/core';
import { ProductsFacade } from '../../facade/products.facade';
import { CommonModule } from '@angular/common';
import { DialogFormService } from '../../../../shared/services/dialog.service';
import { DialogForm } from "../../../../shared/dialog/dialog-form/dialog-form";
import { ProductFormPage } from '../product-form-page/product-form-page';
import { ProductFormFacade } from '../../facade/product-form.facade';
import { Product } from '../../../../core/models/product.model';
import { DialogConfirmService } from '../../../../shared/services/dialog-confirm.service';
import { DialogConfirm } from "../../../../shared/dialog/dialog-confirm/dialog-confirm";

@Component({
  selector: 'app-product-list-page',
  imports: [
    CommonModule,
    DialogForm,
    ProductFormPage,
    DialogConfirm
  ],
  templateUrl: './product-list-page.html',
  styleUrl: './product-list-page.scss',
})
export class ProductListPage {
  public readonly facade = inject(ProductsFacade);
  public readonly dialogForm = inject(DialogFormService);
  private productFormFacade = inject(ProductFormFacade);
  public readonly confirmService = inject(DialogConfirmService);

  public activeMenuId: string | null = null;

  public productToDelete: Product | null = null;

  ngOnInit(): void {
    this.facade.loadProducts();
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.facade.setSearchTerm(input.value);
  }

  openForm() {
    this.productFormFacade.resetForm(); 
    this.dialogForm.open();
  }

  editForm(product: Product, event: MouseEvent) {
    event.stopPropagation();
    this.productFormFacade.setEditMode(product);
    this.dialogForm.open();
    this.activeMenuId = null; 
  }

  toggleMenu(id: string, event: MouseEvent): void {
    event.stopPropagation();
    this.activeMenuId = (this.activeMenuId === id) ? null : id;
  }


  openDeleteConfirm(product: Product) {
    this.productToDelete = product;
    this.confirmService.open();
    this.activeMenuId = null; 
  }


  handleDelete() {
    if (this.productToDelete) {
      this.facade.deleteProduct(this.productToDelete.id);
      this.confirmService.close();
      this.productToDelete = null;
    }
  }
}

