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
        .get('/channels/mobile_push/apns/tokens/3334965325')
        .reply(200, { data: {} });
      return sdk.channels.getMobilePushApnsToken('3334965325').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/mobile_push/apns/tokens/9825421878')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.getMobilePushApnsToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/mobile_push/apns/tokens/1631739370')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.getMobilePushApnsToken('1631739370')).rejects.toThrow();
    });
  });

  describe('test discardMobilePushApnsToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/mobile_push/apns/tokens/8536712529')
        .reply(200, { data: {} });
      return sdk.channels.discardMobilePushApnsToken('8536712529').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/mobile_push/apns/tokens/3785876860')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.discardMobilePushApnsToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/mobile_push/apns/tokens/8642688562')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.discardMobilePushApnsToken('8642688562')).rejects.toThrow();
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
        .get('/channels/mobile_push/fcm/tokens/8386363421')
        .reply(200, { data: {} });
      return sdk.channels.getMobilePushFcmToken('8386363421').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/mobile_push/fcm/tokens/1775500707')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.getMobilePushFcmToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/mobile_push/fcm/tokens/3103933153')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.getMobilePushFcmToken('3103933153')).rejects.toThrow();
    });
  });

  describe('test discardMobilePushFcmToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/mobile_push/fcm/tokens/4345876884')
        .reply(200, { data: {} });
      return sdk.channels.discardMobilePushFcmToken('4345876884').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/mobile_push/fcm/tokens/9406022090')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.discardMobilePushFcmToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/mobile_push/fcm/tokens/9473010380')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.discardMobilePushFcmToken('9473010380')).rejects.toThrow();
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
        .get('/channels/slack/tokens/4625837068')
        .reply(200, { data: {} });
      return sdk.channels.getSlackToken('4625837068').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/slack/tokens/5505157870')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.getSlackToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/slack/tokens/5590926312')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.getSlackToken('5590926312')).rejects.toThrow();
    });
  });

  describe('test discardSlackToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/slack/tokens/9214806555')
        .reply(200, { data: {} });
      return sdk.channels.discardSlackToken('9214806555').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/slack/tokens/5956301322')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.discardSlackToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/slack/tokens/9369003669')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.discardSlackToken('9369003669')).rejects.toThrow();
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
        .get('/channels/teams/tokens/9545572632')
        .reply(200, { data: {} });
      return sdk.channels.getTeamsToken('9545572632').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/teams/tokens/9134567098')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.getTeamsToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/teams/tokens/8437904347')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.getTeamsToken('8437904347')).rejects.toThrow();
    });
  });

  describe('test discardTeamsToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/teams/tokens/6417458267')
        .reply(200, { data: {} });
      return sdk.channels.discardTeamsToken('6417458267').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/teams/tokens/6201458976')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.discardTeamsToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/teams/tokens/8653626027')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.discardTeamsToken('8653626027')).rejects.toThrow();
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
        .get('/channels/web_push/tokens/4063469359')
        .reply(200, { data: {} });
      return sdk.channels.getWebPushToken('4063469359').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/web_push/tokens/7839757355')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.getWebPushToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .get('/channels/web_push/tokens/6257413713')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.getWebPushToken('6257413713')).rejects.toThrow();
    });
  });

  describe('test discardWebPushToken', () => {
    test('test api call', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/web_push/tokens/1241311005')
        .reply(200, { data: {} });
      return sdk.channels.discardWebPushToken('1241311005').then((r: any) => expect(r.data).toEqual({}));
    });

    test('test will throw error if required fields missing', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/web_push/tokens/2541074724')
        .reply(200, { data: {} });
      return expect(async () => await sdk.channels.discardWebPushToken()).rejects.toThrow();
    });

    test('test will throw error on a non-200 response', () => {
      const scope = nock('https://api.magicbell.com/v2')
        .delete('/channels/web_push/tokens/5824471081')
        .reply(404, { data: {} });
      return expect(async () => await sdk.channels.discardWebPushToken('5824471081')).rejects.toThrow();
    });
  });
});
