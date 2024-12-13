import { HandleError } from '@/shared/errors/handle-error';

export class ApplicationError extends HandleError {
  constructor(message: string, error?: unknown) {
    super(message, {
      cause: error,
    });
  }
}
