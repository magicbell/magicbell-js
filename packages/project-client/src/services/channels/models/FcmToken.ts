type InstallationId = 'development' | 'production';

export interface FcmToken {
  device_token: string;
  installation_id?: InstallationId;
}
