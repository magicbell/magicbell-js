export interface SaveSlackIntegrationRequest {
  app_id: string;
  client_id: string;
  client_secret: string;
  id?: string;
  signing_secret: string;
}
