import { FcmToken } from './FcmToken';

type Data = FcmToken;

export interface ArrayWithMetadataOfFcmToken {
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
