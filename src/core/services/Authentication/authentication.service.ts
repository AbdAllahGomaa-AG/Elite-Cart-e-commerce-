import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any = null;
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);

  srtRegister(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environments.basUrl}/api/v1/auth/signup`,
      data
    );
  }
  //
  srtLogin(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environments.basUrl}/api/v1/auth/signin`,
      data
    );
  }
  //email
  setEmail(data: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      data
    );
  }
  // code
  setCode(data: object): Observable<any> {
    return this._HttpClient.post(
      `${environments.basUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }
  //rest
  setRest(data: object): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      data
    );
  }

  saveData(): void {
    if (localStorage.getItem('loginToken') != null) {
      this.userData = jwtDecode(localStorage.getItem('loginToken')!);
      console.log(this.userData.id);
    }
  }

  singOut(): void {
    localStorage.removeItem('loginToken');
    this.userData = null;
    this._Router.navigate(['/login']);
  }
}
