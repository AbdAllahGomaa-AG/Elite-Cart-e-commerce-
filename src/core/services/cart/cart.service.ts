import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartCounter: BehaviorSubject<number> = new BehaviorSubject(0);
  //
  constructor(private _HttpClient: HttpClient) {}
  //
  addToCart(id: string): Observable<any> {
    return this._HttpClient.post(`${environments.basUrl}/api/v1/cart`, {
      productId: id,
    });
  }
  //
  gerToCart(): Observable<any> {
    return this._HttpClient.get(`${environments.basUrl}/api/v1/cart`);
  }
  //
  deleteCart(id: string): Observable<any> {
    return this._HttpClient.delete(`${environments.basUrl}/api/v1/cart/${id}`);
  }
  //
  UpdateCount(id: string, count: number): Observable<any> {
    return this._HttpClient.put(`${environments.basUrl}/api/v1/cart/${id}`, {
      count: count,
    });
  }
  //
  clearAllCart(): Observable<any> {
    return this._HttpClient.delete(`${environments.basUrl}/api/v1/cart`);
  }
}
