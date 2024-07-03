export interface SaveWebPushTokenRequest {
  endpoint: string;
  keys: Keys;
}
interface Keys {
  auth: string;
  p256dh: string;
}
