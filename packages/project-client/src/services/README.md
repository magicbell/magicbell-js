# Client Services

A list of all services and services methods.

- Services

  - [Broadcasts](#broadcasts)

  - [Integrations](#integrations)

  - [Channels](#channels)

- [All Methods](#all-methods)

## Broadcasts

| Method                              | Description |
| :---------------------------------- | :---------- |
| [createBroadcast](#createbroadcast) |             |
| [listBroadcasts](#listbroadcasts)   |             |
| [fetchBroadcast](#fetchbroadcast)   |             |

## Integrations

| Method                                                    | Description |
| :-------------------------------------------------------- | :---------- |
| [listIntegrations](#listintegrations)                     |             |
| [deleteApnsIntegration](#deleteapnsintegration)           |             |
| [saveApnsIntegration](#saveapnsintegration)               |             |
| [deleteFcmIntegration](#deletefcmintegration)             |             |
| [saveFcmIntegration](#savefcmintegration)                 |             |
| [deleteInboxIntegration](#deleteinboxintegration)         |             |
| [saveInboxIntegration](#saveinboxintegration)             |             |
| [deleteMailgunIntegration](#deletemailgunintegration)     |             |
| [saveMailgunIntegration](#savemailgunintegration)         |             |
| [deletePingEmailIntegration](#deletepingemailintegration) |             |
| [savePingEmailIntegration](#savepingemailintegration)     |             |
| [deleteSendgridIntegration](#deletesendgridintegration)   |             |
| [saveSendgridIntegration](#savesendgridintegration)       |             |
| [deleteSlackIntegration](#deleteslackintegration)         |             |
| [saveSlackIntegration](#saveslackintegration)             |             |
| [deleteStripeIntegration](#deletestripeintegration)       |             |
| [saveStripeIntegration](#savestripeintegration)           |             |
| [deleteTemplatesIntegration](#deletetemplatesintegration) |             |
| [saveTemplatesIntegration](#savetemplatesintegration)     |             |
| [deleteTwilioIntegration](#deletetwiliointegration)       |             |
| [saveTwilioIntegration](#savetwiliointegration)           |             |
| [deleteWebPushIntegration](#deletewebpushintegration)     |             |
| [saveWebPushIntegration](#savewebpushintegration)         |             |

## Channels

| Method                                                            | Description |
| :---------------------------------------------------------------- | :---------- |
| [getMobilePushApnsUserTokens](#getmobilepushapnsusertokens)       |             |
| [getMobilePushApnsUserToken](#getmobilepushapnsusertoken)         |             |
| [discardMobilePushApnsUserToken](#discardmobilepushapnsusertoken) |             |
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

## All Methods

### **createBroadcast**

- HTTP Method: POST
- Endpoint: /broadcasts

**Required Parameters**

| input | object | Request body. |

**Return Type**

Broadcast

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = {
    action_url: 'https://example.com',
    category: 'example',
    content: 'Hello, World!',
    custom_attributes: {},
    overrides: {},
    recipients: [
      {
        custom_attributes: {
          plan: 'enterprise',
          preferred_pronoun: 'They',
          pricing_version: 'v10',
        },
        external_id: '83d987a-83fd034',
        first_name: 'Person',
        last_name: 'Doe',
        phone_numbers: ['+1 5005550001'],
      },
    ],
    title: 'Hello, World!',
    topic: 'example',
  };
  const result = await sdk.broadcasts.createBroadcast(input);
  console.log(result);
})();

```

### **listBroadcasts**

- HTTP Method: GET
- Endpoint: /broadcasts

**Return Type**

BroadcastListResponse

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.broadcasts.listBroadcasts();
  console.log(result);
})();

```

### **fetchBroadcast**

- HTTP Method: GET
- Endpoint: /broadcasts/{broadcast_id}

**Required Parameters**

| Name        | Type   | Description |
| :---------- | :----- | :---------- |
| broadcastId | string |             |

**Return Type**

Broadcast

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.broadcasts.fetchBroadcast('broadcast_id');
  console.log(result);
})();

```

### **listIntegrations**

- HTTP Method: GET
- Endpoint: /integrations

**Return Type**

ListIntegrationsResponse

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.integrations.listIntegrations();
  console.log(result);
})();

```

### **deleteApnsIntegration**

- HTTP Method: DELETE
- Endpoint: /integrations/apns

**Return Type**

Returns a dict object.

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.integrations.deleteApnsIntegration();
  console.log(result);
})();

```

### **saveApnsIntegration**

- HTTP Method: PUT
- Endpoint: /integrations/apns

**Required Parameters**

| input | object | Request body. |

**Return Type**

ApnsConfig

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = {
    app_id: 'com.example.myapp',
    badge: 'unread',
    certificate: 'MIICXQIBAAKBgQC3J2',
    key_id: 'ABCD1234EF',
    team_id: 'ABCD1234EF',
  };
  const result = await sdk.integrations.saveApnsIntegration(input);
  console.log(result);
})();

```

### **deleteFcmIntegration**

- HTTP Method: DELETE
- Endpoint: /integrations/fcm

**Return Type**

Returns a dict object.

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.integrations.deleteFcmIntegration();
  console.log(result);
})();

```

### **saveFcmIntegration**

- HTTP Method: PUT
- Endpoint: /integrations/fcm

**Required Parameters**

| input | object | Request body. |

**Return Type**

FcmConfig

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = {
    auth_provider_x509_cert_url: '',
    auth_uri: '',
    client_email: '',
    client_id: '',
    client_x509_cert_url: '',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDQ8J\n-----END PRIVATE',
    private_key_id: 'e7',
    project_id: 'universe-1',
    token_uri: '',
    type: 'service_account',
    universe_domain: 'universe-1.firebaseapp.com',
  };
  const result = await sdk.integrations.saveFcmIntegration(input);
  console.log(result);
})();

```

### **deleteInboxIntegration**

- HTTP Method: DELETE
- Endpoint: /integrations/inbox

**Return Type**

Returns a dict object.

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.integrations.deleteInboxIntegration();
  console.log(result);
})();

```

### **saveInboxIntegration**

- HTTP Method: PUT
- Endpoint: /integrations/inbox

**Required Parameters**

| input | object | Request body. |

**Return Type**

InboxConfig

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

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
  const result = await sdk.integrations.saveInboxIntegration(input);
  console.log(result);
})();

```

### **deleteMailgunIntegration**

- HTTP Method: DELETE
- Endpoint: /integrations/mailgun

**Return Type**

Returns a dict object.

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.integrations.deleteMailgunIntegration();
  console.log(result);
})();

```

### **saveMailgunIntegration**

- HTTP Method: PUT
- Endpoint: /integrations/mailgun

**Required Parameters**

| input | object | Request body. |

**Return Type**

MailgunConfig

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = { api_key: 'mailgun_api_key', domain: 'mailgun_domain', region: 'us' };
  const result = await sdk.integrations.saveMailgunIntegration(input);
  console.log(result);
})();

```

### **deletePingEmailIntegration**

- HTTP Method: DELETE
- Endpoint: /integrations/ping_email

**Return Type**

Returns a dict object.

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.integrations.deletePingEmailIntegration();
  console.log(result);
})();

```

### **savePingEmailIntegration**

- HTTP Method: PUT
- Endpoint: /integrations/ping_email

**Required Parameters**

| input | object | Request body. |

**Return Type**

PingConfig

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = { url: 'https://example.com/webhook' };
  const result = await sdk.integrations.savePingEmailIntegration(input);
  console.log(result);
})();

```

### **deleteSendgridIntegration**

- HTTP Method: DELETE
- Endpoint: /integrations/sendgrid

**Return Type**

Returns a dict object.

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.integrations.deleteSendgridIntegration();
  console.log(result);
})();

```

### **saveSendgridIntegration**

- HTTP Method: PUT
- Endpoint: /integrations/sendgrid

**Required Parameters**

| input | object | Request body. |

**Return Type**

SendgridConfig

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = {
    api_key: 'SG.1234567890',
    from: { email: 'matt@magicbell.com', name: 'Matt' },
    reply_to: { email: 'hana@magicbell.com', name: 'Hana' },
  };
  const result = await sdk.integrations.saveSendgridIntegration(input);
  console.log(result);
})();

```

### **deleteSlackIntegration**

- HTTP Method: DELETE
- Endpoint: /integrations/slack

**Return Type**

Returns a dict object.

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.integrations.deleteSlackIntegration();
  console.log(result);
})();

```

### **saveSlackIntegration**

- HTTP Method: PUT
- Endpoint: /integrations/slack

**Required Parameters**

| input | object | Request body. |

**Return Type**

SlackConfig

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = {
    app_id: '12345678901',
    client_id: '1.0',
    client_secret: '12345678901234567890123456789012',
    signing_secret: '12345678901234567890123456789012',
  };
  const result = await sdk.integrations.saveSlackIntegration(input);
  console.log(result);
})();

```

### **deleteStripeIntegration**

- HTTP Method: DELETE
- Endpoint: /integrations/stripe

**Return Type**

Returns a dict object.

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.integrations.deleteStripeIntegration();
  console.log(result);
})();

```

### **saveStripeIntegration**

- HTTP Method: PUT
- Endpoint: /integrations/stripe

**Required Parameters**

| input | object | Request body. |

**Return Type**

StripeConfig

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = {
    webhook_signing_secret:
      'whsec_e5cf4458caae49ae72d8f275deb9b63bdd41dd5c932c27c9346d428fb9e1d0a0',
  };
  const result = await sdk.integrations.saveStripeIntegration(input);
  console.log(result);
})();

```

### **deleteTemplatesIntegration**

- HTTP Method: DELETE
- Endpoint: /integrations/templates

**Return Type**

Returns a dict object.

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.integrations.deleteTemplatesIntegration();
  console.log(result);
})();

```

### **saveTemplatesIntegration**

- HTTP Method: PUT
- Endpoint: /integrations/templates

**Required Parameters**

| input | object | Request body. |

**Return Type**

SaveTemplatesIntegrationResponse

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

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
  const result = await sdk.integrations.saveTemplatesIntegration(input);
  console.log(result);
})();

```

### **deleteTwilioIntegration**

- HTTP Method: DELETE
- Endpoint: /integrations/twilio

**Return Type**

Returns a dict object.

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.integrations.deleteTwilioIntegration();
  console.log(result);
})();

```

### **saveTwilioIntegration**

- HTTP Method: PUT
- Endpoint: /integrations/twilio

**Required Parameters**

| input | object | Request body. |

**Return Type**

TwilioConfig

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = {
    account_sid: 'ACXXXXXXXX',
    api_key: 'SKXXXXXXXX',
    api_secret: 'your_api_secret',
    from: '+15017122661',
    region: 'us1',
  };
  const result = await sdk.integrations.saveTwilioIntegration(input);
  console.log(result);
})();

```

### **deleteWebPushIntegration**

- HTTP Method: DELETE
- Endpoint: /integrations/web_push

**Return Type**

Returns a dict object.

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.integrations.deleteWebPushIntegration();
  console.log(result);
})();

```

### **saveWebPushIntegration**

- HTTP Method: PUT
- Endpoint: /integrations/web_push

**Required Parameters**

| input | object | Request body. |

**Return Type**

WebpushConfig

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const input = { private_key: '<string>', public_key: '<string>' };
  const result = await sdk.integrations.saveWebPushIntegration(input);
  console.log(result);
})();

```

### **getMobilePushApnsUserTokens**

- HTTP Method: GET
- Endpoint: /users/{user_id}/channels/mobile_push/apns/tokens

**Required Parameters**

| Name   | Type   | Description |
| :----- | :----- | :---------- |
| userId | string |             |

**Return Type**

ArrayWithMetadataOfApnsToken

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getMobilePushApnsUserTokens('user_id');
  console.log(result);
})();

```

### **getMobilePushApnsUserToken**

- HTTP Method: GET
- Endpoint: /users/{user_id}/channels/mobile_push/apns/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| userId  | string |             |
| tokenId | string |             |

**Return Type**

ApnsTokenWithMetadata

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getMobilePushApnsUserToken('user_id', 'token_id');
  console.log(result);
})();

```

### **discardMobilePushApnsUserToken**

- HTTP Method: DELETE
- Endpoint: /users/{user_id}/channels/mobile_push/apns/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| userId  | string |             |
| tokenId | string |             |

**Return Type**

DiscardResult

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.discardMobilePushApnsUserToken('user_id', 'token_id');
  console.log(result);
})();

```

### **getMobilePushFcmUserTokens**

- HTTP Method: GET
- Endpoint: /users/{user_id}/channels/mobile_push/fcm/tokens

**Required Parameters**

| Name   | Type   | Description |
| :----- | :----- | :---------- |
| userId | string |             |

**Return Type**

ArrayWithMetadataOfFcmToken

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getMobilePushFcmUserTokens('user_id');
  console.log(result);
})();

```

### **getMobilePushFcmUserToken**

- HTTP Method: GET
- Endpoint: /users/{user_id}/channels/mobile_push/fcm/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| userId  | string |             |
| tokenId | string |             |

**Return Type**

FcmTokenWithMetadata

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getMobilePushFcmUserToken('user_id', 'token_id');
  console.log(result);
})();

```

### **discardMobilePushFcmUserToken**

- HTTP Method: DELETE
- Endpoint: /users/{user_id}/channels/mobile_push/fcm/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| userId  | string |             |
| tokenId | string |             |

**Return Type**

DiscardResult

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.discardMobilePushFcmUserToken('user_id', 'token_id');
  console.log(result);
})();

```

### **getSlackUserTokens**

- HTTP Method: GET
- Endpoint: /users/{user_id}/channels/slack/tokens

**Required Parameters**

| Name   | Type   | Description |
| :----- | :----- | :---------- |
| userId | string |             |

**Return Type**

ArrayWithMetadataOfSlackToken

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getSlackUserTokens('user_id');
  console.log(result);
})();

