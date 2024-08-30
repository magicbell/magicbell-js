# BroadcastsService

A list of all methods in the `BroadcastsService` service. Click on the method name to view detailed information about that method.

| Methods                             | Description                              |
| :---------------------------------- | :--------------------------------------- |
| [listBroadcasts](#listbroadcasts)   | Returns a list of broadcasts             |
| [createBroadcast](#createbroadcast) | Handles the create notification request. |
| [fetchBroadcast](#fetchbroadcast)   | Returns a broadcast                      |

## listBroadcasts

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

## createBroadcast

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

  const category = 'Mx';

  const email: Email = {
    actionUrl: 'laborum commodo magna',
    content: 'exdolore elit',
    title: 'Excepteur occaecat eu ipsum',
  };

  const inApp: InApp = {
    actionUrl: 'inest ea elit exercitation dolore',
    content: 'aute eiusmod ea',
    title: 'nisi elit amet laboris tempor',
  };

  const mobilePush: MobilePush = {
    actionUrl: 'nulla consequat do incididunt',
    content: 'incididunt',
    title: 'dolore labore',
  };

  const slack: Slack = {
    actionUrl: 'sunt ullamco esse',
    content: 'aliqua amet',
    title: 'aliquip',
  };

  const sms: Sms = {
    actionUrl: 'sit Excepteur',
    content: 'incididunt laboris',
    title: 'qui',
  };

  const webPush: WebPush = {
    actionUrl: 'Excepteur laboris est',
    content: 'veniam sed ullamco',
    title: 'volupta',
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

  const topic = 'sPebCt_M0';

  const broadcast: Broadcast = {
    actionUrl: 'tempor enim',
    category: category,
    content: 'nostrud',
    customAttributes: {},
    overrides: overrides,
    recipients: [{}],
    title: 'reprehenderit culpa aliqua ',
    topic: topic,
  };

  const { data } = await client.broadcasts.createBroadcast(input);

  console.log(data);
})();
```

## fetchBroadcast

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
