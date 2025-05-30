export class ThrowableError extends Error {
  constructor(public message: string, protected response?: unknown) {
    super(message);
  }

  public throw() {
    throw this;
  }
}
