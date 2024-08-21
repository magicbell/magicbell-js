import { WebPushToken } from './WebPushToken';

type Data = WebPushToken;

export interface ArrayWithMetadataOfWebPushToken {
  data: {
    data: Data;
    metadata: Metadata;
  }[];
}
interface Metadata {
  created_at: string;
  discarded_at?: string;
  id: string;
  updated_at?: string;
}
