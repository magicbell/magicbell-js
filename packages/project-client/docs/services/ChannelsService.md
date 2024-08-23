# ChannelsService

A list of all methods in the `ChannelsService` service. Click on the method name to view detailed information about that method.

| Methods                                                                     | Description |
| :-------------------------------------------------------------------------- | :---------- |
| [get_in_app_user_tokens](#get_in_app_user_tokens)                           |             |
| [get_in_app_user_token](#get_in_app_user_token)                             |             |
| [discard_in_app_user_token](#discard_in_app_user_token)                     |             |
| [get_mobile_push_apns_user_tokens](#get_mobile_push_apns_user_tokens)       |             |
| [get_mobile_push_apns_user_token](#get_mobile_push_apns_user_token)         |             |
| [discard_mobile_push_apns_user_token](#discard_mobile_push_apns_user_token) |             |
| [get_mobile_push_fcm_user_tokens](#get_mobile_push_fcm_user_tokens)         |             |
| [get_mobile_push_fcm_user_token](#get_mobile_push_fcm_user_token)           |             |
| [discard_mobile_push_fcm_user_token](#discard_mobile_push_fcm_user_token)   |             |
| [get_slack_user_tokens](#get_slack_user_tokens)                             |             |
| [get_slack_user_token](#get_slack_user_token)                               |             |
| [discard_slack_user_token](#discard_slack_user_token)                       |             |
| [get_teams_user_tokens](#get_teams_user_tokens)                             |             |
| [get_teams_user_token](#get_teams_user_token)                               |             |
| [discard_teams_user_token](#discard_teams_user_token)                       |             |
| [get_web_push_user_tokens](#get_web_push_user_tokens)                       |             |
| [get_web_push_user_token](#get_web_push_user_token)                         |             |
| [discard_web_push_user_token](#discard_web_push_user_token)                 |             |

## get_in_app_user_tokens

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/in_app/tokens`

**Parameters**

| Name   | Type   | Required | Description |
| :----- | :----- | :------- | :---------- |
| userId | string | ✅       |             |

**Return Type**

`ArrayWithMetadataOfInboxToken`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getInAppUserTokens('user_id');

  console.log(data);
})();
```

## get_in_app_user_token

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/in_app/tokens/{token_id}`

**Parameters**

| Name    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| userId  | string | ✅       |             |
| tokenId | string | ✅       |             |

**Return Type**

`InboxTokenWithMetadata`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getInAppUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## discard_in_app_user_token

- HTTP Method: `DELETE`
- Endpoint: `/users/{user_id}/channels/in_app/tokens/{token_id}`

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

  const { data } = await client.channels.discardInAppUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## get_mobile_push_apns_user_tokens

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

## get_mobile_push_apns_user_token

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

## discard_mobile_push_apns_user_token

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

## get_mobile_push_fcm_user_tokens

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

## get_mobile_push_fcm_user_token

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

## discard_mobile_push_fcm_user_token

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

## get_slack_user_tokens

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

## get_slack_user_token

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

## discard_slack_user_token

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

## get_teams_user_tokens

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

## get_teams_user_token

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

## discard_teams_user_token

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

## get_web_push_user_tokens

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

## get_web_push_user_token

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

## discard_web_push_user_token

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
