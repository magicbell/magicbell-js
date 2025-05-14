# ChannelsService

A list of all methods in the `ChannelsService` service. Click on the method name to view detailed information about that method.

| Methods                                                   | Description                                                                                                                                                                                                                                                      |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [getInAppInboxTokens](#getinappinboxtokens)               | Lists all in_app tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.                                                                                                |
| [saveInAppInboxToken](#saveinappinboxtoken)               | Saves a in_app token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.      |
| [getInAppInboxToken](#getinappinboxtoken)                 | Retrieves details of a specific in_app token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.                                              |
| [discardInAppInboxToken](#discardinappinboxtoken)         | Revokes one of the authenticated user's in_app tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.                          |
| [getMobilePushApnsTokens](#getmobilepushapnstokens)       | Lists all mobile_push tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.                                                                                           |
| [saveMobilePushApnsToken](#savemobilepushapnstoken)       | Saves a mobile_push token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel. |
| [getMobilePushApnsToken](#getmobilepushapnstoken)         | Retrieves details of a specific mobile_push token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.                                         |
| [discardMobilePushApnsToken](#discardmobilepushapnstoken) | Revokes one of the authenticated user's mobile_push tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.                     |
| [getMobilePushExpoTokens](#getmobilepushexpotokens)       | Lists all mobile_push tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.                                                                                           |
| [saveMobilePushExpoToken](#savemobilepushexpotoken)       | Saves a mobile_push token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel. |
| [getMobilePushExpoToken](#getmobilepushexpotoken)         | Retrieves details of a specific mobile_push token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.                                         |
| [discardMobilePushExpoToken](#discardmobilepushexpotoken) | Revokes one of the authenticated user's mobile_push tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.                     |
| [getMobilePushFcmTokens](#getmobilepushfcmtokens)         | Lists all mobile_push tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.                                                                                           |
| [saveMobilePushFcmToken](#savemobilepushfcmtoken)         | Saves a mobile_push token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel. |
| [getMobilePushFcmToken](#getmobilepushfcmtoken)           | Retrieves details of a specific mobile_push token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.                                         |
| [discardMobilePushFcmToken](#discardmobilepushfcmtoken)   | Revokes one of the authenticated user's mobile_push tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.                     |
| [getSlackTokens](#getslacktokens)                         | Lists all slack tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.                                                                                                 |
| [saveSlackToken](#saveslacktoken)                         | Saves a slack token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.       |
| [getSlackToken](#getslacktoken)                           | Retrieves details of a specific slack token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.                                               |
| [discardSlackToken](#discardslacktoken)                   | Revokes one of the authenticated user's slack tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.                           |
| [getTeamsTokens](#getteamstokens)                         | Lists all teams tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.                                                                                                 |
| [saveTeamsToken](#saveteamstoken)                         | Saves a teams token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.       |
| [getTeamsToken](#getteamstoken)                           | Retrieves details of a specific teams token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.                                               |
| [discardTeamsToken](#discardteamstoken)                   | Revokes one of the authenticated user's teams tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.                           |
| [getWebPushTokens](#getwebpushtokens)                     | Lists all web_push tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.                                                                                              |
| [saveWebPushToken](#savewebpushtoken)                     | Saves a web_push token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.    |
| [getWebPushToken](#getwebpushtoken)                       | Retrieves details of a specific web_push token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.                                            |
| [discardWebPushToken](#discardwebpushtoken)               | Revokes one of the authenticated user's web_push tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.                        |

## getInAppInboxTokens

Lists all in_app tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getInAppInboxTokens({
    limit: 1,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## saveInAppInboxToken

Saves a in_app token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.

- HTTP Method: `POST`
- Endpoint: `/channels/in_app/inbox/tokens`

**Parameters**

| Name | Type                                  | Required | Description       |
| :--- | :------------------------------------ | :------- | :---------------- |
| body | [InboxToken](../models/InboxToken.md) | ❌       | The request body. |

**Return Type**

`InboxToken`

**Example Usage Code Snippet**

```typescript
import { Client, InboxToken } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const inboxToken: InboxToken = {
    connectionId: 'connection_id',
    token: 'enim reprehende',
  };

  const { data } = await client.channels.saveInAppInboxToken(inboxToken);

  console.log(data);
})();
```

## getInAppInboxToken

Retrieves details of a specific in_app token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getInAppInboxToken('token_id');

  console.log(data);
})();
```

## discardInAppInboxToken

Revokes one of the authenticated user's in_app tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.discardInAppInboxToken('token_id');

  console.log(data);
})();
```

## getMobilePushApnsTokens

Lists all mobile_push tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getMobilePushApnsTokens({
    limit: 1,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## saveMobilePushApnsToken

Saves a mobile_push token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.

- HTTP Method: `POST`
- Endpoint: `/channels/mobile_push/apns/tokens`

**Parameters**

| Name | Type                                              | Required | Description       |
| :--- | :------------------------------------------------ | :------- | :---------------- |
| body | [ApnsTokenPayload](../models/ApnsTokenPayload.md) | ❌       | The request body. |

**Return Type**

`ApnsTokenPayload`

**Example Usage Code Snippet**

```typescript
import { ApnsTokenPayload, Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const apnsTokenPayloadInstallationId = ApnsTokenPayloadInstallationId.DEVELOPMENT;

  const apnsTokenPayload: ApnsTokenPayload = {
    appId: 'app_id',
    deviceToken: 'Duis dolore com',
    installationId: apnsTokenPayloadInstallationId,
  };

  const { data } = await client.channels.saveMobilePushApnsToken(apnsTokenPayload);

  console.log(data);
})();
```

## getMobilePushApnsToken

Retrieves details of a specific mobile_push token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getMobilePushApnsToken('token_id');

  console.log(data);
})();
```

## discardMobilePushApnsToken

Revokes one of the authenticated user's mobile_push tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.discardMobilePushApnsToken('token_id');

  console.log(data);
})();
```

## getMobilePushExpoTokens

Lists all mobile_push tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getMobilePushExpoTokens({
    limit: 5,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## saveMobilePushExpoToken

Saves a mobile_push token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.

- HTTP Method: `POST`
- Endpoint: `/channels/mobile_push/expo/tokens`

**Parameters**

| Name | Type                                              | Required | Description       |
| :--- | :------------------------------------------------ | :------- | :---------------- |
| body | [ExpoTokenPayload](../models/ExpoTokenPayload.md) | ❌       | The request body. |

**Return Type**

`ExpoTokenPayload`

**Example Usage Code Snippet**

```typescript
import { Client, ExpoTokenPayload } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const expoTokenPayload: ExpoTokenPayload = {
    deviceToken: 'device_token',
  };

  const { data } = await client.channels.saveMobilePushExpoToken(expoTokenPayload);

  console.log(data);
})();
```

## getMobilePushExpoToken

Retrieves details of a specific mobile_push token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getMobilePushExpoToken('token_id');

  console.log(data);
})();
```

## discardMobilePushExpoToken

Revokes one of the authenticated user's mobile_push tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.discardMobilePushExpoToken('token_id');

  console.log(data);
})();
```

## getMobilePushFcmTokens

Lists all mobile_push tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getMobilePushFcmTokens({
    limit: 4,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## saveMobilePushFcmToken

Saves a mobile_push token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.

- HTTP Method: `POST`
- Endpoint: `/channels/mobile_push/fcm/tokens`

**Parameters**

| Name | Type                                            | Required | Description       |
| :--- | :---------------------------------------------- | :------- | :---------------- |
| body | [FcmTokenPayload](../models/FcmTokenPayload.md) | ❌       | The request body. |

**Return Type**

`FcmTokenPayload`

**Example Usage Code Snippet**

```typescript
import { Client, FcmTokenPayload } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const fcmTokenPayloadInstallationId = FcmTokenPayloadInstallationId.DEVELOPMENT;

  const fcmTokenPayload: FcmTokenPayload = {
    deviceToken: 'laborum esse co',
    installationId: fcmTokenPayloadInstallationId,
  };

  const { data } = await client.channels.saveMobilePushFcmToken(fcmTokenPayload);

  console.log(data);
})();
```

## getMobilePushFcmToken

Retrieves details of a specific mobile_push token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getMobilePushFcmToken('token_id');

  console.log(data);
})();
```

## discardMobilePushFcmToken

Revokes one of the authenticated user's mobile_push tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.discardMobilePushFcmToken('token_id');

  console.log(data);
})();
```

## getSlackTokens

Lists all slack tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getSlackTokens({
    limit: 10,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## saveSlackToken

Saves a slack token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.

- HTTP Method: `POST`
- Endpoint: `/channels/slack/tokens`

**Parameters**

| Name | Type                                                | Required | Description       |
| :--- | :-------------------------------------------------- | :------- | :---------------- |
| body | [SlackTokenPayload](../models/SlackTokenPayload.md) | ❌       | The request body. |

**Return Type**

`SlackTokenPayload`

**Example Usage Code Snippet**

```typescript
import { Client, SlackTokenPayload } from '@magicbell/user-client';

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

## getSlackToken

Retrieves details of a specific slack token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getSlackToken('token_id');

  console.log(data);
})();
```

## discardSlackToken

Revokes one of the authenticated user's slack tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.discardSlackToken('token_id');

  console.log(data);
})();
```

## getTeamsTokens

Lists all teams tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getTeamsTokens({
    limit: 2,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## saveTeamsToken

Saves a teams token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.

- HTTP Method: `POST`
- Endpoint: `/channels/teams/tokens`

**Parameters**

| Name | Type                                                | Required | Description       |
| :--- | :-------------------------------------------------- | :------- | :---------------- |
| body | [TeamsTokenPayload](../models/TeamsTokenPayload.md) | ❌       | The request body. |

**Return Type**

`TeamsTokenPayload`

**Example Usage Code Snippet**

```typescript
import { Client, TeamsTokenPayload } from '@magicbell/user-client';

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

## getTeamsToken

Retrieves details of a specific teams token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getTeamsToken('token_id');

  console.log(data);
})();
```

## discardTeamsToken

Revokes one of the authenticated user's teams tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.discardTeamsToken('token_id');

  console.log(data);
})();
```

## getWebPushTokens

Lists all web_push tokens belonging to the authenticated user. Returns a paginated list of tokens, including their status, creation dates, and associated metadata.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getWebPushTokens({
    limit: 2,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## saveWebPushToken

Saves a web_push token for the authenticated user. This token serves as a credential for accessing channel-specific functionality. Each token is unique to the user and channel combination, allowing for direct communication with the user via the channel.

- HTTP Method: `POST`
- Endpoint: `/channels/web_push/tokens`

**Parameters**

| Name | Type                                                    | Required | Description       |
| :--- | :------------------------------------------------------ | :------- | :---------------- |
| body | [WebPushTokenPayload](../models/WebPushTokenPayload.md) | ❌       | The request body. |

**Return Type**

`WebPushTokenPayload`

**Example Usage Code Snippet**

```typescript
import { Client, WebPushTokenPayload } from '@magicbell/user-client';

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

## getWebPushToken

Retrieves details of a specific web_push token belonging to the authenticated user. Returns information about the token's status, creation date, and any associated metadata. Users can only access their own tokens.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getWebPushToken('token_id');

  console.log(data);
})();
```

## discardWebPushToken

Revokes one of the authenticated user's web_push tokens. This permanently invalidates the specified token, preventing it from being used for future channel access. This action cannot be undone. Users can only revoke their own tokens.

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
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.discardWebPushToken('token_id');

  console.log(data);
})();
```
