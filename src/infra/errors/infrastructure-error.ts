export class InfrastructureError extends Error {
  constructor(message: string, error?: unknown) {
    super(message, {
      cause: error,
    });
  }
}
