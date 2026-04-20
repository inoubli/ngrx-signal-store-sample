import { ErrorHandler, Injectable } from '@angular/core';
import { AppError } from './app-error.model';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  /**
   * Handle uncaught application errors
   * @param error The error to handle
   */
  handleError(error: unknown): void {
    // TODO: Uncomment the following lines and make sure normalize is getting the right error message
    // const appError = this.normalize(error);
    // console.error(appError);
    console.error(error);

    /**
     * IMPORTANT: no UI logic here
     * Log the error to an external service if needed
     */
  }

  /**
   * Normalize the error to our AppError model
   * @param error The error to normalize
   * @returns The normalized AppError
   */
  private normalize(error: unknown): AppError {
    if (error instanceof AppError) return error;

    return new AppError({
      message: 'Unexpected error',
      originalError: error,
    });
  }
}