```

### **getSlackUserToken**

- HTTP Method: GET
- Endpoint: /users/{user_id}/channels/slack/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| userId  | string |             |
| tokenId | string |             |

**Return Type**

SlackTokenWithMetadata

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getSlackUserToken('user_id', 'token_id');
  console.log(result);
})();

```

### **discardSlackUserToken**

- HTTP Method: DELETE
- Endpoint: /users/{user_id}/channels/slack/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| userId  | string |             |
| tokenId | string |             |

**Return Type**

DiscardResult

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.discardSlackUserToken('user_id', 'token_id');
  console.log(result);
})();

```

### **getTeamsUserTokens**

- HTTP Method: GET
- Endpoint: /users/{user_id}/channels/teams/tokens

**Required Parameters**

| Name   | Type   | Description |
| :----- | :----- | :---------- |
| userId | string |             |

**Return Type**

ArrayWithMetadataOfTeamsToken

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getTeamsUserTokens('user_id');
  console.log(result);
})();

```

### **getTeamsUserToken**

- HTTP Method: GET
- Endpoint: /users/{user_id}/channels/teams/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| userId  | string |             |
| tokenId | string |             |

**Return Type**

TeamsTokenWithMetadata

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getTeamsUserToken('user_id', 'token_id');
  console.log(result);
})();

