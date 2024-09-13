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

| Name       | Type   | Required | Description |
| :--------- | :----- | :------- | :---------- |
| pageSize   | number | ❌       |             |
| pageBefore | string | ❌       |             |
| pageAfter  | string | ❌       |             |

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
    pageSize: 8,
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

  const category = '3-yOE';

  const email: Email = {
    actionUrl: 'mollit magna nostrud eiusmod',
    content: 'occaecat elit in fugiat sit',
    title: 'Duis',
  };

  const inApp: InApp = {
    actionUrl: 'minim',
    content: 'irure anim aliquip sit in',
    title: 'nisi',
  };

  const mobilePush: MobilePush = {
    actionUrl: 'irure ullamco ut nulla officia',
    content: 'labore aute ipsum',
    title: 'eu nulla Duis',
  };

  const slack: Slack = {
    actionUrl: 'consectetur labore occaecat Ut anim',
    content: 'consectetur aute dolor',
    title: 'qui magna ut dolor',
  };

  const sms: Sms = {
    actionUrl: 'ullamco reprehenderit irure ut id',
    content: 'culpa officia non in consequat',
    title: 'Duis et',
  };

  const webPush: WebPush = {
    actionUrl: 'laboris ut sint',
    content: 'ea incididunt',
    title: 'elit nulla ea voluptate esse',
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

  const topic = '/';

  const broadcast: Broadcast = {
    actionUrl: 'fugiat ullamco ex officia Ut',
    category: category,
    content: 'id adipisicing',
    customAttributes: {},
    overrides: overrides,
    recipients: [{}],
    title: 'fugiat commodo enim deserunt est',
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
