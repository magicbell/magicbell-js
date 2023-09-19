import crypto from 'crypto';

type UserData =
  | { userExternalId?: string; userEmail: string }
  | { userExternalId: string; userEmail?: string }
  | { id: string }
  | { _id: string }
  | { email: string };

const dataKeys = ['userExternalId', 'userEmail', 'id', '_id', 'email'] as const;
function getData(data: UserData | string) {
  if (typeof data === 'string') return data;
  if (typeof data === 'object' && !data) return '';

  const key = dataKeys.find((key) => key in data && data[key]);
  return key ? data[key] : '';
}

export function createHmac(secret: string, data: UserData): string;
export function createHmac(secret: string, data: string): string;

export function createHmac(secret: string, data: UserData | string) {
  if (!crypto?.createHmac) throw new Error('Your environment does not support crypto.createHmac');
  if (!secret) throw new Error(`You'll need to provide a secret to create an HMAC.`);

  const msg = getData(data);
  if (!msg || typeof msg !== 'string') throw new Error(`You'll need to provide data to create an HMAC.`);

  return crypto.createHmac('sha256', secret).update(msg).digest('base64');
}
