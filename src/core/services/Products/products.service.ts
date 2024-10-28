import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _HttpClient = inject(HttpClient);

  getallProducts(): Observable<any> {
    return this._HttpClient.get(`${environments.basUrl}/api/v1/products`);
  }
  getSpecificProducts(id: string | null): Observable<any> {
    return this._HttpClient.get(`${environments.basUrl}/api/v1/products/${id}`);
  }
}
