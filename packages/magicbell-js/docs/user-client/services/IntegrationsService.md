# IntegrationsService

A list of all methods in the `IntegrationsService` service. Click on the method name to view detailed information about that method.

| Methods                                                                     | Description                                                                                                                                                                                                   |
| :-------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [saveInboxInstallation](#saveinboxinstallation)                             | Creates a new installation of a Inbox integration for a user. This endpoint is used when an integration needs to be set up with user-specific credentials or configuration.                                   |
| [startInboxInstallation](#startinboxinstallation)                           | Initiates the installation flow for an Inbox integration. This is the first step in a multi-step installation process where user authorization or external service configuration may be required.             |
| [saveMagicbellSlackbotInstallation](#savemagicbellslackbotinstallation)     | Creates a new installation of a MagicBell SlackBot integration for a user. This endpoint is used when an integration needs to be set up with user-specific credentials or configuration.                      |
| [finishMagicbellSlackbotInstallation](#finishmagicbellslackbotinstallation) | Completes the installation flow for the MagicBell SlackBot integration. This endpoint is typically called after the user has completed any required authorization steps with MagicBell SlackBot.              |
| [startMagicbellSlackbotInstallation](#startmagicbellslackbotinstallation)   | Initiates the installation flow for a MagicBell SlackBot integration. This is the first step in a multi-step installation process where user authorization or external service configuration may be required. |
| [saveSlackInstallation](#saveslackinstallation)                             | Creates a new installation of a Slack integration for a user. This endpoint is used when an integration needs to be set up with user-specific credentials or configuration.                                   |
| [finishSlackInstallation](#finishslackinstallation)                         | Completes the installation flow for the Slack integration. This endpoint is typically called after the user has completed any required authorization steps with Slack.                                        |
| [startSlackInstallation](#startslackinstallation)                           | Initiates the installation flow for a Slack integration. This is the first step in a multi-step installation process where user authorization or external service configuration may be required.              |
| [saveWebPushInstallation](#savewebpushinstallation)                         | Creates a new installation of a Web Push integration for a user. This endpoint is used when an integration needs to be set up with user-specific credentials or configuration.                                |
| [startWebPushInstallation](#startwebpushinstallation)                       | Initiates the installation flow for a Web Push integration. This is the first step in a multi-step installation process where user authorization or external service configuration may be required.           |

## saveInboxInstallation

Creates a new installation of a Inbox integration for a user. This endpoint is used when an integration needs to be set up with user-specific credentials or configuration.

- HTTP Method: `PUT`
- Endpoint: `/integrations/inbox/installations`

**Parameters**

| Name | Type                                                  | Required | Description       |
| :--- | :---------------------------------------------------- | :------- | :---------------- |
| body | [InboxConfigPayload](../models/InboxConfigPayload.md) | ❌       | The request body. |

**Return Type**

`InboxConfigPayload`

**Example Usage Code Snippet**

```typescript
import {
  Banner,
  Client,
  DefaultHover,
  DefaultState,
  Default_,
  Dialog,
  Footer,
  Header,
  Icon,
  Images,
  InboxConfigPayload,
  Theme,
  ThemeNotification,
  Unread,
  UnreadHover,
  UnreadState,
  Unseen,
  UnseenBadge,
  UnseenHover,
  UnseenState,
} from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const images: Images = {
    emptyInboxUrl: 'emptyInboxUrl',
  };

  const banner: Banner = {
    backgroundColor: 'backgroundColor',
    backgroundOpacity: 8.17,
    fontSize: 'fontSize',
    textColor: 'textColor',
  };

  const dialog: Dialog = {
    accentColor: 'accentColor',
    backgroundColor: 'backgroundColor',
    textColor: 'textColor',
  };

  const footer: Footer = {
    backgroundColor: 'backgroundColor',
    borderRadius: 'borderRadius',
    fontSize: 'fontSize',
    textColor: 'textColor',
  };

  const header: Header = {
    backgroundColor: 'backgroundColor',
    borderRadius: 'borderRadius',
    fontFamily: 'fontFamily',
    fontSize: 'fontSize',
    textColor: 'textColor',
  };

  const icon: Icon = {
    borderColor: 'borderColor',
    width: 'width',
  };

  const defaultHover: DefaultHover = {
    backgroundColor: 'backgroundColor',
  };

  const defaultState: DefaultState = {
    color: 'color',
  };

  const default_: Default_ = {
    backgroundColor: 'backgroundColor',
    borderRadius: 'borderRadius',
    fontFamily: 'fontFamily',
    fontSize: 'fontSize',
    hover: defaultHover,
    margin: 'margin',
    state: defaultState,
    textColor: 'textColor',
  };

  const unreadHover: UnreadHover = {
    backgroundColor: 'backgroundColor',
  };

  const unreadState: UnreadState = {
    color: 'color',
  };

  const unread: Unread = {
    backgroundColor: 'backgroundColor',
    hover: unreadHover,
    state: unreadState,
    textColor: 'textColor',
  };

  const unseenHover: UnseenHover = {
    backgroundColor: 'backgroundColor',
  };

  const unseenState: UnseenState = {
    color: 'color',
  };

  const unseen: Unseen = {
    backgroundColor: 'backgroundColor',
    hover: unseenHover,
    state: unseenState,
    textColor: 'textColor',
  };

  const themeNotification: ThemeNotification = {
    default: default_,
    unread: unread,
    unseen: unseen,
  };

  const unseenBadge: UnseenBadge = {
    backgroundColor: 'backgroundColor',
  };

  const theme: Theme = {
    banner: banner,
    dialog: dialog,
    footer: footer,
    header: header,
    icon: icon,
    notification: themeNotification,
    unseenBadge: unseenBadge,
  };

  const inboxConfigPayload: InboxConfigPayload = {
    images: images,
    locale: 'locale',
    theme: theme,
  };

  const { data } = await client.integrations.saveInboxInstallation(inboxConfigPayload);

  console.log(data);
})();
```

## startInboxInstallation

Initiates the installation flow for an Inbox integration. This is the first step in a multi-step installation process where user authorization or external service configuration may be required.

- HTTP Method: `POST`
- Endpoint: `/integrations/inbox/installations/start`

**Return Type**

`InboxConfigPayload`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.startInboxInstallation();

  console.log(data);
})();
```

## saveMagicbellSlackbotInstallation

Creates a new installation of a MagicBell SlackBot integration for a user. This endpoint is used when an integration needs to be set up with user-specific credentials or configuration.

- HTTP Method: `PUT`
- Endpoint: `/integrations/magicbell_slackbot/installations`

**Parameters**

| Name | Type                                                | Required | Description       |
| :--- | :-------------------------------------------------- | :------- | :---------------- |
| body | [SlackInstallation](../models/SlackInstallation.md) | ❌       | The request body. |

**Return Type**

`SlackInstallation`

**Example Usage Code Snippet**

```typescript
import { AuthedUser, Client, Enterprise, IncomingWebhook, SlackInstallation, Team } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
	token: 'YOUR_TOKEN',
});


  const authedUser: AuthedUser = {
    accessToken: "access_token",
    expiresIn: 1,
    id: "id",
    refreshToken: "refresh_token",
    scope: "scope",
    tokenType: "token_type"
  };


  const enterprise: Enterprise = {
    id: "id",
    name: "name"
  };


  const incomingWebhook: IncomingWebhook = {
    channel: "channel",
    configurationUrl: "configuration_url",
    url: "url"
  };


  const team: Team = {
    id: "id",
    name: "name"
  };

  const slackInstallation: SlackInstallation = {
    accessToken: "access_token",
    appId: "app_id",
    authedUser: authedUser,
    botUserId: "bot_user_id",
    enterprise: enterprise,
    expiresIn: 4,
    id: "CCAJ-G\",
    incomingWebhook: incomingWebhook,
    isEnterpriseInstall: true,
    refreshToken: "refresh_token",
    scope: "scope",
    team: team,
    tokenType: "token_type"
  };

  const { data } = await client.integrations.saveMagicbellSlackbotInstallation(slackInstallation);

  console.log(data);
})();
```

## finishMagicbellSlackbotInstallation

Completes the installation flow for the MagicBell SlackBot integration. This endpoint is typically called after the user has completed any required authorization steps with MagicBell SlackBot.

- HTTP Method: `POST`
- Endpoint: `/integrations/magicbell_slackbot/installations/finish`

**Parameters**

| Name | Type                                                                  | Required | Description       |
| :--- | :-------------------------------------------------------------------- | :------- | :---------------- |
| body | [SlackFinishInstallResponse](../models/SlackFinishInstallResponse.md) | ❌       | The request body. |

**Return Type**

`SlackInstallation`

**Example Usage Code Snippet**

```typescript
import { Client, SlackFinishInstallResponse } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const slackFinishInstallResponse: SlackFinishInstallResponse = {
    appId: 'app_id',
    code: 'code',
    redirectUrl: 'redirect_url',
  };

  const { data } = await client.integrations.finishMagicbellSlackbotInstallation(slackFinishInstallResponse);

  console.log(data);
})();
```

## startMagicbellSlackbotInstallation

Initiates the installation flow for a MagicBell SlackBot integration. This is the first step in a multi-step installation process where user authorization or external service configuration may be required.

- HTTP Method: `POST`
- Endpoint: `/integrations/magicbell_slackbot/installations/start`

**Parameters**

| Name | Type                                                | Required | Description       |
| :--- | :-------------------------------------------------- | :------- | :---------------- |
| body | [SlackStartInstall](../models/SlackStartInstall.md) | ❌       | The request body. |

**Return Type**

`SlackStartInstallResponseContent`

**Example Usage Code Snippet**

```typescript
import { Client, SlackStartInstall } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const slackStartInstall: SlackStartInstall = {
    appId: 'app_id',
    authUrl: 'auth_url',
    extraScopes: ['extra_scopes'],
    redirectUrl: 'redirect_url',
  };

  const { data } = await client.integrations.startMagicbellSlackbotInstallation(slackStartInstall);

  console.log(data);
})();
```

## saveSlackInstallation

Creates a new installation of a Slack integration for a user. This endpoint is used when an integration needs to be set up with user-specific credentials or configuration.

- HTTP Method: `PUT`
- Endpoint: `/integrations/slack/installations`

**Parameters**

| Name | Type                                                | Required | Description       |
| :--- | :-------------------------------------------------- | :------- | :---------------- |
| body | [SlackInstallation](../models/SlackInstallation.md) | ❌       | The request body. |

**Return Type**

`SlackInstallation`

**Example Usage Code Snippet**

```typescript
import { AuthedUser, Client, Enterprise, IncomingWebhook, SlackInstallation, Team } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
	token: 'YOUR_TOKEN',
});


  const authedUser: AuthedUser = {
    accessToken: "access_token",
    expiresIn: 1,
    id: "id",
    refreshToken: "refresh_token",
    scope: "scope",
    tokenType: "token_type"
  };


  const enterprise: Enterprise = {
    id: "id",
    name: "name"
  };


  const incomingWebhook: IncomingWebhook = {
    channel: "channel",
    configurationUrl: "configuration_url",
    url: "url"
  };


  const team: Team = {
    id: "id",
    name: "name"
  };

  const slackInstallation: SlackInstallation = {
    accessToken: "access_token",
    appId: "app_id",
    authedUser: authedUser,
    botUserId: "bot_user_id",
    enterprise: enterprise,
    expiresIn: 4,
    id: "CCAJ-G\",
    incomingWebhook: incomingWebhook,
    isEnterpriseInstall: true,
    refreshToken: "refresh_token",
    scope: "scope",
    team: team,
    tokenType: "token_type"
  };

  const { data } = await client.integrations.saveSlackInstallation(slackInstallation);

  console.log(data);
})();
```

## finishSlackInstallation

Completes the installation flow for the Slack integration. This endpoint is typically called after the user has completed any required authorization steps with Slack.

- HTTP Method: `POST`
- Endpoint: `/integrations/slack/installations/finish`

**Parameters**

| Name | Type                                                                  | Required | Description       |
| :--- | :-------------------------------------------------------------------- | :------- | :---------------- |
| body | [SlackFinishInstallResponse](../models/SlackFinishInstallResponse.md) | ❌       | The request body. |

**Return Type**

`SlackInstallation`

**Example Usage Code Snippet**

```typescript
import { Client, SlackFinishInstallResponse } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const slackFinishInstallResponse: SlackFinishInstallResponse = {
    appId: 'app_id',
    code: 'code',
    redirectUrl: 'redirect_url',
  };

  const { data } = await client.integrations.finishSlackInstallation(slackFinishInstallResponse);

  console.log(data);
})();
```

## startSlackInstallation

Initiates the installation flow for a Slack integration. This is the first step in a multi-step installation process where user authorization or external service configuration may be required.

- HTTP Method: `POST`
- Endpoint: `/integrations/slack/installations/start`

**Parameters**

| Name | Type                                                | Required | Description       |
| :--- | :-------------------------------------------------- | :------- | :---------------- |
| body | [SlackStartInstall](../models/SlackStartInstall.md) | ❌       | The request body. |

**Return Type**

`SlackStartInstallResponseContent`

**Example Usage Code Snippet**

```typescript
import { Client, SlackStartInstall } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const slackStartInstall: SlackStartInstall = {
    appId: 'app_id',
    authUrl: 'auth_url',
    extraScopes: ['extra_scopes'],
    redirectUrl: 'redirect_url',
  };

  const { data } = await client.integrations.startSlackInstallation(slackStartInstall);

  console.log(data);
})();
```

## saveWebPushInstallation

Creates a new installation of a Web Push integration for a user. This endpoint is used when an integration needs to be set up with user-specific credentials or configuration.

- HTTP Method: `PUT`
- Endpoint: `/integrations/web_push/installations`

**Parameters**

| Name | Type                                                    | Required | Description       |
| :--- | :------------------------------------------------------ | :------- | :---------------- |
| body | [WebPushTokenPayload](../models/WebPushTokenPayload.md) | ❌       | The request body. |

**Return Type**

`WebPushTokenPayload`

**Example Usage Code Snippet**

```typescript
import { Client, WebPushTokenPayload, WebPushTokenPayloadKeys } from 'magicbell-js/user-client';

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

  const { data } = await client.integrations.saveWebPushInstallation(webPushTokenPayload);

  console.log(data);
})();
```

## startWebPushInstallation

Initiates the installation flow for a Web Push integration. This is the first step in a multi-step installation process where user authorization or external service configuration may be required.

- HTTP Method: `POST`
- Endpoint: `/integrations/web_push/installations/start`

**Return Type**

`WebPushStartInstallationResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/user-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.startWebPushInstallation();

  console.log(data);
})();
```
