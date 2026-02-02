/**
 * Error class that can be thrown explicitly via a throw() method.
 * Extends the built-in Error class with a convenience method for throwing.
 */
export class ThrowableError extends Error {
  /**
   * Creates a new throwable error.
   * @param message - The error message
   * @param response - Optional response data associated with the error
   */
  constructor(public message: string, protected response?: unknown) {
    super(message);
  }

  /**
   * Throws this error instance.
   * Convenience method for explicitly throwing the error.
   * @throws This error instance
   */
  public throw() {
    throw this;
  }
}
