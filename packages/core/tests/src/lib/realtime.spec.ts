import * as Ably from 'ably';
import faker from 'faker';
import { Server } from 'miragejs';

import { api } from '../../../src/lib/ajax';
import { connectToAbly, handleAblyEvent, pushEventAggregator } from '../../../src/lib/realtime';
import Config from '../../../src/models/Config';
import { sampleNotification } from '../../factories/NotificationFactory';

describe('lib', () => {
  describe('realtime', () => {
    describe('pushEventAggregator', () => {
      it('exposes an API for pubsub', () => {
        const callback = vi.fn();
        pushEventAggregator.on('test', callback);
        pushEventAggregator.emit('test');

        expect(callback).toHaveBeenCalledTimes(1);
        pushEventAggregator.off('test', callback);

        pushEventAggregator.emit('test');
        expect(callback).toHaveBeenCalledTimes(1);
      });
    });

    describe('.connectToAbly', () => {
      let server;

      beforeEach(() => {
        server = new Server({
          environment: 'test',
          trackRequests: true,
          timing: 50,
        });

        server.post('https://api.magicbell.com/ably/auth', {
          keyName: 'rerP7g.9NH_TA',
          timestamp: Date.now(),
          nonce: '2a0c905cee50b30bba86c1ad92f523d6',
          clientId: '4450',
          capability: '{"user_4450-project_18":["*"],"user_4450-project_18:*":["*"]}',
          mac: 'L8ezYmgnM9Mp4yYJHYIPqTH+WsyY0r6pr4AcIyqJzSU=',
        });

        server.post('https://rest.ably.io/keys/rerP7g.9NH_TA/requestToken', {
          token:
            'v3o19Q.GEfb3flEHPw3J6wH88hs_thOxzFR2wB60_FUbazFHznlmNvF9iOri4hQT_kUIG7oBZCrlJtfpHsyG4aZnoRmyhN_4N7YfTu5kXjVGL8UPwXBLJXp9gn_9uykw5hPmjphBTtC81DasytTbNfI3I7eNYXNGBVdwwKW1zsrhpJM_L2dZVysU6ERZ0P_b2_cMq9eA',
          keyName: 'rerP7g.9NH_TA',
          issued: Date.now(),
          expires: Date.now() + 500000,
          capability: '{"user_4450-project_18":["*"],"user_4450-project_18:*":["*"]}',
          clientId: '4450',
        });
      });

      afterEach(() => {
        server.shutdown();
      });

      it('returns an ably client', () => {
        const config = new Config({
          apiKey: 'cfaa24ae47ace2f98aebbbcaf9c85ffa5a82307a',
          userEmail: 'josue@supportbee.com',
          ws: { authUrl: '/ably/auth', region: '', channel: '' },
        });
        const client = connectToAbly(config);

        expect(client).toBeInstanceOf(Ably.Realtime);
      });

      describe('custom authentication server', () => {
        beforeEach(() => {
          server.post('https://api.magicbell.dev/ably/auth', {
            keyName: 'rerP7g.9NH_TA',
            timestamp: Date.now(),
            nonce: '2a0c905cee50b30bba86c1ad92f523d6',
            clientId: '4450',
            capability: '{"user_4450-project_18":["*"],"user_4450-project_18:*":["*"]}',
            mac: 'L8ezYmgnM9Mp4yYJHYIPqTH+WsyY0r6pr4AcIyqJzSU=',
          });
        });

        it.skip('makes a request to the custom server url', () => {
          const config = new Config({
            apiKey: 'cfaa24ae47ace2f98aebbbcaf9c85ffa5a82307a',
            userEmail: 'josue@supportbee.com',
            ws: { authUrl: '/ably/auth', region: '', channel: '' },
          });
          connectToAbly(config, 'https://api.magicbell.dev');

          const requests = server.pretender.handledRequests;
          expect(requests[0].url).toBe('https://api.magicbell.dev/ably/auth');
        });
      });
    });

    describe('.handleAblyEvent', () => {
      it('emits the event to the pushEventAggregator', () => {
        const spy = vi.spyOn(pushEventAggregator, 'emit');
        const event = {
          name: 'notification/new',
          data: faker.helpers.createCard(),
        } as Ably.Types.Message;
        handleAblyEvent(event);

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('notification.new', event.data);
      });

      describe('the data contains a notification ID', () => {
        let server;

        beforeEach(() => {
          server = new Server({
            environment: 'test',
            urlPrefix: 'https://api.magicbell.com',
            timing: 50,
          });
          server.get('/notifications/uuid', {
            notification: sampleNotification,
          });
        });

        afterEach(() => {
          server.shutdown();
        });

        it('emits the event with the notification', async () => {
          // const notification = new Notification(sampleNotification);
          const spy = vi.spyOn(pushEventAggregator, 'emit');
          const event = {
            name: 'notification/new',
            data: { id: 'uuid' },
          } as Ably.Types.Message;
          await handleAblyEvent(event);

          expect(spy).toHaveBeenCalledTimes(1);
          // @TODO Investigate why it fails
          // expect(spy).toHaveBeenCalledWith('notification.new', notification);
        });
      });

      describe('the event has a client ID', () => {
        describe('the event was originated by this client', () => {
          let clientId: string;

          beforeEach(() => {
            clientId = faker.random.alphaNumeric(10);
            api.defaults.headers['X-MAGICBELL-CLIENT-ID'] = clientId;
          });

          it('does not emit the event', async () => {
            const spy = vi.spyOn(pushEventAggregator, 'emit');
            const event = {
              name: 'notification/new',
              data: { id: 'uuid', client_id: clientId },
            } as Ably.Types.Message;
            await handleAblyEvent(event);

            expect(spy).not.toHaveBeenCalled();
          });
        });

        describe('the event was originated by someone else', () => {
          it('emits the event', async () => {
            const spy = vi.spyOn(pushEventAggregator, 'emit');
            const event = {
              name: 'notification/seen/all',
              data: { client_id: faker.random.alphaNumeric(10) },
            } as Ably.Types.Message;
            await handleAblyEvent(event);

            expect(spy).toHaveBeenCalledTimes(1);
          });
        });
      });
    });
  });
});
