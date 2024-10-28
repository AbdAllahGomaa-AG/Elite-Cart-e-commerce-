import { HttpInterceptorFn } from '@angular/common/http';
import { Token } from '@angular/compiler';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('loginToken') !== null) {
    if (
      req.url.includes('cart') ||
      req.url.includes('orders') ||
      req.url.includes('wishlist')
    ) {
      req = req.clone({
        setHeaders: { Token: localStorage.getItem('loginToken')! },
      });
    }
  }
  return next(req);
};
