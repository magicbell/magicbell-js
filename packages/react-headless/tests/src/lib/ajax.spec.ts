import faker from '@faker-js/faker';
import { setupMockServer } from '@magicbell/utils';
import { beforeEach } from 'vitest';

import { deleteAPI, fetchAPI, postAPI, putAPI } from '../../../src/lib/ajax';
import clientSettings from '../../../src/stores/clientSettings';

beforeEach(() => {
  clientSettings.setState({
    serverURL: 'https://api.magicbell.com',
    apiKey: 'fake-key',
    userEmail: faker.internet.email(),
  });
});

const server = setupMockServer();

describe('.deleteAPI', () => {
  it('deleteAPI sends a DELETE request', async () => {
    const status = server.intercept('all');
    await deleteAPI('/notifications/1');
    expect(status.lastRequest.method).toEqual('DELETE');
  });

  it('server throws the original error', async () => {
    server.intercept('delete', '/notifications/1', { status: 404, statusText: 'Not Found' });
    try {
      await deleteAPI('/notifications/1');
    } catch (error) {
      expect(error).toMatchObject({ status: 404, statusText: 'Not Found' });
    }
  });
});

describe('.fetchAPI', () => {
  it('sends a GET request', async () => {
    const status = server.intercept('all');
    await fetchAPI('/notifications');
    expect(status.lastRequest.method).toEqual('GET');
  });

  it('sets the x-magicbell-api-key request header', async () => {
    const status = server.intercept('get', '/notifications');
    clientSettings.setState({ apiKey: 'fake-api-key' });

    await fetchAPI('/notifications');
    expect(status.lastRequest.headers.get('x-magicbell-api-key')).toEqual('fake-api-key');
  });

  it('sets the x-magicbell-user-email request header when user email is provided', async () => {
    const status = server.intercept('get', '/notifications');
    clientSettings.setState({ userExternalId: undefined, userEmail: 'person@example.com' });

    await fetchAPI('/notifications');

    expect(status.lastRequest.headers.get('x-magicbell-user-email')).toEqual('person@example.com');
    expect(status.lastRequest.headers.get('x-magicbell-user-external-id')).toBeNull();
  });

  it('sets the x-magicbell-user-external-id request header when external id is provided', async () => {
    const status = server.intercept('get', '/notifications');
    clientSettings.setState({ userEmail: undefined, userExternalId: 'person@example.com' });

    await fetchAPI('/notifications');

    expect(status.lastRequest.headers.get('x-magicbell-user-external-id')).toEqual('person@example.com');
    expect(status.lastRequest.headers.get('x-magicbell-user-email')).toBeNull();
  });

  it('sets the x-magicbell-user-hmac request header when user key is provided', async () => {
    const status = server.intercept('get', '/notifications');
    clientSettings.setState({ userKey: 'fake-hash' });

    await fetchAPI('/notifications');

    expect(status.lastRequest.headers.get('x-magicbell-user-hmac')).toEqual('fake-hash');
  });

  it('throws the original error', async () => {
    server.intercept('get', '/notifications', { status: 404, statusText: 'Not Found' });
    const request = fetchAPI('/notifications');
    await expect(request).rejects.toMatchObject({ status: 404, statusText: 'Not Found' });
  });
});

describe('.postAPI', () => {
  it('sends a POST request', async () => {
    server.intercept('post', '/notifications', { notification: { id: 1 } });

    const response = await postAPI('/notifications', { title: 'Another notification' });
    expect(response).toEqual({ notification: { id: 1 } });
  });

  it('includes the data in the request', async () => {
    const status = server.intercept('post', '/notifications', { notification: { id: 1 } });
    await postAPI('/notifications', { title: 'Another notification' });

    expect(status.lastRequest.body).toEqual({ title: 'Another notification' });
  });

  it('throws the original error', async () => {
    server.intercept('post', '/notifications', { status: 400, statusText: 'Bad Request' });

    const request = postAPI('/notifications', { title: 'Another notification' });
    await expect(request).rejects.toMatchObject({
      status: 400,
      statusText: 'Bad Request',
    });
  });
});

describe('.putAPI', () => {
  it('sends a PUT request', async () => {
    server.intercept('put', '/notifications/1', { notification: { id: 1, title: 'A title' } });

    const response = await putAPI('/notifications/1', { title: 'A title' });
    expect(response).toEqual({ notification: { id: 1, title: 'A title' } });
  });

  it('includes the data in the request', async () => {
    const status = server.intercept('put', '/notifications/1');

    await putAPI('/notifications/1', { title: 'A title' });
    expect(status.lastRequest.body).toEqual({ title: 'A title' });
  });

  it('throws the original error', async () => {
    server.intercept('put', '/notifications/1', { status: 400, statusText: 'Bad Request' });

    await expect(putAPI('/notifications/1', { title: 'Another name' })).rejects.toMatchObject({
      status: 400,
      statusText: 'Bad Request',
    });
  });
});
