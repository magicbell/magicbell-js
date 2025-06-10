# ChannelsService

A list of all methods in the `ChannelsService` service. Click on the method name to view detailed information about that method.

| Methods                                           | Description                                                                                                                                                                                                                                                   |
| :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [saveChannelsConfig](#savechannelsconfig)         | Save the channels configuration for a given key.                                                                                                                                                                                                              |
| [fetchChannelsConfig](#fetchchannelsconfig)       | Fetches the channels config for a given key.                                                                                                                                                                                                                  |
| [listUserInboxTokens](#listuserinboxtokens)       | Lists all Inbox tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.                                                                |
| [fetchUserInboxToken](#fetchuserinboxtoken)       | Fetches a specific Inbox token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.    |
| [deleteUserInboxToken](#deleteuserinboxtoken)     | Deletes a specific user's Inbox token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.          |
| [listUserApnsTokens](#listuserapnstokens)         | Lists all APNs tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.                                                                 |
| [fetchUserApnsToken](#fetchuserapnstoken)         | Fetches a specific APNs token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.     |
| [deleteUserApnsToken](#deleteuserapnstoken)       | Deletes a specific user's APNs token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.           |
| [listUserExpoTokens](#listuserexpotokens)         | Lists all Expo tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.                                                                 |
| [fetchUserExpoToken](#fetchuserexpotoken)         | Fetches a specific Expo token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.     |
| [deleteUserExpoToken](#deleteuserexpotoken)       | Deletes a specific user's Expo token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.           |
| [listUserFcmTokens](#listuserfcmtokens)           | Lists all FCM tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.                                                                  |
| [fetchUserFcmToken](#fetchuserfcmtoken)           | Fetches a specific FCM token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.      |
| [deleteUserFcmToken](#deleteuserfcmtoken)         | Deletes a specific user's FCM token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.            |
| [listUserSlackTokens](#listuserslacktokens)       | Lists all Slack tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.                                                                |
| [fetchUserSlackToken](#fetchuserslacktoken)       | Fetches a specific Slack token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.    |
| [deleteUserSlackToken](#deleteuserslacktoken)     | Deletes a specific user's Slack token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.          |
| [listUserTeamsTokens](#listuserteamstokens)       | Lists all Teams tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.                                                                |
| [fetchUserTeamsToken](#fetchuserteamstoken)       | Fetches a specific Teams token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.    |
| [deleteUserTeamsToken](#deleteuserteamstoken)     | Deletes a specific user's Teams token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.          |
| [listUserWebPushTokens](#listuserwebpushtokens)   | Lists all Web Push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.                                                             |
| [fetchUserWebPushToken](#fetchuserwebpushtoken)   | Fetches a specific Web Push token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata. |
| [deleteUserWebPushToken](#deleteuserwebpushtoken) | Deletes a specific user's Web Push token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.       |

## saveChannelsConfig

Save the channels configuration for a given key.

- HTTP Method: `PUT`
- Endpoint: `/channels`

**Parameters**

| Name | Type                                                          | Required | Description       |
| :--- | :------------------------------------------------------------ | :------- | :---------------- |
| body | [CategoryDeliveryConfig](../models/CategoryDeliveryConfig.md) | ❌       | The request body. |

**Return Type**

`CategoryDeliveryConfig`

**Example Usage Code Snippet**

```typescript
import { CategoryDeliveryConfig, Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const channel = Channel.IN_APP;

  const categoryDeliveryConfigChannels: CategoryDeliveryConfigChannels = {
    channel: channel,
    delay: 8,
    if: 'if',
  };

  const categoryDeliveryConfig: CategoryDeliveryConfig = {
    channels: [categoryDeliveryConfigChannels],
    disabled: true,
    key: 'key',
  };

  const { data } = await client.channels.saveChannelsConfig(categoryDeliveryConfig);

  console.log(data);
})();
```

## fetchChannelsConfig

Fetches the channels config for a given key.

- HTTP Method: `GET`
- Endpoint: `/channels/{key}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| key  | string | ✅       |             |

**Return Type**

`CategoryDeliveryConfig`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.fetchChannelsConfig('key');

  console.log(data);
})();
```

## listUserInboxTokens

Lists all Inbox tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/in_app/inbox/tokens`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| userId        | string | ✅       |             |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`InboxTokenResponseCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.listUserInboxTokens('user_id', {
    limit: 1,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## fetchUserInboxToken

Fetches a specific Inbox token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/in_app/inbox/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`InboxTokenResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.fetchUserInboxToken('user_id', 'token_id');

  console.log(data);
})();
```

## deleteUserInboxToken

Deletes a specific user's Inbox token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.

- HTTP Method: `DELETE`
- Endpoint: `/users/{user_id}/channels/in_app/inbox/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`DiscardResult`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.deleteUserInboxToken('user_id', 'token_id');

  console.log(data);
})();
```

## listUserApnsTokens

Lists all APNs tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/mobile_push/apns/tokens`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| userId        | string | ✅       |             |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`ApnsTokenCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.listUserApnsTokens('user_id', {
    limit: 6,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## fetchUserApnsToken

Fetches a specific APNs token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/mobile_push/apns/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`ApnsToken`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.fetchUserApnsToken('user_id', 'token_id');

  console.log(data);
})();
```

## deleteUserApnsToken

Deletes a specific user's APNs token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.

- HTTP Method: `DELETE`
- Endpoint: `/users/{user_id}/channels/mobile_push/apns/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`DiscardResult`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.deleteUserApnsToken('user_id', 'token_id');

  console.log(data);
})();
```

## listUserExpoTokens

Lists all Expo tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/mobile_push/expo/tokens`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| userId        | string | ✅       |             |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`ExpoTokenCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.listUserExpoTokens('user_id', {
    limit: 6,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## fetchUserExpoToken

Fetches a specific Expo token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/mobile_push/expo/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`ExpoToken`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.fetchUserExpoToken('user_id', 'token_id');

  console.log(data);
})();
```

## deleteUserExpoToken

Deletes a specific user's Expo token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.

- HTTP Method: `DELETE`
- Endpoint: `/users/{user_id}/channels/mobile_push/expo/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`DiscardResult`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.deleteUserExpoToken('user_id', 'token_id');

  console.log(data);
})();
```

## listUserFcmTokens

Lists all FCM tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/mobile_push/fcm/tokens`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| userId        | string | ✅       |             |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`FcmTokenCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.listUserFcmTokens('user_id', {
    limit: 1,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## fetchUserFcmToken

Fetches a specific FCM token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/mobile_push/fcm/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`FcmToken`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.fetchUserFcmToken('user_id', 'token_id');

  console.log(data);
})();
```

## deleteUserFcmToken

Deletes a specific user's FCM token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.

- HTTP Method: `DELETE`
- Endpoint: `/users/{user_id}/channels/mobile_push/fcm/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`DiscardResult`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.deleteUserFcmToken('user_id', 'token_id');

  console.log(data);
})();
```

## listUserSlackTokens

Lists all Slack tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/slack/tokens`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| userId        | string | ✅       |             |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`SlackTokenCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.listUserSlackTokens('user_id', {
    limit: 9,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## fetchUserSlackToken

Fetches a specific Slack token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/slack/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`SlackToken`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.fetchUserSlackToken('user_id', 'token_id');

  console.log(data);
})();
```

## deleteUserSlackToken

Deletes a specific user's Slack token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.

- HTTP Method: `DELETE`
- Endpoint: `/users/{user_id}/channels/slack/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`DiscardResult`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.deleteUserSlackToken('user_id', 'token_id');

  console.log(data);
})();
```

## listUserTeamsTokens

Lists all Teams tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/teams/tokens`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| userId        | string | ✅       |             |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`TeamsTokenCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.listUserTeamsTokens('user_id', {
    limit: 6,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## fetchUserTeamsToken

Fetches a specific Teams token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/teams/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`TeamsToken`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.fetchUserTeamsToken('user_id', 'token_id');

  console.log(data);
})();
```

## deleteUserTeamsToken

Deletes a specific user's Teams token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.

- HTTP Method: `DELETE`
- Endpoint: `/users/{user_id}/channels/teams/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`DiscardResult`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.deleteUserTeamsToken('user_id', 'token_id');

  console.log(data);
})();
```

## listUserWebPushTokens

Lists all Web Push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/web_push/tokens`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| userId        | string | ✅       |             |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`WebPushTokenCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.listUserWebPushTokens('user_id', {
    limit: 1,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## fetchUserWebPushToken

Fetches a specific Web Push token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/web_push/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`WebPushToken`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.fetchUserWebPushToken('user_id', 'token_id');

  console.log(data);
})();
```

## deleteUserWebPushToken

Deletes a specific user's Web Push token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.

- HTTP Method: `DELETE`
- Endpoint: `/users/{user_id}/channels/web_push/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`DiscardResult`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.deleteUserWebPushToken('user_id', 'token_id');

  console.log(data);
})();
```
