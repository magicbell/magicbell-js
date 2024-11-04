import { HttpMetadata } from './types.js';

export class HttpError extends Error {
  public readonly error: string;
  public readonly metadata: HttpMetadata;
  public readonly raw?: ArrayBuffer;

  constructor(metadata: HttpMetadata, raw?: ArrayBuffer, error?: string) {
    super(error);
    this.error = metadata.statusText;
    this.metadata = metadata;
    this.raw = raw;
  }
}
