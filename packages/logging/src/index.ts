export interface SafeLogContext {
  readonly requestId: string;
  readonly userId?: string;
  readonly patientId?: string;
  readonly action?: string;
  readonly result?: 'SUCCESS' | 'FAILURE';
}
export interface SafeLogger {
  info(message: string, context: SafeLogContext): void;
  error(message: string, context: SafeLogContext): void;
}
