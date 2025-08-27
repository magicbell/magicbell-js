# ChannelsService

A list of all methods in the `ChannelsService` service. Click on the method name to view detailed information about that method.

| Methods                                       | Description                                                                                                                                                                                                                                                     |
| :-------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [listInboxTokens](#listinboxtokens)           | Lists all Inbox tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.                                                                                                |
| [saveInboxToken](#saveinboxtoken)             | Saves the Inbox token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.    |
| [fetchInboxToken](#fetchinboxtoken)           | Fetches details of a specific Inbox token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.                                                |
| [deleteInboxToken](#deleteinboxtoken)         | Deletes one of the authenticated user's Inbox tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.                          |
| [listApnsTokens](#listapnstokens)             | Lists all APNs tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.                                                                                                 |
| [saveApnsToken](#saveapnstoken)               | Saves the APNs token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.     |
| [fetchApnsToken](#fetchapnstoken)             | Fetches details of a specific APNs token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.                                                 |
| [deleteApnsToken](#deleteapnstoken)           | Deletes one of the authenticated user's APNs tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.                           |
| [listExpoTokens](#listexpotokens)             | Lists all Expo tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.                                                                                                 |
| [saveExpoToken](#saveexpotoken)               | Saves the Expo token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.     |
| [fetchExpoToken](#fetchexpotoken)             | Fetches details of a specific Expo token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.                                                 |
| [deleteExpoToken](#deleteexpotoken)           | Deletes one of the authenticated user's Expo tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.                           |
| [listFcmTokens](#listfcmtokens)               | Lists all FCM tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.                                                                                                  |
| [saveFcmToken](#savefcmtoken)                 | Saves the FCM token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.      |
| [fetchFcmToken](#fetchfcmtoken)               | Fetches details of a specific FCM token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.                                                  |
| [deleteFcmToken](#deletefcmtoken)             | Deletes one of the authenticated user's FCM tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.                            |
| [listSlackTokens](#listslacktokens)           | Lists all Slack tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.                                                                                                |
| [saveSlackToken](#saveslacktoken)             | Saves the Slack token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.    |
| [fetchSlackToken](#fetchslacktoken)           | Fetches details of a specific Slack token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.                                                |
| [deleteSlackToken](#deleteslacktoken)         | Deletes one of the authenticated user's Slack tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.                          |
| [listTeamsTokens](#listteamstokens)           | Lists all Teams tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.                                                                                                |
| [saveTeamsToken](#saveteamstoken)             | Saves the Teams token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.    |
| [fetchTeamsToken](#fetchteamstoken)           | Fetches details of a specific Teams token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.                                                |
| [deleteTeamsToken](#deleteteamstoken)         | Deletes one of the authenticated user's Teams tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.                          |
| [fetchUserPreferences](#fetchuserpreferences) | Fetch a user's channel delivery preferences.                                                                                                                                                                                                                    |
| [saveUserPreferences](#saveuserpreferences)   | Save a user's channel preferences.                                                                                                                                                                                                                              |
| [listWebPushTokens](#listwebpushtokens)       | Lists all Web Push tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.                                                                                             |
| [saveWebPushToken](#savewebpushtoken)         | Saves the Web Push token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel. |
| [fetchWebPushToken](#fetchwebpushtoken)       | Fetches details of a specific Web Push token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.                                             |
| [deleteWebPushToken](#deletewebpushtoken)     | Deletes one of the authenticated user's Web Push tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.                       |

## listInboxTokens

Lists all Inbox tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.

- HTTP Method: `GET`
- Endpoint: `/channels/in_app/inbox/tokens`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`InboxTokenResponseCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.listInboxTokens({
    limit: 3,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## saveInboxToken

Saves the Inbox token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.

- HTTP Method: `PUT`
- Endpoint: `/channels/in_app/inbox/tokens`

**Parameters**

| Name | Type                                  | Required | Description       |
| :--- | :------------------------------------ | :------- | :---------------- |
| body | [InboxToken](../models/InboxToken.md) | ❌       | The request body. |

**Return Type**

`InboxToken`

**Example Usage Code Snippet**

```typescript
import { Client, InboxToken } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const inboxToken: InboxToken = {
    connectionId: 'connection_id',
    token: 'deserunt nulla ',
  };

  const { data } = await client.channels.saveInboxToken(inboxToken);

  console.log(data);
})();
```

## fetchInboxToken

Fetches details of a specific Inbox token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.

- HTTP Method: `GET`
- Endpoint: `/channels/in_app/inbox/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`InboxTokenResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.fetchInboxToken('token_id');

  console.log(data);
})();
```

## deleteInboxToken

Deletes one of the authenticated user's Inbox tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.

- HTTP Method: `DELETE`
- Endpoint: `/channels/in_app/inbox/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`DiscardResult`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.deleteInboxToken('token_id');

  console.log(data);
})();
```

## listApnsTokens

Lists all APNs tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.

- HTTP Method: `GET`
- Endpoint: `/channels/mobile_push/apns/tokens`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`ApnsTokenCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.listApnsTokens({
    limit: 123,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## saveApnsToken

Saves the APNs token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.

- HTTP Method: `PUT`
- Endpoint: `/channels/mobile_push/apns/tokens`

**Parameters**

| Name | Type                                              | Required | Description       |
| :--- | :------------------------------------------------ | :------- | :---------------- |
| body | [ApnsTokenPayload](../models/ApnsTokenPayload.md) | ❌       | The request body. |

**Return Type**

`ApnsTokenPayload`

**Example Usage Code Snippet**

```typescript
import { ApnsTokenPayload, Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const apnsTokenPayloadInstallationId = ApnsTokenPayloadInstallationId.DEVELOPMENT;

  const apnsTokenPayload: ApnsTokenPayload = {
    appId: 'app_id',
    deviceToken: 'adipisicingoffi',
    installationId: apnsTokenPayloadInstallationId,
  };

  const { data } = await client.channels.saveApnsToken(apnsTokenPayload);

  console.log(data);
})();
```

## fetchApnsToken

Fetches details of a specific APNs token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.

- HTTP Method: `GET`
- Endpoint: `/channels/mobile_push/apns/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`ApnsToken`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.fetchApnsToken('token_id');

  console.log(data);
})();
```

## deleteApnsToken

Deletes one of the authenticated user's APNs tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.

- HTTP Method: `DELETE`
- Endpoint: `/channels/mobile_push/apns/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`DiscardResult`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.deleteApnsToken('token_id');

  console.log(data);
})();
```

## listExpoTokens

Lists all Expo tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.

- HTTP Method: `GET`
- Endpoint: `/channels/mobile_push/expo/tokens`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`ExpoTokenCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.listExpoTokens({
    limit: 3,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## saveExpoToken

Saves the Expo token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.

- HTTP Method: `PUT`
- Endpoint: `/channels/mobile_push/expo/tokens`

**Parameters**

| Name | Type                                              | Required | Description       |
| :--- | :------------------------------------------------ | :------- | :---------------- |
| body | [ExpoTokenPayload](../models/ExpoTokenPayload.md) | ❌       | The request body. |

**Return Type**

`ExpoTokenPayload`

**Example Usage Code Snippet**

```typescript
import { Client, ExpoTokenPayload } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const expoTokenPayload: ExpoTokenPayload = {
    deviceToken: 'device_token',
  };

  const { data } = await client.channels.saveExpoToken(expoTokenPayload);

  console.log(data);
})();
```

## fetchExpoToken

Fetches details of a specific Expo token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.

- HTTP Method: `GET`
- Endpoint: `/channels/mobile_push/expo/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`ExpoToken`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.fetchExpoToken('token_id');

  console.log(data);
})();
```

## deleteExpoToken

Deletes one of the authenticated user's Expo tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.

- HTTP Method: `DELETE`
- Endpoint: `/channels/mobile_push/expo/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`DiscardResult`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.deleteExpoToken('token_id');

  console.log(data);
})();
```

## listFcmTokens

Lists all FCM tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.

- HTTP Method: `GET`
- Endpoint: `/channels/mobile_push/fcm/tokens`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`FcmTokenCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.listFcmTokens({
    limit: 10,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## saveFcmToken

Saves the FCM token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.

- HTTP Method: `PUT`
- Endpoint: `/channels/mobile_push/fcm/tokens`

**Parameters**

| Name | Type                                            | Required | Description       |
| :--- | :---------------------------------------------- | :------- | :---------------- |
| body | [FcmTokenPayload](../models/FcmTokenPayload.md) | ❌       | The request body. |

**Return Type**

`FcmTokenPayload`

**Example Usage Code Snippet**

```typescript
import { Client, FcmTokenPayload } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const fcmTokenPayloadInstallationId = FcmTokenPayloadInstallationId.DEVELOPMENT;

  const fcmTokenPayload: FcmTokenPayload = {
    deviceToken: 'exeuin pariatur',
    installationId: fcmTokenPayloadInstallationId,
  };

  const { data } = await client.channels.saveFcmToken(fcmTokenPayload);

  console.log(data);
})();
```

## fetchFcmToken

Fetches details of a specific FCM token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.

- HTTP Method: `GET`
- Endpoint: `/channels/mobile_push/fcm/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`FcmToken`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.fetchFcmToken('token_id');

  console.log(data);
})();
```

## deleteFcmToken

Deletes one of the authenticated user's FCM tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.

- HTTP Method: `DELETE`
- Endpoint: `/channels/mobile_push/fcm/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`DiscardResult`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.deleteFcmToken('token_id');

  console.log(data);
})();
```

## listSlackTokens

Lists all Slack tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.

- HTTP Method: `GET`
- Endpoint: `/channels/slack/tokens`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`SlackTokenCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.listSlackTokens({
    limit: 2,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## saveSlackToken

Saves the Slack token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.

- HTTP Method: `PUT`
- Endpoint: `/channels/slack/tokens`

**Parameters**

| Name | Type                                                | Required | Description       |
| :--- | :-------------------------------------------------- | :------- | :---------------- |
| body | [SlackTokenPayload](../models/SlackTokenPayload.md) | ❌       | The request body. |

**Return Type**

`SlackTokenPayload`

**Example Usage Code Snippet**

```typescript
import { Client, SlackTokenPayload } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const slackTokenPayloadOauth: SlackTokenPayloadOauth = {
    channelId: 'channel_id',
    installationId: 'installation_id',
    scope: 'scope',
  };

  const slackTokenPayloadWebhook: SlackTokenPayloadWebhook = {
    url: 'url',
  };

  const slackTokenPayload: SlackTokenPayload = {
    oauth: slackTokenPayloadOauth,
    webhook: slackTokenPayloadWebhook,
  };

  const { data } = await client.channels.saveSlackToken(slackTokenPayload);

  console.log(data);
})();
```

## fetchSlackToken

Fetches details of a specific Slack token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.

- HTTP Method: `GET`
- Endpoint: `/channels/slack/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`SlackToken`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.fetchSlackToken('token_id');

  console.log(data);
})();
```

## deleteSlackToken

Deletes one of the authenticated user's Slack tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.

- HTTP Method: `DELETE`
- Endpoint: `/channels/slack/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`DiscardResult`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.deleteSlackToken('token_id');

  console.log(data);
})();
```

## listTeamsTokens

Lists all Teams tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.

- HTTP Method: `GET`
- Endpoint: `/channels/teams/tokens`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`TeamsTokenCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.listTeamsTokens({
    limit: 9,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## saveTeamsToken

Saves the Teams token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.

- HTTP Method: `PUT`
- Endpoint: `/channels/teams/tokens`

**Parameters**

| Name | Type                                                | Required | Description       |
| :--- | :-------------------------------------------------- | :------- | :---------------- |
| body | [TeamsTokenPayload](../models/TeamsTokenPayload.md) | ❌       | The request body. |

**Return Type**

`TeamsTokenPayload`

**Example Usage Code Snippet**

```typescript
import { Client, TeamsTokenPayload } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const teamsTokenPayloadWebhook: TeamsTokenPayloadWebhook = {
    url: 'url',
  };

  const teamsTokenPayload: TeamsTokenPayload = {
    webhook: teamsTokenPayloadWebhook,
  };

  const { data } = await client.channels.saveTeamsToken(teamsTokenPayload);

  console.log(data);
})();
```

## fetchTeamsToken

Fetches details of a specific Teams token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.

- HTTP Method: `GET`
- Endpoint: `/channels/teams/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`TeamsToken`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.fetchTeamsToken('token_id');

  console.log(data);
})();
```

## deleteTeamsToken

Deletes one of the authenticated user's Teams tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.

- HTTP Method: `DELETE`
- Endpoint: `/channels/teams/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`DiscardResult`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.deleteTeamsToken('token_id');

  console.log(data);
})();
```

## fetchUserPreferences

Fetch a user's channel delivery preferences.

- HTTP Method: `GET`
- Endpoint: `/channels/user_preferences`

**Return Type**

`UserPreferences`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.fetchUserPreferences();

  console.log(data);
})();
```

## saveUserPreferences

Save a user's channel preferences.

- HTTP Method: `PUT`
- Endpoint: `/channels/user_preferences`

**Parameters**

| Name | Type                                            | Required | Description       |
| :--- | :---------------------------------------------- | :------- | :---------------- |
| body | [UserPreferences](../models/UserPreferences.md) | ❌       | The request body. |

**Example Usage Code Snippet**

```typescript
import { Client, UserPreferences } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const channels: Channels = {
    enabled: true,
    name: 'name',
  };

  const categories: Categories = {
    channels: [channels],
    key: 'key',
    label: 'label',
  };

  const userPreferences: UserPreferences = {
    categories: [categories],
  };

  const { data } = await client.channels.saveUserPreferences(userPreferences);

  console.log(data);
})();
```

## listWebPushTokens

Lists all Web Push tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.

- HTTP Method: `GET`
- Endpoint: `/channels/web_push/tokens`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`WebPushTokenCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.listWebPushTokens({
    limit: 9,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## saveWebPushToken

Saves the Web Push token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.

- HTTP Method: `PUT`
- Endpoint: `/channels/web_push/tokens`

**Parameters**

| Name | Type                                                    | Required | Description       |
| :--- | :------------------------------------------------------ | :------- | :---------------- |
| body | [WebPushTokenPayload](../models/WebPushTokenPayload.md) | ❌       | The request body. |

**Return Type**

`WebPushTokenPayload`

**Example Usage Code Snippet**

```typescript
import { Client, WebPushTokenPayload } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const webPushTokenPayloadKeys: WebPushTokenPayloadKeys = {
    auth: 'auth',
    p256dh: 'p256dh',
  };

  const webPushTokenPayload: WebPushTokenPayload = {
    endpoint: 'endpoint',
    keys: webPushTokenPayloadKeys,
  };

  const { data } = await client.channels.saveWebPushToken(webPushTokenPayload);

  console.log(data);
})();
```

## fetchWebPushToken

Fetches details of a specific Web Push token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.

- HTTP Method: `GET`
- Endpoint: `/channels/web_push/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`WebPushToken`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.fetchWebPushToken('token_id');

  console.log(data);
})();
```

## deleteWebPushToken

Deletes one of the authenticated user's Web Push tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.

- HTTP Method: `DELETE`
- Endpoint: `/channels/web_push/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`DiscardResult`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.deleteWebPushToken('token_id');

  console.log(data);
})();
```
