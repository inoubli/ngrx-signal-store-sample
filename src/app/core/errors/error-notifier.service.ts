import { Injectable, inject } from '@angular/core';
import { AppError } from '../errors/app-error.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ErrorNotifierService {
  private snackBar = inject(MatSnackBar);

  notify(error: AppError): void {
    if (error.code === 'VALIDATION') return; // handled locally

    const message = this.getMessage(error);

    this.snackBar.open(message, 'Close', {
      duration: 4000,
    });
  }

  private getMessage(error: AppError): string {
    switch (error.code) {
      case 'NETWORK':
        return 'No internet connection';
      case 'UNAUTHORIZED':
        return 'Authentication failed. Please log in again';
      case 'FORBIDDEN':
        return 'Access denied. You do not have permission to perform this action';
      case 'NOT_FOUND':
        return 'Requested resource not found';
      default:
        return 'Something went wrong';
    }
  }
}
