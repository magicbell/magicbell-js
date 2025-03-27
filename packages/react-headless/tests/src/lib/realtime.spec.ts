import faker from '@faker-js/faker';
import { mockHandlers, setupMockServer } from '@magicbell/utils';

import * as ajax from '../../../src/lib/ajax';
import { emitEvent, eventAggregator, handleAblyEvent, pushEventAggregator } from '../../../src/lib/realtime';
import clientSettings from '../../../src/stores/clientSettings';
import { sampleNotification } from '../../factories/NotificationFactory';

const server = setupMockServer(...mockHandlers);

beforeEach(() => {
  clientSettings.setState({
    serverURL: 'https://api.magicbell.com',
    apiKey: 'fake-key',
    userEmail: faker.internet.email(),
    apiClientCacheTTL: 0,
  });
});

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

describe('eventAggregator', () => {
  it('exposes an API for pubsub', () => {
    const callback = vi.fn();
    eventAggregator.on('test', callback);
    eventAggregator.emit('test');

    expect(callback).toHaveBeenCalledTimes(1);
    eventAggregator.off('test', callback);

    eventAggregator.emit('test');
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('.handleAblyEvent', () => {
  it('emits the event to the pushEventAggregator', () => {
    const spy = vi.spyOn(pushEventAggregator, 'emit');
    const event = {
      name: 'notification/new',
      data: { [faker.lorem.word()]: faker.lorem.word() },
    };
    handleAblyEvent(event);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('notification.new', event.data);
    spy.mockRestore();
  });

  it('emits the event to the eventAggregator', () => {
    const spy = vi.spyOn(eventAggregator, 'emit');
    const event = {
      name: 'notification/new',
      data: { [faker.lorem.word()]: faker.lorem.word() },
    };
    handleAblyEvent(event);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('notification.new', { data: event.data, source: 'remote' });
    spy.mockRestore();
  });

  it('emits the event with the notification when notification contains id', async () => {
    server.intercept('get', '/notifications/:id', { notification: sampleNotification });

    const spy = vi.spyOn(pushEventAggregator, 'emit');
    const event = { name: 'notification/new', data: { id: 'uuid' } };
    await handleAblyEvent(event);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('notification.new', sampleNotification);
    spy.mockRestore();
  });

  it('does not fetch from the server for delete events', async () => {
    const spy = vi.spyOn(ajax, 'fetchAPI');
    const event = { name: 'notifications/delete', data: { id: 'uuid' } };
    await handleAblyEvent(event);

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('emits the event with the notification', async () => {
    const spy = vi.spyOn(pushEventAggregator, 'emit');
    const event = { name: 'notifications/delete', data: { id: 'uuid' } };
    await handleAblyEvent(event);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('notifications.delete', { id: 'uuid' });
    spy.mockRestore();
  });

  it('does not emit the event when event originated from this client', async () => {
    const { getState } = clientSettings;
    const spy = vi.spyOn(pushEventAggregator, 'emit');
    const event = {
      name: 'notification/new',
      data: { id: 'uuid', client_id: getState().clientId },
    };
    await handleAblyEvent(event);

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('emits the event when it originates from someone else', async () => {
    const spy = vi.spyOn(pushEventAggregator, 'emit');
    const event = {
      name: 'notification/seen/all',
      data: { client_id: faker.random.alphaNumeric(10) },
    };
    await handleAblyEvent(event);

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  test('local events are only published to public emitter', async () => {
    const localEmitter = vi.spyOn(pushEventAggregator, 'emit');
    const publicEmitter = vi.spyOn(eventAggregator, 'emit');
    const clientId = clientSettings.getState().clientId;

    emitEvent('notifications.seen.all', { client_id: clientId, notification_id: 'uuid' }, 'local');

    expect(localEmitter).not.toHaveBeenCalled();
    expect(publicEmitter).toHaveBeenCalledTimes(1);
    expect(publicEmitter).toHaveBeenCalledWith('notifications.seen.all', {
      data: { client_id: clientId, notification_id: 'uuid' },
      source: 'local',
    });
  });

  test('remote events are published to internal and public emitter', async () => {
    const localEmitter = vi.spyOn(pushEventAggregator, 'emit');
    const publicEmitter = vi.spyOn(eventAggregator, 'emit');
    const clientId = faker.random.alphaNumeric(10);

    await handleAblyEvent({
      name: 'notifications/seen/all',
      data: { client_id: clientId },
    });

    expect(localEmitter).toHaveBeenCalledTimes(1);
    expect(localEmitter).toHaveBeenCalledWith('notifications.seen.all', {
      client_id: clientId,
    });

    expect(publicEmitter).toHaveBeenCalledTimes(1);
    expect(publicEmitter).toHaveBeenCalledWith('notifications.seen.all', {
      data: { client_id: clientId },
      source: 'remote',
    });
  });
});
