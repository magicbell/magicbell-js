import { HttpMetadata } from './types';

export class HttpError extends Error {
  public readonly error: string;
  public readonly metadata: HttpMetadata;

  constructor(metadata: HttpMetadata, error?: string) {
    super(error);
    this.error = metadata.statusText;
    this.metadata = metadata;
  }
}
