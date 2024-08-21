import { ApnsToken } from './ApnsToken';

type Data = ApnsToken;

export interface ApnsTokenWithMetadata {
  data: Data;
  metadata: Metadata;
}
interface Metadata {
  created_at: string;
  discarded_at?: string;
  id: string;
  updated_at?: string;
}
