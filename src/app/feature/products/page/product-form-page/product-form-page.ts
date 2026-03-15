import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // <--- OBLIGATORIO
import { ProductFormFacade } from '../../facade/product-form.facade';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-form-page',
  standalone: true, 
  imports: [ReactiveFormsModule], 
  providers: [],  
  templateUrl: './product-form-page.html',
  styleUrl: './product-form-page.scss',
})
export class ProductFormPage {
 
  protected readonly facade = inject(ProductFormFacade);
}
