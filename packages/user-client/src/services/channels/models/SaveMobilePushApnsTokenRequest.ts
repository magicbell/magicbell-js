type InstallationId = 'development' | 'production';

export interface SaveMobilePushApnsTokenRequest {
  device_token: string;
  installation_id?: InstallationId;
}
