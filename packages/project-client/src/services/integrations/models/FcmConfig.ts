type Type_ = 'service_account';

export interface FcmConfig {
  auth_provider_x509_cert_url: string;
  auth_uri: string;
  client_email: string;
  client_id: string;
  client_x509_cert_url: string;
  private_key: string;
  private_key_id: string;
  project_id: string;
  token_uri: string;
  universe_domain: string;
  type_: Type_;
}
