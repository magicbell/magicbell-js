type Region = 'us' | 'eu';

export interface SaveMailgunIntegrationRequest {
  api_key: string;
  domain: string;
  region: Region;
}
