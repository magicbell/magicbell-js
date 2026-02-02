import { HttpMetadata } from './types.js';

/**
 * Error class for HTTP request failures.
 * Captures error details including status, metadata, and the raw response.
 */
export class HttpError extends Error {
  /** Error message or status text */
  public readonly error: string;
  /** HTTP response metadata (status, headers, etc.) */
  public readonly metadata: HttpMetadata;
  /** Raw response object from the HTTP client */
  public readonly raw?: ArrayBuffer;

  /**
   * Creates a new HTTP error.
   * @param metadata - HTTP response metadata
   * @param raw - Raw response object (optional)
   * @param error - Custom error message (optional, defaults to status text)
   */
  constructor(metadata: HttpMetadata, raw?: ArrayBuffer, error?: string) {
    super(error);
    this.error = metadata.statusText;
    this.metadata = metadata;
    this.raw = raw;
  }
}
