import { Component, inject } from '@angular/core';
import { ProductTable } from "../../components/product-table/product-table";
import { ProductsFacade } from '../../facade/products.facade';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DialogFormService } from '../../../../shared/services/dialog.service';
import { DialogForm } from "../../../../shared/dialog/dialog-form/dialog-form";
import { ProductFormPage } from '../product-form-page/product-form-page';
import { ProductForm } from "../../components/product-form/product-form";
import { ProductFormFacade } from '../../facade/product-form.facade';

@Component({
  selector: 'app-product-list-page',
  imports: [
    CommonModule,
    DialogForm,
    ProductFormPage
  ],
  // providers: [ProductsFacade],
  templateUrl: './product-list-page.html',
  styleUrl: './product-list-page.scss',
})
export class ProductListPage {


  public readonly facade = inject(ProductsFacade);
  public readonly dialogForm = inject(DialogFormService);
  private productFormFacade = inject(ProductFormFacade);

  public activeMenuId: string | null = null;

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

  editForm(product: any, event: MouseEvent) {
    // Evita que el evento se propague si tienes otros clics en la fila
    event.stopPropagation();
    debugger

    // Paso CLAVE: Carga los datos del producto en el formulario y activa el modo edición
    this.productFormFacade.setEditMode(product);

    // Ahora sí, abre el diálogo
    this.dialogForm.open();
  }

}
