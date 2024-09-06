# ChannelsService

A list of all methods in the `ChannelsService` service. Click on the method name to view detailed information about that method.

| Methods                                                           | Description |
| :---------------------------------------------------------------- | :---------- |
| [getMobilePushApnsUserTokens](#getmobilepushapnsusertokens)       |             |
| [getMobilePushApnsUserToken](#getmobilepushapnsusertoken)         |             |
| [discardMobilePushApnsUserToken](#discardmobilepushapnsusertoken) |             |
| [getMobilePushExpoUserTokens](#getmobilepushexpousertokens)       |             |
| [getMobilePushExpoUserToken](#getmobilepushexpousertoken)         |             |
| [discardMobilePushExpoUserToken](#discardmobilepushexpousertoken) |             |
| [getMobilePushFcmUserTokens](#getmobilepushfcmusertokens)         |             |
| [getMobilePushFcmUserToken](#getmobilepushfcmusertoken)           |             |
| [discardMobilePushFcmUserToken](#discardmobilepushfcmusertoken)   |             |
| [getSlackUserTokens](#getslackusertokens)                         |             |
| [getSlackUserToken](#getslackusertoken)                           |             |
| [discardSlackUserToken](#discardslackusertoken)                   |             |
| [getTeamsUserTokens](#getteamsusertokens)                         |             |
| [getTeamsUserToken](#getteamsusertoken)                           |             |
| [discardTeamsUserToken](#discardteamsusertoken)                   |             |
| [getWebPushUserTokens](#getwebpushusertokens)                     |             |
| [getWebPushUserToken](#getwebpushusertoken)                       |             |
| [discardWebPushUserToken](#discardwebpushusertoken)               |             |

## getMobilePushApnsUserTokens

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/mobile_push/apns/tokens`

**Parameters**

| Name   | Type   | Required | Description |
| :----- | :----- | :------- | :---------- |
| userId | string | ✅       |             |

**Return Type**

`ArrayWithMetadataOfApnsToken`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getMobilePushApnsUserTokens('user_id');

  console.log(data);
})();
```

## getMobilePushApnsUserToken

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/mobile_push/apns/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`ApnsTokenWithMetadata`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getMobilePushApnsUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## discardMobilePushApnsUserToken

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
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.discardMobilePushApnsUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## getMobilePushExpoUserTokens

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/mobile_push/expo/tokens`

**Parameters**

| Name   | Type   | Required | Description |
| :----- | :----- | :------- | :---------- |
| userId | string | ✅       |             |

**Return Type**

`ArrayWithMetadataOfExpoToken`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getMobilePushExpoUserTokens('user_id');

  console.log(data);
})();
```

## getMobilePushExpoUserToken

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/mobile_push/expo/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`ExpoTokenWithMetadata`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getMobilePushExpoUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## discardMobilePushExpoUserToken

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
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.discardMobilePushExpoUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## getMobilePushFcmUserTokens

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/mobile_push/fcm/tokens`

**Parameters**

| Name   | Type   | Required | Description |
| :----- | :----- | :------- | :---------- |
| userId | string | ✅       |             |

**Return Type**

`ArrayWithMetadataOfFcmToken`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getMobilePushFcmUserTokens('user_id');

  console.log(data);
})();
```

## getMobilePushFcmUserToken

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/mobile_push/fcm/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`FcmTokenWithMetadata`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getMobilePushFcmUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## discardMobilePushFcmUserToken

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
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.discardMobilePushFcmUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## getSlackUserTokens

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/slack/tokens`

**Parameters**

| Name   | Type   | Required | Description |
| :----- | :----- | :------- | :---------- |
| userId | string | ✅       |             |

**Return Type**

`ArrayWithMetadataOfSlackToken`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getSlackUserTokens('user_id');

  console.log(data);
})();
```

## getSlackUserToken

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/slack/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`SlackTokenWithMetadata`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getSlackUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## discardSlackUserToken

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
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.discardSlackUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## getTeamsUserTokens

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/teams/tokens`

**Parameters**

| Name   | Type   | Required | Description |
| :----- | :----- | :------- | :---------- |
| userId | string | ✅       |             |

**Return Type**

`ArrayWithMetadataOfTeamsToken`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getTeamsUserTokens('user_id');

  console.log(data);
})();
```

## getTeamsUserToken

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/teams/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`TeamsTokenWithMetadata`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getTeamsUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## discardTeamsUserToken

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
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.discardTeamsUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## getWebPushUserTokens

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/web_push/tokens`

**Parameters**

| Name   | Type   | Required | Description |
| :----- | :----- | :------- | :---------- |
| userId | string | ✅       |             |

**Return Type**

`ArrayWithMetadataOfWebPushToken`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getWebPushUserTokens('user_id');

  console.log(data);
})();
```

## getWebPushUserToken

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/web_push/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`WebPushTokenWithMetadata`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getWebPushUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## discardWebPushUserToken

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
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.discardWebPushUserToken('user_id', 'token_id');

  console.log(data);
})();
```
