---
title: 'magicbell-js/user-client'
---

# Setup & Configuration

## Supported Language Versions

This SDK is compatible with the following versions: `TypeScript >= 4.8.4`

## Installation

To get started with the SDK, we recommend installing using `npm` or `yarn`:

```bash
npm install magicbell-js
```

or

```bash
yarn add magicbell-js/user-client
```

## Authentication

### Access Token Authentication

The Client API uses an Access Token for authentication.

This token must be provided to authenticate your requests to the API.

#### Setting the Access Token

When you initialize the SDK, you can set the access token as follows:

```ts
const sdk = new Client({ token: 'YOUR_TOKEN' });
```

If you need to set or update the access token after initializing the SDK, you can use:

```ts
const sdk = new Client();
sdk.token = 'YOUR_TOKEN';
```

## Setting a Custom Timeout

You can set a custom timeout for the SDK's HTTP requests as follows:

```ts
const client = new Client({ timeout: 10000 });
```

## Sample Usage

Below is a comprehensive example demonstrating how to authenticate and call a simple endpoint:

```ts
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.channels.listInboxTokens({
    limit: 4,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

### Services

The SDK provides various services to interact with the API.

<details>
<summary>Below is a list of all available services with links to their detailed documentation:</summary>

| Name                                                     |
| :------------------------------------------------------- |
| [ChannelsService](services/ChannelsService.md)           |
| [IntegrationsService](services/IntegrationsService.md)   |
| [NotificationsService](services/NotificationsService.md) |

</details>

### Models

The SDK includes several models that represent the data structures used in API requests and responses. These models help in organizing and managing the data efficiently.

<details>
<summary>Below is a list of all available models with links to their detailed documentation:</summary>

| Name                                                                           | Description |
| :----------------------------------------------------------------------------- | :---------- |
| [InboxTokenResponseCollection](models/InboxTokenResponseCollection.md)         |             |
| [InboxTokenResponse](models/InboxTokenResponse.md)                             |             |
| [Links](models/Links.md)                                                       |             |
| [InboxToken](models/InboxToken.md)                                             |             |
| [DiscardResult](models/DiscardResult.md)                                       |             |
| [ApnsTokenCollection](models/ApnsTokenCollection.md)                           |             |
| [ApnsToken](models/ApnsToken.md)                                               |             |
| [ApnsTokenPayload](models/ApnsTokenPayload.md)                                 |             |
| [ExpoTokenCollection](models/ExpoTokenCollection.md)                           |             |
| [ExpoToken](models/ExpoToken.md)                                               |             |
| [ExpoTokenPayload](models/ExpoTokenPayload.md)                                 |             |
| [FcmTokenCollection](models/FcmTokenCollection.md)                             |             |
| [FcmToken](models/FcmToken.md)                                                 |             |
| [FcmTokenPayload](models/FcmTokenPayload.md)                                   |             |
| [SlackTokenCollection](models/SlackTokenCollection.md)                         |             |
| [SlackToken](models/SlackToken.md)                                             |             |
| [SlackTokenPayload](models/SlackTokenPayload.md)                               |             |
| [TeamsTokenCollection](models/TeamsTokenCollection.md)                         |             |
| [TeamsToken](models/TeamsToken.md)                                             |             |
| [TeamsTokenPayload](models/TeamsTokenPayload.md)                               |             |
| [UserPreferences](models/UserPreferences.md)                                   |             |
| [WebPushTokenCollection](models/WebPushTokenCollection.md)                     |             |
| [WebPushToken](models/WebPushToken.md)                                         |             |
| [WebPushTokenPayload](models/WebPushTokenPayload.md)                           |             |
| [InboxConfigPayload](models/InboxConfigPayload.md)                             |             |
| [SlackInstallation](models/SlackInstallation.md)                               |             |
| [SlackFinishInstallResponse](models/SlackFinishInstallResponse.md)             |             |
| [SlackStartInstall](models/SlackStartInstall.md)                               |             |
| [SlackStartInstallResponseContent](models/SlackStartInstallResponseContent.md) |             |
| [WebPushTokenPayload](models/WebPushTokenPayload.md)                           |             |
| [WebPushStartInstallationResponse](models/WebPushStartInstallationResponse.md) |             |
| [NotificationCollection](models/NotificationCollection.md)                     |             |
| [Notification](models/Notification.md)                                         |             |
| [Links](models/Links.md)                                                       |             |

</details>
