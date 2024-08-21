import { SlackToken } from './SlackToken';

type Data = SlackToken;

export interface SlackTokenWithMetadata {
  data: Data;
  metadata: Metadata;
}
interface Metadata {
  created_at: string;
  discarded_at?: string;
  id: string;
  updated_at?: string;
}
