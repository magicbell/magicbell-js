# Client Typescript SDK 0.1.0

The Typescript SDK for Client.

- API version: 0.1.0
- SDK version: 0.1.0

## Table of Contents

- [About the API](#requirements)
- [Installation](#installation)
- [Authentication](#authentication)
  - [Access Token](#access-token)
- [API Endpoint Services](#api-endpoint-services)
- [API Models](#api-models)
- [Sample Usage](#sample-usage)
- [Client Services](#client-services)
- [License](#license)

## About the API

OpenAPI 3.1.0 Specification for MagicBell API.

## Installation

```sh
npm install user-client
```

## Authentication

To see whether an endpoint needs a specific type of authentication check the endpoint's documentation.

### Access Token

The Client API uses access tokens as a form of authentication. You can set the access token when initializing the SDK through the constructor:

```
const sdk = new Client('YOUR_ACCESS_TOKEN')
```

Or through the `setAccessToken` method:

```
const sdk = new Client()
sdk.setAccessToken('YOUR_ACCESS_TOKEN')
```

You can also set it for each service individually:

```
const sdk = new Client()
sdk.channels.setAccessToken('YOUR_ACCESS_TOKEN')
```

## Sample Usage

Here is a simple program demonstrating usage of this SDK. It can also be found in the `examples/src/index.ts` file in this directory.

When running the sample make sure to use `npm install` to install all the dependencies.

```Typescript
import { Client } from '@magicbell/user-client';


const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  try {
    const result = await sdk.channels
      .getMobilePushApnsTokens();
    console.log(result);
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
  }
})();


```

# Client Services

A list of all services and services methods.

- Services

  - [Channels](#channels)

  - [Integrations](#integrations)

- [All Methods](#all-methods)

## Channels

| Method                                                    | Description |
| :-------------------------------------------------------- | :---------- |
| [saveMobilePushApnsToken](#savemobilepushapnstoken)       |             |
| [getMobilePushApnsTokens](#getmobilepushapnstokens)       |             |
| [getMobilePushApnsToken](#getmobilepushapnstoken)         |             |
| [discardMobilePushApnsToken](#discardmobilepushapnstoken) |             |
| [saveMobilePushFcmToken](#savemobilepushfcmtoken)         |             |
| [getMobilePushFcmTokens](#getmobilepushfcmtokens)         |             |
| [getMobilePushFcmToken](#getmobilepushfcmtoken)           |             |
| [discardMobilePushFcmToken](#discardmobilepushfcmtoken)   |             |
| [saveSlackToken](#saveslacktoken)                         |             |
| [getSlackTokens](#getslacktokens)                         |             |
| [getSlackToken](#getslacktoken)                           |             |
| [discardSlackToken](#discardslacktoken)                   |             |
| [saveTeamsToken](#saveteamstoken)                         |             |
| [getTeamsTokens](#getteamstokens)                         |             |
| [getTeamsToken](#getteamstoken)                           |             |
| [discardTeamsToken](#discardteamstoken)                   |             |
| [saveWebPushToken](#savewebpushtoken)                     |             |
| [getWebPushTokens](#getwebpushtokens)                     |             |
| [getWebPushToken](#getwebpushtoken)                       |             |
| [discardWebPushToken](#discardwebpushtoken)               |             |

## Integrations

| Method                                                  | Description |
| :------------------------------------------------------ | :---------- |
| [saveSlackInstallation](#saveslackinstallation)         |             |
| [finishSlackInstallation](#finishslackinstallation)     |             |
| [startSlackInstallation](#startslackinstallation)       |             |
| [saveTemplatesInstallation](#savetemplatesinstallation) |             |
| [startWebPushInstallation](#startwebpushinstallation)   |             |

## All Methods

### **saveMobilePushApnsToken**

- HTTP Method: POST
- Endpoint: /channels/mobile_push/apns/tokens

**Required Parameters**

| input | object | Request body. |

**Return Type**

ApnsToken

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = {
    device_token:
      'eH0fLhuiRj2Np7UQ-opXAm:APA91bGtC-wH4sgW1jWkMKIZf7FYkm_RTQb7Jid7DfSJnCgivGYoRzhLrGxpcIF6yPjmbzAr6CKF-6phZkBasFUUfZmfdgcqfA_ZlZdVk6pSnon3LGzMumCzEJE0zgWoo_RUmVUVJUAt',
    installation_id: 'development',
  };
  const result = await sdk.channels.saveMobilePushApnsToken(input);
  console.log(result);
})();

```

### **getMobilePushApnsTokens**

- HTTP Method: GET
- Endpoint: /channels/mobile_push/apns/tokens

**Return Type**

ArrayWithMetadataOfApnsToken

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getMobilePushApnsTokens();
  console.log(result);
})();

```

### **getMobilePushApnsToken**

- HTTP Method: GET
- Endpoint: /channels/mobile_push/apns/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| tokenId | string |             |

**Return Type**

ApnsTokenWithMetadata

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getMobilePushApnsToken('token_id');
  console.log(result);
})();

```

### **discardMobilePushApnsToken**

- HTTP Method: DELETE
- Endpoint: /channels/mobile_push/apns/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| tokenId | string |             |

**Return Type**

DiscardResult

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.discardMobilePushApnsToken('token_id');
  console.log(result);
})();

```

### **saveMobilePushFcmToken**

- HTTP Method: POST
- Endpoint: /channels/mobile_push/fcm/tokens

**Required Parameters**

| input | object | Request body. |

**Return Type**

FcmToken

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = {
    device_token:
      'eH0fLhuiRj2Np7UQ-opXAm:APA91bGtC-wH4sgW1jWkMKIZf7FYkm_RTQb7Jid7DfSJnCgivGYoRzhLrGxpcIF6yPjmbzAr6CKF-6phZkBasFUUfZmfdgcqfA_ZlZdVk6pSnon3LGzMumCzEJE0zgWoo_RUmVUVJUAt',
    installation_id: 'development',
  };
  const result = await sdk.channels.saveMobilePushFcmToken(input);
  console.log(result);
})();

```

### **getMobilePushFcmTokens**

- HTTP Method: GET
- Endpoint: /channels/mobile_push/fcm/tokens

**Return Type**

ArrayWithMetadataOfFcmToken

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getMobilePushFcmTokens();
  console.log(result);
})();

```

### **getMobilePushFcmToken**

- HTTP Method: GET
- Endpoint: /channels/mobile_push/fcm/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| tokenId | string |             |

**Return Type**

FcmTokenWithMetadata

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getMobilePushFcmToken('token_id');
  console.log(result);
})();

```

### **discardMobilePushFcmToken**

- HTTP Method: DELETE
- Endpoint: /channels/mobile_push/fcm/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| tokenId | string |             |

**Return Type**

DiscardResult

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.discardMobilePushFcmToken('token_id');
  console.log(result);
})();

```

### **saveSlackToken**

- HTTP Method: POST
- Endpoint: /channels/slack/tokens

**Required Parameters**

| input | object | Request body. |

**Return Type**

SlackToken

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = { webhook: { url: 'https://example.com/webhook' } };
  const result = await sdk.channels.saveSlackToken(input);
  console.log(result);
})();

```

### **getSlackTokens**

- HTTP Method: GET
- Endpoint: /channels/slack/tokens

**Return Type**

ArrayWithMetadataOfSlackToken

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getSlackTokens();
  console.log(result);
})();

```

### **getSlackToken**

- HTTP Method: GET
- Endpoint: /channels/slack/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| tokenId | string |             |

**Return Type**

SlackTokenWithMetadata

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getSlackToken('token_id');
  console.log(result);
})();

```

### **discardSlackToken**

- HTTP Method: DELETE
- Endpoint: /channels/slack/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| tokenId | string |             |

**Return Type**

DiscardResult

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.discardSlackToken('token_id');
  console.log(result);
})();

```

### **saveTeamsToken**

- HTTP Method: POST
- Endpoint: /channels/teams/tokens

**Required Parameters**

| input | object | Request body. |

**Return Type**

Returns a dict object.

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = {};
  const result = await sdk.channels.saveTeamsToken(input);
  console.log(result);
})();

```

### **getTeamsTokens**

- HTTP Method: GET
- Endpoint: /channels/teams/tokens

**Return Type**

ArrayWithMetadataOfTeamsToken

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getTeamsTokens();
  console.log(result);
})();

```

### **getTeamsToken**

- HTTP Method: GET
- Endpoint: /channels/teams/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| tokenId | string |             |

**Return Type**

TeamsTokenWithMetadata

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getTeamsToken('token_id');
  console.log(result);
})();

```

### **discardTeamsToken**

- HTTP Method: DELETE
- Endpoint: /channels/teams/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| tokenId | string |             |

**Return Type**

DiscardResult

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.discardTeamsToken('token_id');
  console.log(result);
})();

```

### **saveWebPushToken**

- HTTP Method: POST
- Endpoint: /channels/web_push/tokens

**Required Parameters**

| input | object | Request body. |

**Return Type**

WebPushToken

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = {
    endpoint: 'https://example.com/webhook',
    keys: { auth: '<string>', p256dh: '<string>' },
  };
  const result = await sdk.channels.saveWebPushToken(input);
  console.log(result);
})();

```

### **getWebPushTokens**

- HTTP Method: GET
- Endpoint: /channels/web_push/tokens

**Return Type**

ArrayWithMetadataOfWebPushToken

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getWebPushTokens();
  console.log(result);
})();

```

### **getWebPushToken**

- HTTP Method: GET
- Endpoint: /channels/web_push/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| tokenId | string |             |

**Return Type**

WebPushTokenWithMetadata

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getWebPushToken('token_id');
  console.log(result);
})();

```

### **discardWebPushToken**

- HTTP Method: DELETE
- Endpoint: /channels/web_push/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| tokenId | string |             |

**Return Type**

DiscardResult

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.discardWebPushToken('token_id');
  console.log(result);
})();

```

### **saveSlackInstallation**

- HTTP Method: POST
- Endpoint: /integrations/slack/installations

**Required Parameters**

| input | object | Request body. |

**Return Type**

SlackInstallation

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = {
    access_token: 'xoxb-123456789012-1234567890123-12345678901234567890abcdef123456',
    app_id: 'A12345678',
    authed_user: { scope: 'identify,commands' },
    bot_user_id: 'U12345678',
    enterprise_id: 'E12345678',
    enterprise_name: 'Enterprise Grid, Inc.',
    incoming_webhook: {
      channel: 'C12345678',
      channel_id: 'C12345678',
      configuration_url: 'https://teamname.slack.com/services/B12345678',
      url: 'https://hooks.slack.com/services/T12345678/B12345678/123456789012345678901234',
    },
    scope: 'identify,commands,bot',
    team: { name: 'Team Installing Your App' },
    team_id: 'T12345678',
    team_name: 'Team Installing Your App',
  };
  const result = await sdk.integrations.saveSlackInstallation(input);
  console.log(result);
})();

```

### **finishSlackInstallation**

- HTTP Method: POST
- Endpoint: /integrations/slack/installations/finish

**Required Parameters**

| input | object | Request body. |

**Return Type**

SlackInstallation

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = { app_id: '12345678901', code: 'string', redirect_url: 'string' };
  const result = await sdk.integrations.finishSlackInstallation(input);
  console.log(result);
})();

```

### **startSlackInstallation**

- HTTP Method: POST
- Endpoint: /integrations/slack/installations/start

**Required Parameters**

| input | object | Request body. |

**Return Type**

Returns a dict object.

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = {
    app_id: '12345678901',
    auth_url: 'https://example.com/auth',
    extra_scopes: ['scope1', 'scope2'],
    redirect_url: 'https://example.com/redirect',
  };
  const result = await sdk.integrations.startSlackInstallation(input);
  console.log(result);
})();

```

### **saveTemplatesInstallation**

- HTTP Method: POST
- Endpoint: /integrations/templates/installations

**Required Parameters**

| input | object | Request body. |

**Return Type**

TemplatesInstallation

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = {
    apns: {
      app_id: 'com.example.myapp',
      badge: 'unread',
      certificate: 'MIICXQIBAAKBgQC3J2',
      key_id: 'ABCD1234EF',
      team_id: 'ABCD1234EF',
    },
  };
  const result = await sdk.integrations.saveTemplatesInstallation(input);
  console.log(result);
})();

```

### **startWebPushInstallation**

- HTTP Method: POST
- Endpoint: /integrations/web_push/installations/start

**Required Parameters**

| input | object | Request body. |

**Return Type**

WebPushStartInstallationResponse

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/user-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = {
    imports: [],
    originalName: 'start_web_push_installation_request',
    services: ['integrations'],
    filePath: 'src/services/integrations/models',
    modelName: 'StartWebPushInstallationRequest',
    title: 'StartWebPushInstallationRequest',
  };
  const result = await sdk.integrations.startWebPushInstallation(input);
  console.log(result);
})();

```

## License

See license in LICENSE.
