import { ZodError } from 'zod';

export class ValidationError extends Error {
  public readonly error: string;

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
