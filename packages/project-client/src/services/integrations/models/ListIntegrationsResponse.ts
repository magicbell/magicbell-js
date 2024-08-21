export interface ListIntegrationsResponse {
  integrations?: {
    config?: Config;
    id?: string;
    name?: string;
  }[];
}
interface Config {
  [k: string]: unknown;
}
