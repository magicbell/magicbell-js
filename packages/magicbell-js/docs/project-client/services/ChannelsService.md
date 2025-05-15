# ChannelsService

A list of all methods in the `ChannelsService` service. Click on the method name to view detailed information about that method.

| Methods                                                           | Description                                                                                                                                                                                                                                                        |
| :---------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [getDeliveryconfig](#getdeliveryconfig)                           |                                                                                                                                                                                                                                                                    |
| [saveDeliveryconfig](#savedeliveryconfig)                         |                                                                                                                                                                                                                                                                    |
| [getInAppInboxUserTokens](#getinappinboxusertokens)               | Lists all in_app tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.                                                                    |
| [getInAppInboxUserToken](#getinappinboxusertoken)                 | Retrieves a specific in_app token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.      |
| [discardInAppInboxUserToken](#discardinappinboxusertoken)         | Revokes a specific user's in_app token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.              |
| [getMobilePushApnsUserTokens](#getmobilepushapnsusertokens)       | Lists all mobile_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.                                                               |
| [getMobilePushApnsUserToken](#getmobilepushapnsusertoken)         | Retrieves a specific mobile_push token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata. |
| [discardMobilePushApnsUserToken](#discardmobilepushapnsusertoken) | Revokes a specific user's mobile_push token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.         |
| [getMobilePushExpoUserTokens](#getmobilepushexpousertokens)       | Lists all mobile_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.                                                               |
| [getMobilePushExpoUserToken](#getmobilepushexpousertoken)         | Retrieves a specific mobile_push token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata. |
| [discardMobilePushExpoUserToken](#discardmobilepushexpousertoken) | Revokes a specific user's mobile_push token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.         |
| [getMobilePushFcmUserTokens](#getmobilepushfcmusertokens)         | Lists all mobile_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.                                                               |
| [getMobilePushFcmUserToken](#getmobilepushfcmusertoken)           | Retrieves a specific mobile_push token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata. |
| [discardMobilePushFcmUserToken](#discardmobilepushfcmusertoken)   | Revokes a specific user's mobile_push token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.         |
| [getSlackUserTokens](#getslackusertokens)                         | Lists all slack tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.                                                                     |
| [getSlackUserToken](#getslackusertoken)                           | Retrieves a specific slack token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.       |
| [discardSlackUserToken](#discardslackusertoken)                   | Revokes a specific user's slack token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.               |
| [getTeamsUserTokens](#getteamsusertokens)                         | Lists all teams tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.                                                                     |
| [getTeamsUserToken](#getteamsusertoken)                           | Retrieves a specific teams token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.       |
| [discardTeamsUserToken](#discardteamsusertoken)                   | Revokes a specific user's teams token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.               |
| [getWebPushUserTokens](#getwebpushusertokens)                     | Lists all web_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.                                                                  |
| [getWebPushUserToken](#getwebpushusertoken)                       | Retrieves a specific web_push token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.    |
| [discardWebPushUserToken](#discardwebpushusertoken)               | Revokes a specific user's web_push token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.            |

## getDeliveryconfig

- HTTP Method: `GET`
- Endpoint: `/channels/deliveryconfig`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| key  | string | ❌       |             |

**Return Type**

`CategoryDeliveryConfig`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.getDeliveryconfig({
    key: 'key',
  });

  console.log(data);
})();
```

## saveDeliveryconfig

- HTTP Method: `PUT`
- Endpoint: `/channels/deliveryconfig`

**Parameters**

| Name | Type                                                          | Required | Description       |
| :--- | :------------------------------------------------------------ | :------- | :---------------- |
| body | [CategoryDeliveryConfig](../models/CategoryDeliveryConfig.md) | ❌       | The request body. |

**Return Type**

`CategoryDeliveryConfig`

**Example Usage Code Snippet**

```typescript
import { CategoryDeliveryConfig, ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const channel = Channel.IN_APP;

  const categoryDeliveryConfigChannels: CategoryDeliveryConfigChannels = {
    channel: channel,
    delay: 10,
    if: 'if',
  };

  const categoryDeliveryConfig: CategoryDeliveryConfig = {
    channels: [categoryDeliveryConfigChannels],
    disabled: true,
    key: 'key',
  };

  const { data } = await projectClient.channels.saveDeliveryconfig(categoryDeliveryConfig);

  console.log(data);
})();
```

## getInAppInboxUserTokens

Lists all in_app tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.getInAppInboxUserTokens('user_id', {
    limit: 3,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## getInAppInboxUserToken

Retrieves a specific in_app token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.getInAppInboxUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## discardInAppInboxUserToken

Revokes a specific user's in_app token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.discardInAppInboxUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## getMobilePushApnsUserTokens

Lists all mobile_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.getMobilePushApnsUserTokens('user_id', {
    limit: 7,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## getMobilePushApnsUserToken

Retrieves a specific mobile_push token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.getMobilePushApnsUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## discardMobilePushApnsUserToken

Revokes a specific user's mobile_push token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.discardMobilePushApnsUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## getMobilePushExpoUserTokens

Lists all mobile_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.getMobilePushExpoUserTokens('user_id', {
    limit: 8,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## getMobilePushExpoUserToken

Retrieves a specific mobile_push token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.getMobilePushExpoUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## discardMobilePushExpoUserToken

Revokes a specific user's mobile_push token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.discardMobilePushExpoUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## getMobilePushFcmUserTokens

Lists all mobile_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.getMobilePushFcmUserTokens('user_id', {
    limit: 3,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## getMobilePushFcmUserToken

Retrieves a specific mobile_push token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.getMobilePushFcmUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## discardMobilePushFcmUserToken

Revokes a specific user's mobile_push token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.discardMobilePushFcmUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## getSlackUserTokens

Lists all slack tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.getSlackUserTokens('user_id', {
    limit: 9,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## getSlackUserToken

Retrieves a specific slack token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.getSlackUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## discardSlackUserToken

Revokes a specific user's slack token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.discardSlackUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## getTeamsUserTokens

Lists all teams tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.getTeamsUserTokens('user_id', {
    limit: 123,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## getTeamsUserToken

Retrieves a specific teams token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.getTeamsUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## discardTeamsUserToken

Revokes a specific user's teams token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.discardTeamsUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## getWebPushUserTokens

Lists all web_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.getWebPushUserTokens('user_id', {
    limit: 123,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## getWebPushUserToken

Retrieves a specific web_push token by its ID for a given user. This endpoint is available to project administrators and requires project-level authentication. Use this to inspect token details including its status, creation date, and associated metadata.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.getWebPushUserToken('user_id', 'token_id');

  console.log(data);
})();
```

## discardWebPushUserToken

Revokes a specific user's web_push token. This endpoint is available to project administrators and permanently invalidates the specified token. Once revoked, the token can no longer be used to access channel features. This action cannot be undone.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.channels.discardWebPushUserToken('user_id', 'token_id');

  console.log(data);
})();
```
