import nock from 'nock';

import { Client } from '../../../src';
import { IntegrationsService } from '../../../src/services/integrations/Integrations';

describe('test IntegrationsService object', () => {
  it('should be an object', () => {
    expect(typeof IntegrationsService).toBe('function');
  });
});

describe('test Integrations', () => {
  let sdk: any;

  beforeEach(() => {
    sdk = new Client({});

    nock.cleanAll();
  });

  describe('test saveSlackInstallation', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .post('/integrations/slack/installations')
        .reply(200, { data: {} });
      return sdk.integrations.saveSlackInstallation({}).then((r: any) => expect(r.data).toEqual({}));
    });
  });

  describe('test finishSlackInstallation', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .post('/integrations/slack/installations/finish')
        .reply(200, { data: {} });
      return sdk.integrations.finishSlackInstallation({}).then((r: any) => expect(r.data).toEqual({}));
    });
  });

  describe('test startSlackInstallation', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .post('/integrations/slack/installations/start')
        .reply(200, { data: {} });
      return sdk.integrations.startSlackInstallation({}).then((r: any) => expect(r.data).toEqual({}));
    });
  });

  describe('test saveTemplatesInstallation', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .post('/integrations/templates/installations')
        .reply(200, { data: {} });
      return sdk.integrations.saveTemplatesInstallation({}).then((r: any) => expect(r.data).toEqual({}));
    });
  });

  describe('test startWebPushInstallation', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .post('/integrations/web_push/installations/start')
        .reply(200, { data: {} });
      return sdk.integrations.startWebPushInstallation({}).then((r: any) => expect(r.data).toEqual({}));
    });
  });
});
