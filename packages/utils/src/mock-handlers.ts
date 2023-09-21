import { config, wsAuth } from './fake';
import { ablyAuth, ablyRequestToken } from './fake/ably';
import { mockHandler } from './mock-server';

export const mockHandlers = [
  mockHandler('get', '/config', config),
  mockHandler('post', '/ws/auth', wsAuth),
  mockHandler('post', 'https://api.magicbell.com/ably/auth', ablyAuth),
  mockHandler('post', 'https://rest.ably.io/keys/:key/requestToken', ablyRequestToken),
];
