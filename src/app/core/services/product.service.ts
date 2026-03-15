import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.baseUrl}/products`;

  /** GET /bp/products */
  getProducts(): Observable<{ data: Product[] }> {
    return this.http.get<{ data: Product[] }>(this.apiUrl);
  }


  /** GET /bp/products/verification/:id */
  verifyId(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verification/${id}`);
  }

  /** POST /bp/products */
  createProduct(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  /** PUT /bp/products/:id */
  updateProduct(id: string, product: Omit<Product, 'id'>): Observable<any> {

    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  /** DELETE /bp/products/:id */
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
