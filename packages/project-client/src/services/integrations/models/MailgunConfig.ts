type Region = 'us' | 'eu';

export interface MailgunConfig {
  api_key: string;
  domain: string;
  region: Region;
}
