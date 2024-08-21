type Badge = 'unread' | 'unseen';

export interface SaveApnsIntegrationRequest {
  app_id: string;
  badge: Badge;
  certificate: string;
  key_id: string;
  team_id: string;
}
