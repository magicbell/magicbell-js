import nock from 'nock';

import { Client } from '../../../src';
import { ChannelsService } from '../../../src/services/channels/Channels';

describe('test ChannelsService object', () => {
  it('should be an object', () => {
    expect(typeof ChannelsService).toBe('function');
  });
});

describe('test Channels', () => {
  let sdk: any;

  beforeEach(() => {
    sdk = new Client({});

    nock.cleanAll();
  });

  describe('test getMobilePushApnsTokens', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/mobile_push/apns/tokens')
        .reply(200, { data: {} });
      return sdk.channels.getMobilePushApnsTokens().then((r: any) => expect(r.data).toEqual({}));
    });
  });

  describe('test saveMobilePushApnsToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .post('/channels/mobile_push/apns/tokens')
        .reply(200, { data: {} });
      return sdk.channels.saveMobilePushApnsToken({}).then((r: any) => expect(r.data).toEqual({}));
    });
  });

  describe('test getMobilePushApnsToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/mobile_push/apns/tokens/1628319310')
        .reply(200, { data: {} });
      return sdk.channels.getMobilePushApnsToken('1628319310').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/mobile_push/apns/tokens/2500750429')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.getMobilePushApnsToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/mobile_push/apns/tokens/2040358893')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.getMobilePushApnsToken('2040358893')).rejects.toThrow();
    });
  });

  describe('test discardMobilePushApnsToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/mobile_push/apns/tokens/7026408082')
        .reply(200, { data: {} });
      return sdk.channels.discardMobilePushApnsToken('7026408082').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/mobile_push/apns/tokens/8688898021')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.discardMobilePushApnsToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/mobile_push/apns/tokens/9044774512')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.discardMobilePushApnsToken('9044774512')).rejects.toThrow();
    });
  });

  describe('test getMobilePushFcmTokens', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/mobile_push/fcm/tokens')
        .reply(200, { data: {} });
      return sdk.channels.getMobilePushFcmTokens().then((r: any) => expect(r.data).toEqual({}));
    });
  });

  describe('test saveMobilePushFcmToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .post('/channels/mobile_push/fcm/tokens')
        .reply(200, { data: {} });
      return sdk.channels.saveMobilePushFcmToken({}).then((r: any) => expect(r.data).toEqual({}));
    });
  });

  describe('test getMobilePushFcmToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/mobile_push/fcm/tokens/1700442710')
        .reply(200, { data: {} });
      return sdk.channels.getMobilePushFcmToken('1700442710').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/mobile_push/fcm/tokens/1054116787')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.getMobilePushFcmToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/mobile_push/fcm/tokens/6782067040')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.getMobilePushFcmToken('6782067040')).rejects.toThrow();
    });
  });

  describe('test discardMobilePushFcmToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/mobile_push/fcm/tokens/2118668019')
        .reply(200, { data: {} });
      return sdk.channels.discardMobilePushFcmToken('2118668019').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/mobile_push/fcm/tokens/9973676388')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.discardMobilePushFcmToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/mobile_push/fcm/tokens/6186716538')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.discardMobilePushFcmToken('6186716538')).rejects.toThrow();
    });
  });

  describe('test getSlackTokens', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2').get('/channels/slack/tokens').reply(200, { data: {} });
      return sdk.channels.getSlackTokens().then((r: any) => expect(r.data).toEqual({}));
    });
  });

  describe('test saveSlackToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2').post('/channels/slack/tokens').reply(200, { data: {} });
      return sdk.channels.saveSlackToken({}).then((r: any) => expect(r.data).toEqual({}));
    });
  });

  describe('test getSlackToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/slack/tokens/8430125263')
        .reply(200, { data: {} });
      return sdk.channels.getSlackToken('8430125263').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/slack/tokens/1112356942')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.getSlackToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/slack/tokens/6226188385')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.getSlackToken('6226188385')).rejects.toThrow();
    });
  });

  describe('test discardSlackToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/slack/tokens/5318759040')
        .reply(200, { data: {} });
      return sdk.channels.discardSlackToken('5318759040').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/slack/tokens/3066335373')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.discardSlackToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/slack/tokens/1247212860')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.discardSlackToken('1247212860')).rejects.toThrow();
    });
  });

  describe('test getTeamsTokens', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2').get('/channels/teams/tokens').reply(200, { data: {} });
      return sdk.channels.getTeamsTokens().then((r: any) => expect(r.data).toEqual({}));
    });
  });

  describe('test saveTeamsToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2').post('/channels/teams/tokens').reply(200, { data: {} });
      return sdk.channels.saveTeamsToken({}).then((r: any) => expect(r.data).toEqual({}));
    });
  });

  describe('test getTeamsToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/teams/tokens/4241096780')
        .reply(200, { data: {} });
      return sdk.channels.getTeamsToken('4241096780').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/teams/tokens/8253780575')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.getTeamsToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/teams/tokens/6908457490')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.getTeamsToken('6908457490')).rejects.toThrow();
    });
  });

  describe('test discardTeamsToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/teams/tokens/2453520540')
        .reply(200, { data: {} });
      return sdk.channels.discardTeamsToken('2453520540').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/teams/tokens/5168857388')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.discardTeamsToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/teams/tokens/4516549519')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.discardTeamsToken('4516549519')).rejects.toThrow();
    });
  });

  describe('test getWebPushTokens', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2').get('/channels/web_push/tokens').reply(200, { data: {} });
      return sdk.channels.getWebPushTokens().then((r: any) => expect(r.data).toEqual({}));
    });
  });

  describe('test saveWebPushToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2').post('/channels/web_push/tokens').reply(200, { data: {} });
      return sdk.channels.saveWebPushToken({}).then((r: any) => expect(r.data).toEqual({}));
    });
  });

  describe('test getWebPushToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/web_push/tokens/9984097578')
        .reply(200, { data: {} });
      return sdk.channels.getWebPushToken('9984097578').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/web_push/tokens/7625743329')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.getWebPushToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/web_push/tokens/5591089017')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.getWebPushToken('5591089017')).rejects.toThrow();
    });
  });

  describe('test discardWebPushToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/web_push/tokens/5668351916')
        .reply(200, { data: {} });
      return sdk.channels.discardWebPushToken('5668351916').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/web_push/tokens/2435504694')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.discardWebPushToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/web_push/tokens/5666882608')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.discardWebPushToken('5666882608')).rejects.toThrow();
    });
  });
});
