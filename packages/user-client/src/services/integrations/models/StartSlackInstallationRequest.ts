export interface StartSlackInstallationRequest {
  app_id: string;
  auth_url?: string;
  extra_scopes?: string[];
  redirect_url?: string;
}
