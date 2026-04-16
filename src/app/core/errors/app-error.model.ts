export type ErrorCode =
  | 'UNKNOWN'
  | 'NETWORK'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'VALIDATION'
  | 'SERVER';

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly status?: number;
  readonly originalError?: unknown;
  readonly context?: Record<string, unknown>;

  constructor(params: {
    message: string;
    code?: ErrorCode;
    status?: number;
    originalError?: unknown;
    context?: Record<string, unknown>;
  }) {
    super(params.message);

    this.code = params.code ?? 'UNKNOWN';
    this.status = params.status;
    this.originalError = params.originalError;
    this.context = params.context;
  }
}
