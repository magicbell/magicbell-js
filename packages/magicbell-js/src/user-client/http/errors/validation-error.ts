import { ZodError } from 'zod';

/**
 * Error class for data validation failures using Zod schemas.
 * Provides detailed information about which properties failed validation and why.
 */
export class ValidationError extends Error {
  /** Formatted error message with validation details */
  public readonly error: string;

  /**
   * Creates a new validation error from a Zod error.
   * @param zodError - The Zod validation error containing issue details
   * @param object - The object that failed validation
   */
  constructor(zodError: ZodError, object: any) {
    let actual: string;
    try {
      actual = JSON.stringify(object, undefined, 2);
    } catch (err) {
      actual = object;
    }

    const error = [
      `ValidationError:`,
      ...zodError.issues.map((issue) => `  Property: ${issue.path.join('.')}. Message: ${issue.message}`),
      '  Validated:',
      ...actual.split('\n').map((line) => `  ${line}`),
    ].join('\n');

    super(error);

    this.error = error;
  }
}
