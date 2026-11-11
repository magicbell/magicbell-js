import { afterEach, describe, expect, it, vi } from 'vitest';

import { Client as ProjectClient } from '../src/project-client.js';
import { broadcastRequest } from '../src/project-client/services/broadcasts/models/broadcast.js';
import { Client as UserClient } from '../src/user-client.js';

afterEach(() => vi.unstubAllGlobals());

describe('client validation', () => {
  it('rejects an oversized broadcast recipient list before validating its elements', () => {
    const result = broadcastRequest.safeParse({ title: 'Hello', recipients: Array(1001).fill(0) });

    expect(result.success).toBe(false);
    if (result.success) return;
    expect(result.error.issues.length).toBe(1);
    expect(result.error.issues[0]).toMatchObject({ code: 'too_big', path: ['recipients'], maximum: 1000 });
  });

  it('serializes a broadcast and preserves optional and custom attributes', async () => {
    const fetch = vi
      .fn()
      .mockResolvedValue(
        Response.json(
          { id: 'broadcast-id', title: 'Hello', recipients: [{ external_id: 'user-id' }] },
          { status: 201 },
        ),
      );
    vi.stubGlobal('fetch', fetch);
    const client = new ProjectClient({ token: 'test-token' });

    const response = await client.broadcasts.createBroadcast({
      title: 'Hello',
      recipients: [{ externalId: 'user-id' }],
      customAttributes: { request: 'review' },
    });

    expect(response.data?.id).toBe('broadcast-id');
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({
      title: 'Hello',
      recipients: [{ external_id: 'user-id' }],
      custom_attributes: { request: 'review' },
    });
  });

  it('validates and maps notification responses', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        Response.json({
          data: [
            {
              id: 'notification-id',
              title: 'Hello',
              status: 'unread',
              created_at: '2026-11-11T00:00:00Z',
              updated_at: '2026-11-11T00:00:00Z',
              user_id: 'user-id',
              read_at: null,
            },
          ],
        }),
      ),
    );
    const client = new UserClient({ token: 'test-token' });

    const response = await client.notifications.listNotifications();

    expect(response.data?.data?.[0]).toMatchObject({ id: 'notification-id', userId: 'user-id', readAt: null });
  });
});
