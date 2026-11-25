import * as z from 'zod';

export enum StatusStatus {
  ENQUEUED = 'enqueued',
  PROCESSING = 'processing',
  PROCESSED = 'processed',
}
