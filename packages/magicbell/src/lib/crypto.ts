import crypto from 'crypto';

export function createHmac(secret: string, data: string) {
  if (!secret || !data) return '';

  if (!crypto || !crypto.createHmac) {
    throw new Error('This method is not available in the browser. Please provide a userHmac.');
  }

  return crypto.createHmac('sha256', secret).update(data).digest('base64');
}
