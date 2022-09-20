import crypto from 'crypto';

export function computeUserKey(apiSecret: string, userEmail: string) {
  if (!apiSecret || !userEmail) return '';

  return crypto.createHmac('sha256', apiSecret).update(userEmail).digest('base64');
}
