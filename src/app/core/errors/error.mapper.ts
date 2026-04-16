import { HttpErrorResponse } from '@angular/common/http';
import { AppError } from './app-error.model';

export function mapHttpError(error: HttpErrorResponse): AppError {
  if (error.status === 0) {
    return new AppError({
      message: 'Network error',
      code: 'NETWORK',
      originalError: error,
    });
  }

  switch (error.status) {
    case 401:
      return new AppError({ message: 'Unauthorized', code: 'UNAUTHORIZED', status: 401 });
    case 403:
      return new AppError({ message: 'Forbidden', code: 'FORBIDDEN', status: 403 });
    case 404:
      return new AppError({ message: 'Not found', code: 'NOT_FOUND', status: 404 });
    case 422:
      return new AppError({ message: 'Validation error', code: 'VALIDATION', status: 422 });
    default:
      return new AppError({
        message: 'Server error',
        code: 'SERVER',
        status: error.status,
        originalError: error,
      });
  }
}
