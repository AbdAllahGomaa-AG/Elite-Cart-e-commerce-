import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      // err
      console.log('err', err);
      //alert

      return throwError(() => err.error.message);
    })
  );
};
