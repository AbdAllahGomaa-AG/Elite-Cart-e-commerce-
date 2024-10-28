import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly _HttpClient = inject(HttpClient);

  orderCheck(id: string | null, cartInfo: object): Observable<any> {
    return this._HttpClient.post(
      `${environments.basUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        shippingAddress: cartInfo,
      }
    );
  }
  getUserOrders(id: string): Observable<any> {
    return this._HttpClient.get(
      `${environments.basUrl}/api/v1/orders/user/${id}`
    );
  }

}
