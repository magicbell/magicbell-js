# BroadcastsService

A list of all methods in the `BroadcastsService` service. Click on the method name to view detailed information about that method.

| Methods                               | Description                              |
| :------------------------------------ | :--------------------------------------- |
| [list_broadcasts](#list_broadcasts)   | Returns a list of broadcasts             |
| [create_broadcast](#create_broadcast) | Handles the create notification request. |
| [fetch_broadcast](#fetch_broadcast)   | Returns a broadcast                      |

## list_broadcasts

Returns a list of broadcasts

- HTTP Method: `GET`
- Endpoint: `/broadcasts`

**Parameters**

| Name    | Type   | Required | Description                                               |
| :------ | :----- | :------- | :-------------------------------------------------------- |
| page    | number | ❌       | The page number of the paginated response. Defaults to 1. |
| perPage | number | ❌       | The number of items per page. Defaults to 20.             |

**Return Type**

`BroadcastListResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.broadcasts.listBroadcasts({
    page: 8,
    perPage: 2,
  });

  console.log(data);
})();
```

## create_broadcast

Handles the create notification request.

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
    actionUrl: 'nisi ea Duis ipsum',
    content: 'commodo',
    title: 'enim',
  };

  const inApp: InApp = {
    actionUrl: 'commodo reprehenderit',
    content: 'aliqua occaecat',
    title: 'amet',
  };

  const mobilePush: MobilePush = {
    actionUrl: 'essead consectetur elit',
    content: 'nostrud aliqua sed irure',
    title: 'enim dolore',
  };

  const slack: Slack = {
    actionUrl: 'id non occaecat cupidatat ad',
    content: 'nostrud',
    title: 'laborum commodo magna',
  };

  const sms: Sms = {
    actionUrl: 'exdolore elit',
    content: 'Excepteur occaecat eu ipsum',
    title: 'in',
  };

  const webPush: WebPush = {
    actionUrl: 'ipsum magna',
    content: 'eiusmod',
    title: 'cupidatat Lorem sed',
  };

  const channels: Channels = {
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
    channels: channels,
    providers: providers,
  };

  const broadcast: Broadcast = {
    actionUrl: 'sed incididunt',
    category: 'non officia',
    content: 'qui enim sunt ea dolor',
    customAttributes: {},
    overrides: overrides,
    recipients: [{}],
    title: 'quis fugiat',
    topic: 'mollit ut consecte',
  };

  const { data } = await client.broadcasts.createBroadcast(input);

  console.log(data);
})();
```

## fetch_broadcast

Returns a broadcast

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
