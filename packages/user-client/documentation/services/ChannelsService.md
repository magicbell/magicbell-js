# ChannelsService

A list of all methods in the `ChannelsService` service. Click on the method name to view detailed information about that method.

| Methods                                                   | Description |
| :-------------------------------------------------------- | :---------- |
| [getMobilePushApnsTokens](#getmobilepushapnstokens)       |             |
| [saveMobilePushApnsToken](#savemobilepushapnstoken)       |             |
| [getMobilePushApnsToken](#getmobilepushapnstoken)         |             |
| [discardMobilePushApnsToken](#discardmobilepushapnstoken) |             |
| [getMobilePushExpoTokens](#getmobilepushexpotokens)       |             |
| [saveMobilePushExpoToken](#savemobilepushexpotoken)       |             |
| [getMobilePushExpoToken](#getmobilepushexpotoken)         |             |
| [discardMobilePushExpoToken](#discardmobilepushexpotoken) |             |
| [getMobilePushFcmTokens](#getmobilepushfcmtokens)         |             |
| [saveMobilePushFcmToken](#savemobilepushfcmtoken)         |             |
| [getMobilePushFcmToken](#getmobilepushfcmtoken)           |             |
| [discardMobilePushFcmToken](#discardmobilepushfcmtoken)   |             |
| [getSlackTokens](#getslacktokens)                         |             |
| [saveSlackToken](#saveslacktoken)                         |             |
| [getSlackToken](#getslacktoken)                           |             |
| [discardSlackToken](#discardslacktoken)                   |             |
| [getTeamsTokens](#getteamstokens)                         |             |
| [saveTeamsToken](#saveteamstoken)                         |             |
| [getTeamsToken](#getteamstoken)                           |             |
| [discardTeamsToken](#discardteamstoken)                   |             |
| [getWebPushTokens](#getwebpushtokens)                     |             |
| [saveWebPushToken](#savewebpushtoken)                     |             |
| [getWebPushToken](#getwebpushtoken)                       |             |
| [discardWebPushToken](#discardwebpushtoken)               |             |

## getMobilePushApnsTokens

- HTTP Method: `GET`
- Endpoint: `/channels/mobile_push/apns/tokens`

**Return Type**

`ArrayWithMetadataOfApnsToken`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getMobilePushApnsTokens();

  console.log(data);
})();
```

## saveMobilePushApnsToken

- HTTP Method: `POST`
- Endpoint: `/channels/mobile_push/apns/tokens`

**Parameters**

| Name | Type                                | Required | Description       |
| :--- | :---------------------------------- | :------- | :---------------- |
| body | [ApnsToken](../models/ApnsToken.md) | ❌       | The request body. |

**Return Type**

`ApnsToken`

**Example Usage Code Snippet**

```typescript
import { ApnsToken, Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const apnsTokenInstallationId = ApnsTokenInstallationId.DEVELOPMENT;

  const apnsToken: ApnsToken = {
    deviceToken: 'velit enimidcon',
    installationId: apnsTokenInstallationId,
  };

  const { data } = await client.channels.saveMobilePushApnsToken(input);

  console.log(data);
})();
```

## getMobilePushApnsToken

- HTTP Method: `GET`
- Endpoint: `/channels/mobile_push/apns/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`ApnsTokenWithMetadata`

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

- HTTP Method: `GET`
- Endpoint: `/channels/mobile_push/expo/tokens`

**Return Type**

`ArrayWithMetadataOfExpoToken`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getMobilePushExpoTokens();

  console.log(data);
})();
```

## saveMobilePushExpoToken

- HTTP Method: `POST`
- Endpoint: `/channels/mobile_push/expo/tokens`

**Parameters**

| Name | Type                                | Required | Description       |
| :--- | :---------------------------------- | :------- | :---------------- |
| body | [ExpoToken](../models/ExpoToken.md) | ❌       | The request body. |

**Return Type**

`ExpoToken`

**Example Usage Code Snippet**

```typescript
import { Client, ExpoToken } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const expoToken: ExpoToken = {
    deviceToken: 'ad Exce',
  };

  const { data } = await client.channels.saveMobilePushExpoToken(input);

  console.log(data);
})();
```

## getMobilePushExpoToken

- HTTP Method: `GET`
- Endpoint: `/channels/mobile_push/expo/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`ExpoTokenWithMetadata`

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

- HTTP Method: `GET`
- Endpoint: `/channels/mobile_push/fcm/tokens`

**Return Type**

`ArrayWithMetadataOfFcmToken`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getMobilePushFcmTokens();

  console.log(data);
})();
```

## saveMobilePushFcmToken

- HTTP Method: `POST`
- Endpoint: `/channels/mobile_push/fcm/tokens`

**Parameters**

| Name | Type                              | Required | Description       |
| :--- | :-------------------------------- | :------- | :---------------- |
| body | [FcmToken](../models/FcmToken.md) | ❌       | The request body. |

**Return Type**

`FcmToken`

**Example Usage Code Snippet**

```typescript
import { Client, FcmToken } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const fcmTokenInstallationId = FcmTokenInstallationId.DEVELOPMENT;

  const fcmToken: FcmToken = {
    deviceToken: 'dolore officiac',
    installationId: fcmTokenInstallationId,
  };

  const { data } = await client.channels.saveMobilePushFcmToken(input);

  console.log(data);
})();
```

## getMobilePushFcmToken

- HTTP Method: `GET`
- Endpoint: `/channels/mobile_push/fcm/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`FcmTokenWithMetadata`

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

- HTTP Method: `GET`
- Endpoint: `/channels/slack/tokens`

**Return Type**

`ArrayWithMetadataOfSlackToken`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getSlackTokens();

  console.log(data);
})();
```

## saveSlackToken

- HTTP Method: `POST`
- Endpoint: `/channels/slack/tokens`

**Parameters**

| Name | Type                                  | Required | Description       |
| :--- | :------------------------------------ | :------- | :---------------- |
| body | [SlackToken](../models/SlackToken.md) | ❌       | The request body. |

**Return Type**

`SlackToken`

**Example Usage Code Snippet**

```typescript
import { Client, SlackToken } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const oauth: Oauth = {
    channelId: 'channel_id',
    installationId: 'installation_id',
    scope: 'scope',
  };

  const slackTokenWebhook: SlackTokenWebhook = {
    url: 'url',
  };

  const slackToken: SlackToken = {
    oauth: oauth,
    webhook: slackTokenWebhook,
  };

  const { data } = await client.channels.saveSlackToken(input);

  console.log(data);
})();
```

## getSlackToken

- HTTP Method: `GET`
- Endpoint: `/channels/slack/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`SlackTokenWithMetadata`

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

- HTTP Method: `GET`
- Endpoint: `/channels/teams/tokens`

**Return Type**

`ArrayWithMetadataOfTeamsToken`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getTeamsTokens();

  console.log(data);
})();
```

## saveTeamsToken

- HTTP Method: `POST`
- Endpoint: `/channels/teams/tokens`

**Parameters**

| Name | Type                                  | Required | Description       |
| :--- | :------------------------------------ | :------- | :---------------- |
| body | [TeamsToken](../models/TeamsToken.md) | ❌       | The request body. |

**Return Type**

`TeamsToken`

**Example Usage Code Snippet**

```typescript
import { Client, TeamsToken } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const teamsTokenWebhook: TeamsTokenWebhook = {
    url: 'url',
  };

  const teamsToken: TeamsToken = {
    webhook: teamsTokenWebhook,
  };

  const { data } = await client.channels.saveTeamsToken(input);

  console.log(data);
})();
```

## getTeamsToken

- HTTP Method: `GET`
- Endpoint: `/channels/teams/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`TeamsTokenWithMetadata`

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

- HTTP Method: `GET`
- Endpoint: `/channels/web_push/tokens`

**Return Type**

`ArrayWithMetadataOfWebPushToken`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getWebPushTokens();

  console.log(data);
})();
```

## saveWebPushToken

- HTTP Method: `POST`
- Endpoint: `/channels/web_push/tokens`

**Parameters**

| Name | Type                                      | Required | Description       |
| :--- | :---------------------------------------- | :------- | :---------------- |
| body | [WebPushToken](../models/WebPushToken.md) | ❌       | The request body. |

**Return Type**

`WebPushToken`

**Example Usage Code Snippet**

```typescript
import { Client, WebPushToken } from '@magicbell/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const keys: Keys = {
    auth: 'auth',
    p256dh: 'p256dh',
  };

  const webPushToken: WebPushToken = {
    endpoint: 'endpoint',
    keys: keys,
  };

  const { data } = await client.channels.saveWebPushToken(input);

  console.log(data);
})();
```

## getWebPushToken

- HTTP Method: `GET`
- Endpoint: `/channels/web_push/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| tokenId | string | ✅       |             |

**Return Type**

`WebPushTokenWithMetadata`

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
