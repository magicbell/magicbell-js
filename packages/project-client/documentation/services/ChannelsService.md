# ChannelsService

A list of all methods in the `ChannelsService` service. Click on the method name to view detailed information about that method.

| Methods                                                           | Description                                                                                                                                                                                                                                                        |
| :---------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [getProjectDeliveryconfig](#getprojectdeliveryconfig)             |                                                                                                                                                                                                                                                                    |
| [saveProjectDeliveryconfig](#saveprojectdeliveryconfig)           |                                                                                                                                                                                                                                                                    |
| [saveCategoriesDeliveryconfig](#savecategoriesdeliveryconfig)     |                                                                                                                                                                                                                                                                    |
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

## getProjectDeliveryconfig

- HTTP Method: `GET`
- Endpoint: `/channels/deliveryconfig`

**Return Type**

`ProjectDeliveryConfig`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getProjectDeliveryconfig();

  console.log(data);
})();
```

## saveProjectDeliveryconfig

- HTTP Method: `PUT`
- Endpoint: `/channels/deliveryconfig`

**Parameters**

| Name | Type                                                        | Required | Description       |
| :--- | :---------------------------------------------------------- | :------- | :---------------- |
| body | [ProjectDeliveryConfig](../models/ProjectDeliveryConfig.md) | ❌       | The request body. |

**Return Type**

`ProjectDeliveryConfig`

**Example Usage Code Snippet**

```typescript
import { Client, ProjectDeliveryConfig } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const channelsChannel1 = ChannelsChannel1.IN_APP;

  const projectDeliveryConfigChannels: ProjectDeliveryConfigChannels = {
    channel: channelsChannel1,
    delay: 8,
    disabled: true,
    if: 'if',
    priority: 4,
  };

  const projectDeliveryConfig: ProjectDeliveryConfig = {
    channels: [projectDeliveryConfigChannels],
  };

  const { data } = await client.channels.saveProjectDeliveryconfig(projectDeliveryConfig);

  console.log(data);
})();
```

## saveCategoriesDeliveryconfig

- HTTP Method: `POST`
- Endpoint: `/channels/deliveryconfig/categories`

**Parameters**

| Name | Type                                                          | Required | Description       |
| :--- | :------------------------------------------------------------ | :------- | :---------------- |
| body | [CategoryDeliveryConfig](../models/CategoryDeliveryConfig.md) | ❌       | The request body. |

**Return Type**

`CategoryDeliveryConfig`

**Example Usage Code Snippet**

```typescript
import { CategoryDeliveryConfig, Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const channelsChannel2 = ChannelsChannel2.IN_APP;

  const categoryDeliveryConfigChannels: CategoryDeliveryConfigChannels = {
    channel: channelsChannel2,
    delay: 5,
    disabled: true,
    if: 'if',
    priority: 9,
  };

  const categoryDeliveryConfig: CategoryDeliveryConfig = {
    category: 'category',
    channels: [categoryDeliveryConfigChannels],
    disabled: true,
  };

  const { data } = await client.channels.saveCategoriesDeliveryconfig(categoryDeliveryConfig);

  console.log(data);
})();
```

## getMobilePushApnsUserTokens

Lists all mobile_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/mobile_push/apns/tokens`

**Parameters**

| Name       | Type   | Required | Description |
| :--------- | :----- | :------- | :---------- |
| userId     | string | ✅       |             |
| pageSize   | number | ❌       |             |
| pageAfter  | string | ❌       |             |
| pageBefore | string | ❌       |             |

**Return Type**

`ArrayOfMetadataApnsTokens`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getMobilePushApnsUserTokens('user_id', {
    pageSize: 9,
    pageAfter: 'page[after]',
    pageBefore: 'page[before]',
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

`MetadataApnsToken`

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

Lists all mobile_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/mobile_push/expo/tokens`

**Parameters**

| Name       | Type   | Required | Description |
| :--------- | :----- | :------- | :---------- |
| userId     | string | ✅       |             |
| pageSize   | number | ❌       |             |
| pageAfter  | string | ❌       |             |
| pageBefore | string | ❌       |             |

**Return Type**

`ArrayOfMetadataExpoTokens`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getMobilePushExpoUserTokens('user_id', {
    pageSize: 2,
    pageAfter: 'page[after]',
    pageBefore: 'page[before]',
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

`MetadataExpoToken`

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

Lists all mobile_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/mobile_push/fcm/tokens`

**Parameters**

| Name       | Type   | Required | Description |
| :--------- | :----- | :------- | :---------- |
| userId     | string | ✅       |             |
| pageSize   | number | ❌       |             |
| pageAfter  | string | ❌       |             |
| pageBefore | string | ❌       |             |

**Return Type**

`ArrayOfMetadataFcmTokens`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getMobilePushFcmUserTokens('user_id', {
    pageSize: 9,
    pageAfter: 'page[after]',
    pageBefore: 'page[before]',
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

`MetadataFcmToken`

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

Lists all slack tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/slack/tokens`

**Parameters**

| Name       | Type   | Required | Description |
| :--------- | :----- | :------- | :---------- |
| userId     | string | ✅       |             |
| pageSize   | number | ❌       |             |
| pageAfter  | string | ❌       |             |
| pageBefore | string | ❌       |             |

**Return Type**

`ArrayOfMetadataSlackTokens`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getSlackUserTokens('user_id', {
    pageSize: 123,
    pageAfter: 'page[after]',
    pageBefore: 'page[before]',
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

`MetadataSlackToken`

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

Lists all teams tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/teams/tokens`

**Parameters**

| Name       | Type   | Required | Description |
| :--------- | :----- | :------- | :---------- |
| userId     | string | ✅       |             |
| pageSize   | number | ❌       |             |
| pageAfter  | string | ❌       |             |
| pageBefore | string | ❌       |             |

**Return Type**

`ArrayOfMetadataTeamsTokens`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getTeamsUserTokens('user_id', {
    pageSize: 2,
    pageAfter: 'page[after]',
    pageBefore: 'page[before]',
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

`MetadataTeamsToken`

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

Lists all web_push tokens associated with a specific user. This endpoint is available to project administrators and returns a paginated list of tokens, including both active and revoked tokens.

- HTTP Method: `GET`
- Endpoint: `/users/{user_id}/channels/web_push/tokens`

**Parameters**

| Name       | Type   | Required | Description |
| :--------- | :----- | :------- | :---------- |
| userId     | string | ✅       |             |
| pageSize   | number | ❌       |             |
| pageAfter  | string | ❌       |             |
| pageBefore | string | ❌       |             |

**Return Type**

`ArrayOfMetadataWebPushTokens`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.getWebPushUserTokens('user_id', {
    pageSize: 4,
    pageAfter: 'page[after]',
    pageBefore: 'page[before]',
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

`MetadataWebPushToken`

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
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.discardWebPushUserToken('user_id', 'token_id');

  console.log(data);
})();
```
