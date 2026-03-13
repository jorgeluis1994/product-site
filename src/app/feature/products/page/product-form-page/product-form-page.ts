import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // <--- OBLIGATORIO
import { ProductFormFacade } from '../../facade/product-form.facade';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-form-page',
  standalone: true, // Asegúrate de que sea standalone
  imports: [JsonPipe,ReactiveFormsModule], // <--- Traes las herramientas de formularios
  providers: [ProductFormFacade],  // <--- Provees la fachada aquí para que muera al salir de la página
  templateUrl: './product-form-page.html',
  styleUrl: './product-form-page.scss',
})
export class ProductFormPage {
  // Solo inyectas. La "magia" ya está dentro de facade.form
  protected readonly facade = inject(ProductFormFacade);
}
