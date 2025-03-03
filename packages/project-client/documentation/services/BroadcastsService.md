# BroadcastsService

A list of all methods in the `BroadcastsService` service. Click on the method name to view detailed information about that method.

| Methods                             | Description                                                                                                                                                                           |
| :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [listBroadcasts](#listbroadcasts)   | Retrieves a paginated list of broadcasts for the project. Returns basic information about each broadcast including its creation time and status.                                      |
| [createBroadcast](#createbroadcast) | Creates a new broadcast message. When a broadcast is created, it generates individual notifications for relevant users within the project. Only administrators can create broadcasts. |
| [fetchBroadcast](#fetchbroadcast)   | Retrieves detailed information about a specific broadcast by its ID. Includes the broadcast's configuration and current status.                                                       |

## listBroadcasts

Retrieves a paginated list of broadcasts for the project. Returns basic information about each broadcast including its creation time and status.

- HTTP Method: `GET`
- Endpoint: `/broadcasts`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`ArrayOfBroadcasts`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.broadcasts.listBroadcasts({
    limit: 8,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## createBroadcast

Creates a new broadcast message. When a broadcast is created, it generates individual notifications for relevant users within the project. Only administrators can create broadcasts.

- HTTP Method: `POST`
- Endpoint: `/broadcasts`

**Parameters**

| Name | Type                                | Required | Description       |
| :--- | :---------------------------------- | :------- | :---------------- |
| body | [Broadcast](../models/Broadcast.md) | ❌       | The request body. |

**Return Type**

`Broadcast`

**Example Usage Code Snippet**

```typescript
import { Broadcast, Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const email: Email = {
    actionUrl: 'action_url',
    content: 'content',
    title: 'title',
  };

  const inApp: InApp = {
    actionUrl: 'action_url',
    content: 'content',
    title: 'title',
  };

  const mobilePush: MobilePush = {
    actionUrl: 'action_url',
    content: 'content',
    title: 'title',
  };

  const slack: Slack = {
    actionUrl: 'action_url',
    content: 'content',
    title: 'title',
  };

  const sms: Sms = {
    actionUrl: 'action_url',
    content: 'content',
    title: 'title',
  };

  const webPush: WebPush = {
    actionUrl: 'action_url',
    content: 'content',
    title: 'title',
  };

  const overridesChannels: OverridesChannels = {
    email: email,
    inApp: inApp,
    mobilePush: mobilePush,
    slack: slack,
    sms: sms,
    webPush: webPush,
  };

  const providers: Providers = {
    amazonSes: {},
    android: {},
    ios: {},
    mailgun: {},
    postmark: {},
    sendgrid: {},
    slack: {},
  };

  const overrides: Overrides = {
    channels: overridesChannels,
    providers: providers,
  };

  const errors: Errors = {
    message: 'message',
  };

  const statusStatus = StatusStatus.ENQUEUED;

  const summary: Summary = {
    failures: 2,
    total: 9,
  };

  const broadcastStatus: BroadcastStatus = {
    errors: [errors],
    status: statusStatus,
    summary: summary,
  };

  const broadcast: Broadcast = {
    actionUrl: 'action_url',
    category: 'category',
    content: 'content',
    createdAt: 'created_at',
    customAttributes: {},
    id: 'id',
    overrides: overrides,
    recipients: [{}],
    status: broadcastStatus,
    title: 'title',
    topic: 'topic',
  };

  const { data } = await client.broadcasts.createBroadcast(broadcast);

  console.log(data);
})();
```

## fetchBroadcast

Retrieves detailed information about a specific broadcast by its ID. Includes the broadcast's configuration and current status.

- HTTP Method: `GET`
- Endpoint: `/broadcasts/{broadcast_id}`

**Parameters**

| Name        | Type   | Required | Description |
| :---------- | :----- | :------- | :---------- |
| broadcastId | string | ✅       |             |

**Return Type**

`Broadcast`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.broadcasts.fetchBroadcast('broadcast_id');

  console.log(data);
})();
```
