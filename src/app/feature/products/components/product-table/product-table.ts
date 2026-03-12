import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-table',
  imports: [DatePipe],
  templateUrl: './product-table.html',
  styleUrl: './product-table.scss',
})
export class ProductTable {
  @Input() products: any[] = [];

  toggleMenu(id: string) {
    // Lógica para mostrar el dropdown de edición/borrado
  }
}