```

### **discardTeamsUserToken**

- HTTP Method: DELETE
- Endpoint: /users/{user_id}/channels/teams/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| userId  | string |             |
| tokenId | string |             |

**Return Type**

DiscardResult

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.discardTeamsUserToken('user_id', 'token_id');
  console.log(result);
})();

```

### **getWebPushUserTokens**

- HTTP Method: GET
- Endpoint: /users/{user_id}/channels/web_push/tokens

**Required Parameters**

| Name   | Type   | Description |
| :----- | :----- | :---------- |
| userId | string |             |

**Return Type**

ArrayWithMetadataOfWebPushToken

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getWebPushUserTokens('user_id');
  console.log(result);
})();

```

### **getWebPushUserToken**

- HTTP Method: GET
- Endpoint: /users/{user_id}/channels/web_push/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| userId  | string |             |
| tokenId | string |             |

**Return Type**

WebPushTokenWithMetadata

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.getWebPushUserToken('user_id', 'token_id');
  console.log(result);
})();

```

### **discardWebPushUserToken**

- HTTP Method: DELETE
- Endpoint: /users/{user_id}/channels/web_push/tokens/{token_id}

**Required Parameters**

| Name    | Type   | Description |
| :------ | :----- | :---------- |
| userId  | string |             |
| tokenId | string |             |

**Return Type**

DiscardResult

**Example Usage Code Snippet**

```Typescript
import { Client } from '@magicbell/project-client';

const sdk = new Client({ accessToken: process.env.CLIENT_ACCESS_TOKEN });

(async () => {
  const result = await sdk.channels.discardWebPushUserToken('user_id', 'token_id');
  console.log(result);
})();

```
