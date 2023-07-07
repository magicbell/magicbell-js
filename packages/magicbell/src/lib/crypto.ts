import crypto from 'crypto';

type UserData = { userExternalId?: string; userEmail: string } | { userExternalId: string; userEmail?: string };

export function createHmac(secret: string, data: UserData): string;
export function createHmac(secret: string, data: string): string;

export function createHmac(secret: string, data: UserData | string) {
  if (!crypto?.createHmac) throw new Error('Your environment does not support crypto.createHmac');
  if (!secret) throw new Error(`You'll need to provide a secret to create an HMAC.`);

  data = typeof data === 'string' ? data : data.userExternalId || data.userEmail;
  if (!data) throw new Error(`You'll need to provide data to create an HMAC.`);

  return crypto.createHmac('sha256', secret).update(data).digest('base64');
}
