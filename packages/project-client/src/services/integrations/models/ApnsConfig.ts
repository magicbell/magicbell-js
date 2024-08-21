type Badge = 'unread' | 'unseen';

export interface ApnsConfig {
  app_id: string;
  badge: Badge;
  certificate: string;
  key_id: string;
  team_id: string;
}
