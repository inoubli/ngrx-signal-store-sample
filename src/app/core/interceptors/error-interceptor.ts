import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { mapHttpError } from '../errors/error.mapper';
import { inject } from '@angular/core';
import { ErrorNotifierService } from '../errors/error-notifier.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorNotifier = inject(ErrorNotifierService);

  return next(req).pipe(
    catchError((error) => {
      /** Map httpError to our domain error model (AppError) */
      const appError = mapHttpError(error);

      errorNotifier.notify(appError);

      return throwError(() => appError);
    }),
  );
};
