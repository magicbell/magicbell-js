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

**Parameters**

| Name       | Type     | Required | Description |
| :--------- | :------- | :------- | :---------- |
| pageSize   | `number` | ❌       |             |
| pageBefore | `string` | ❌       |             |
| pageAfter  | `string` | ❌       |             |

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
    pageSize: 9,
    pageBefore: 'page[before]',
    pageAfter: 'page[after]',
  });

  console.log(data);
})();
```

## createBroadcast

Handles the create notification request.

- HTTP Method: `POST`
- Endpoint: `/broadcasts`

**Parameters**

| Name | Type                                  | Required | Description       |
| :--- | :------------------------------------ | :------- | :---------------- |
| body | `[Broadcast](../models/Broadcast.md)` | ❌       | The request body. |

**Return Type**

`Broadcast`

**Example Usage Code Snippet**

```typescript
import { Broadcast, Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const category = 'mviFvt';

  const email: Email = {
    actionUrl: 'Utullamco aute dolore magna in',
    content: 'incididunt',
    title: 'dolor Excepteur id ad sit',
  };

  const inApp: InApp = {
    actionUrl: 'esse laboris ea',
    content: 'est enim',
    title: 'aliquip',
  };

  const mobilePush: MobilePush = {
    actionUrl: 'quis ipsum',
    content: 'fugiat Lorem mollit cupidatat',
    title: 'laborum sunt Ut mollit',
  };

  const slack: Slack = {
    actionUrl: 'labore qui ullamco amet Lorem',
    content: 'tempor reprehenderit enim dolor',
    title: 'eu nisi velit fugiat',
  };

  const sms: Sms = {
    actionUrl: 'culpa',
    content: 'anim cillum eiusmod',
    title: 'adipisicing anim reprehenderit',
  };

  const webPush: WebPush = {
    actionUrl: 'nonaliqua ipsum dolor',
    content: 'consequat laboris do eu',
    title: 'aliquip',
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

  const topic = 'oFVCUBZ_sT';

  const broadcast: Broadcast = {
    actionUrl: 'sed sunt',
    category: category,
    content: 'nostrud sit dolor',
    customAttributes: {},
    overrides: overrides,
    recipients: [{}],
    title: 'ex Duis',
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

| Name        | Type     | Required | Description |
| :---------- | :------- | :------- | :---------- |
| broadcastId | `string` | ✅       |             |

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
