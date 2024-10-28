import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly _HttpClient = inject(HttpClient);

  addToWishlist(id: string): Observable<any> {
    return this._HttpClient.post(`${environments.basUrl}/api/v1/wishlist`, {
      productId: id,
    });
  }

  getCart(): Observable<any> {
    return this._HttpClient.get(`${environments.basUrl}/api/v1/wishlist`, {});
  }
  RemoveItems(id:string): Observable<any> {
    return this._HttpClient.delete(`${environments.basUrl}/api/v1/wishlist/${id}`);
  }
}
