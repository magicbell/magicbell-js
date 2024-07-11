type InstallationId = 'development' | 'production';

export interface SaveMobilePushFcmTokenRequest {
  device_token: string;
  installation_id?: InstallationId;
}
