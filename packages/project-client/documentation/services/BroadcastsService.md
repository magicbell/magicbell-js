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
    pageSize: 10,
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

  const category = 'RiB';

  const email: Email = {
    actionUrl: 'labore esse nisi',
    content: 'non incididunt Duis magna minim',
    title: 'aliqua ea elit deserunt',
  };

  const inApp: InApp = {
    actionUrl: 'commodo laborum proident non ea',
    content: 'et ut sed do',
    title: 'sint',
  };

  const mobilePush: MobilePush = {
    actionUrl: 'sunt tempor voluptate occaecat',
    content: 'sed cupidatat do aliquip nisi',
    title: 'adipisicing culpa',
  };

  const slack: Slack = {
    actionUrl: 'et adipisicing Duis fugiat',
    content: 'ex sed aliquip esse Duis',
    title: 'est ipsum ea',
  };

  const sms: Sms = {
    actionUrl: 'et proident amet ipsum irure',
    content: 'magna Ut',
    title: 'in',
  };

  const webPush: WebPush = {
    actionUrl: 'amet in Ut occaecat',
    content: 'enim ut',
    title: 'in dolor eiusmod laborum minim',
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

  const topic = 'cM5OPs/SsM';

  const broadcast: Broadcast = {
    actionUrl: 'minim ut',
    category: category,
    content: 'qui deserunt sed',
    customAttributes: {},
    overrides: overrides,
    recipients: [{}],
    title: 'tempor et quis',
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
