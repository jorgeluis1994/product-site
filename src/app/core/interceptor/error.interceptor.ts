import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error capturado por el Interceptor:', error);
      alert(`Error: ${error.error?.message || 'Algo salió mal'}`);

      return throwError(() => error);
    })
  );
};
