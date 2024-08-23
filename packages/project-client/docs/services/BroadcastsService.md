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

**Return Type**

`BroadcastListResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.broadcasts.listBroadcasts();

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
    actionUrl: 'ipsum esse',
    content: 'sit veniam',
    title: 'in id ex aliqua',
  };

  const inApp: InApp = {
    actionUrl: 'ullamco labore voluptate',
    content: 'consequat magna Excepteur dolor mollit',
    title: 'irure',
  };

  const mobilePush: MobilePush = {
    actionUrl: 'elitdolore adipisicing anim elit deserunt',
    content: 'cupidatat elit',
    title: 'ut',
  };

  const slack: Slack = {
    actionUrl: 'sit commodo consectetur Duis',
    content: 'proident sed quis Lorem',
    title: 'magna reprehenderit ut deserunt nisi',
  };

  const sms: Sms = {
    actionUrl: 'irure Excepteur exercitation',
    content: 'et adipisicing in elit',
    title: 'sint voluptate ipsum cupidatat',
  };

  const webPush: WebPush = {
    actionUrl: 'dolor in elit id',
    content: 'est ea elit exercitation dolore',
    title: 'aute eiusmod ea',
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
    actionUrl: 'Ut aliquip est laboris',
    category: 'sint in eu tempor magna',
    content: 'aliqua ad dolor officia',
    customAttributes: {},
    overrides: overrides,
    recipients: [{}],
    title: 'nisi elit amet laboris tempor',
    topic: 'nulla consequat do incididunt',
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
