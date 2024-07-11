type InstallationId = 'development' | 'production';

export interface ApnsToken {
  device_token: string;
  installation_id?: InstallationId;
}
