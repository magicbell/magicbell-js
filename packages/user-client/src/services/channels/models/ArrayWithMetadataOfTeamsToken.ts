import { TeamsToken } from './TeamsToken';

type Data = TeamsToken;

export interface ArrayWithMetadataOfTeamsToken {
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