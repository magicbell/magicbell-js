import { config } from '../fake';
import { mockHandler } from '../mock-server';

export const getConfig = mockHandler('get', '/config', () => ({
  status: 200,
  json: config,
}));
