# IntegrationsService

A list of all methods in the `IntegrationsService` service. Click on the method name to view detailed information about that method.

| Methods                                                   | Description                                                                                                                                                             |
| :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [listIntegrations](#listintegrations)                     | Lists all available and configured integrations for the project. Returns a summary of each integration including its type, status, and basic configuration information. |
| [listApnsIntegrations](#listapnsintegrations)             | Retrieves the current APNs integration configurations for a specific integration type in the project. Returns configuration details and status information.             |
| [saveApnsIntegration](#saveapnsintegration)               | Updates or creates the APNs integration for the project.                                                                                                                |
| [deleteApnsIntegration](#deleteapnsintegration)           | Deletes the APNs integration configuration from the project. This will disable the integration's functionality within the project.                                      |
| [listExpoIntegrations](#listexpointegrations)             | Retrieves the current Expo integration configurations for a specific integration type in the project. Returns configuration details and status information.             |
| [saveExpoIntegration](#saveexpointegration)               | Updates or creates the Expo integration for the project.                                                                                                                |
| [deleteExpoIntegration](#deleteexpointegration)           | Deletes the Expo integration configuration from the project. This will disable the integration's functionality within the project.                                      |
| [listFcmIntegrations](#listfcmintegrations)               | Retrieves the current FCM integration configurations for a specific integration type in the project. Returns configuration details and status information.              |
| [saveFcmIntegration](#savefcmintegration)                 | Updates or creates the FCM integration for the project.                                                                                                                 |
| [deleteFcmIntegration](#deletefcmintegration)             | Deletes the FCM integration configuration from the project. This will disable the integration's functionality within the project.                                       |
| [listInboxIntegrations](#listinboxintegrations)           | Retrieves the current Inbox integration configurations for a specific integration type in the project. Returns configuration details and status information.            |
| [saveInboxIntegration](#saveinboxintegration)             | Updates or creates the Inbox integration for the project.                                                                                                               |
| [deleteInboxIntegration](#deleteinboxintegration)         | Deletes the Inbox integration configuration from the project. This will disable the integration's functionality within the project.                                     |
| [listMailgunIntegrations](#listmailgunintegrations)       | Retrieves the current Mailgun integration configurations for a specific integration type in the project. Returns configuration details and status information.          |
| [saveMailgunIntegration](#savemailgunintegration)         | Updates or creates the Mailgun integration for the project.                                                                                                             |
| [deleteMailgunIntegration](#deletemailgunintegration)     | Deletes the Mailgun integration configuration from the project. This will disable the integration's functionality within the project.                                   |
| [listPingEmailIntegrations](#listpingemailintegrations)   | Retrieves the current Ping Email integration configurations for a specific integration type in the project. Returns configuration details and status information.       |
| [savePingEmailIntegration](#savepingemailintegration)     | Updates or creates the Ping Email integration for the project.                                                                                                          |
| [deletePingEmailIntegration](#deletepingemailintegration) | Deletes the Ping Email integration configuration from the project. This will disable the integration's functionality within the project.                                |
| [listSendgridIntegrations](#listsendgridintegrations)     | Retrieves the current SendGrid integration configurations for a specific integration type in the project. Returns configuration details and status information.         |
| [saveSendgridIntegration](#savesendgridintegration)       | Updates or creates the SendGrid integration for the project.                                                                                                            |
| [deleteSendgridIntegration](#deletesendgridintegration)   | Deletes the SendGrid integration configuration from the project. This will disable the integration's functionality within the project.                                  |
| [listSesIntegrations](#listsesintegrations)               | Retrieves the current Amazon SES integration configurations for a specific integration type in the project. Returns configuration details and status information.       |
| [saveSesIntegration](#savesesintegration)                 | Updates or creates the Amazon SES integration for the project.                                                                                                          |
| [deleteSesIntegration](#deletesesintegration)             | Deletes the Amazon SES integration configuration from the project. This will disable the integration's functionality within the project.                                |
| [listSlackIntegrations](#listslackintegrations)           | Retrieves the current Slack integration configurations for a specific integration type in the project. Returns configuration details and status information.            |
| [saveSlackIntegration](#saveslackintegration)             | Updates or creates the Slack integration for the project.                                                                                                               |
| [deleteSlackIntegration](#deleteslackintegration)         | Deletes the Slack integration configuration from the project. This will disable the integration's functionality within the project.                                     |
| [listTwilioIntegrations](#listtwiliointegrations)         | Retrieves the current Twilio integration configurations for a specific integration type in the project. Returns configuration details and status information.           |
| [saveTwilioIntegration](#savetwiliointegration)           | Updates or creates the Twilio integration for the project.                                                                                                              |
| [deleteTwilioIntegration](#deletetwiliointegration)       | Deletes the Twilio integration configuration from the project. This will disable the integration's functionality within the project.                                    |
| [listWebPushIntegrations](#listwebpushintegrations)       | Retrieves the current Web Push integration configurations for a specific integration type in the project. Returns configuration details and status information.         |
| [saveWebPushIntegration](#savewebpushintegration)         | Updates or creates the Web Push integration for the project.                                                                                                            |
| [deleteWebPushIntegration](#deletewebpushintegration)     | Deletes the Web Push integration configuration from the project. This will disable the integration's functionality within the project.                                  |

## listIntegrations

Lists all available and configured integrations for the project. Returns a summary of each integration including its type, status, and basic configuration information.

- HTTP Method: `GET`
- Endpoint: `/integrations`

**Parameters**

| Name          | Type   | Required | Description |
| :------------ | :----- | :------- | :---------- |
| limit         | number | ❌       |             |
| startingAfter | string | ❌       |             |
| endingBefore  | string | ❌       |             |

**Return Type**

`IntegrationConfigCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.listIntegrations({
    limit: 1,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## listApnsIntegrations

Retrieves the current APNs integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/apns`

**Return Type**

`ApnsConfigCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.listApnsIntegrations();

  console.log(data);
})();
```

## saveApnsIntegration

Updates or creates the APNs integration for the project.

- HTTP Method: `PUT`
- Endpoint: `/integrations/apns`

**Parameters**

| Name | Type                                                | Required | Description       |
| :--- | :-------------------------------------------------- | :------- | :---------------- |
| body | [ApnsConfigPayload](../models/ApnsConfigPayload.md) | ❌       | The request body. |

**Return Type**

`ApnsConfigPayload`

**Example Usage Code Snippet**

```typescript
import { ApnsConfigPayload, Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
	token: 'YOUR_TOKEN'});

  const badge = Badge.UNREAD;

const payloadVersion = PayloadVersion._1;

const apnsConfigPayload: ApnsConfigPayload = {
  appId: "app_id",
  badge: badge,
  certificate: "BEGIN PRIVATE KEY---
/5
------- END PRIVATE KEYYYY-----
",
  keyId: "et reprehe",
  payloadVersion: payloadVersion,
  teamId: "do pariatu"
};

  const { data } = await client.integrations.saveApnsIntegration(
  apnsConfigPayload
);

  console.log(data);
})();
```

## deleteApnsIntegration

Deletes the APNs integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/apns`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ❌       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteApnsIntegration({
    id: 'id',
  });

  console.log(data);
})();
```

## listExpoIntegrations

Retrieves the current Expo integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/expo`

**Return Type**

`ExpoConfigCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.listExpoIntegrations();

  console.log(data);
})();
```

## saveExpoIntegration

Updates or creates the Expo integration for the project.

- HTTP Method: `PUT`
- Endpoint: `/integrations/expo`

**Parameters**

| Name | Type                                                | Required | Description       |
| :--- | :-------------------------------------------------- | :------- | :---------------- |
| body | [ExpoConfigPayload](../models/ExpoConfigPayload.md) | ❌       | The request body. |

**Return Type**

`ExpoConfigPayload`

**Example Usage Code Snippet**

```typescript
import { Client, ExpoConfigPayload } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const expoConfigPayload: ExpoConfigPayload = {
    accessToken: 'access_token',
  };

  const { data } = await client.integrations.saveExpoIntegration(expoConfigPayload);

  console.log(data);
})();
```

## deleteExpoIntegration

Deletes the Expo integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/expo`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ❌       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteExpoIntegration({
    id: 'id',
  });

  console.log(data);
})();
```

## listFcmIntegrations

Retrieves the current FCM integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/fcm`

**Return Type**

`FcmConfigCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.listFcmIntegrations();

  console.log(data);
})();
```

## saveFcmIntegration

Updates or creates the FCM integration for the project.

- HTTP Method: `PUT`
- Endpoint: `/integrations/fcm`

**Parameters**

| Name | Type                                              | Required | Description       |
| :--- | :------------------------------------------------ | :------- | :---------------- |
| body | [FcmConfigPayload](../models/FcmConfigPayload.md) | ❌       | The request body. |

**Return Type**

`FcmConfigPayload`

**Example Usage Code Snippet**

```typescript
import { Client, FcmConfigPayload } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
	token: 'YOUR_TOKEN'});

  const type_ = Type_.SERVICE_ACCOUNT;

const fcmConfigPayload: FcmConfigPayload = {
  authProviderX509CertUrl: "auth_provider_x509_cert_url",
  authUri: "auth_uri",
  clientEmail: "client_email",
  clientId: "client_id",
  clientX509CertUrl: "client_x509_cert_url",
  privateKey: "---------- BEGINBLZFVIIV-----------
BrvpB2GEoNB=
--- ENDIQVIQTLC---",
  privateKeyId: "private_key_id",
  projectId: "project_id",
  tokenUri: "token_uri",
  type: type_,
  universeDomain: "universe_domain"
};

  const { data } = await client.integrations.saveFcmIntegration(
  fcmConfigPayload
);

  console.log(data);
})();
```

## deleteFcmIntegration

Deletes the FCM integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/fcm`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ❌       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteFcmIntegration({
    id: 'id',
  });

  console.log(data);
})();
```

## listInboxIntegrations

Retrieves the current Inbox integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/inbox`

**Return Type**

`InboxConfigCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.listInboxIntegrations();

  console.log(data);
})();
```

## saveInboxIntegration

Updates or creates the Inbox integration for the project.

- HTTP Method: `PUT`
- Endpoint: `/integrations/inbox`

**Parameters**

| Name | Type                                                  | Required | Description       |
| :--- | :---------------------------------------------------- | :------- | :---------------- |
| body | [InboxConfigPayload](../models/InboxConfigPayload.md) | ❌       | The request body. |

**Return Type**

`InboxConfigPayload`

**Example Usage Code Snippet**

```typescript
import { Client, InboxConfigPayload } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const images: Images = {
    emptyInboxUrl: 'emptyInboxUrl',
  };

  const banner: Banner = {
    backgroundColor: 'backgroundColor',
    backgroundOpacity: 8.02,
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

  const notification: Notification = {
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
    notification: notification,
    unseenBadge: unseenBadge,
  };

  const inboxConfigPayload: InboxConfigPayload = {
    images: images,
    locale: 'locale',
    theme: theme,
  };

  const { data } = await client.integrations.saveInboxIntegration(inboxConfigPayload);

  console.log(data);
})();
```

## deleteInboxIntegration

Deletes the Inbox integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/inbox`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ❌       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteInboxIntegration({
    id: 'id',
  });

  console.log(data);
})();
```

## listMailgunIntegrations

Retrieves the current Mailgun integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/mailgun`

**Return Type**

`MailgunConfigCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.listMailgunIntegrations();

  console.log(data);
})();
```

## saveMailgunIntegration

Updates or creates the Mailgun integration for the project.

- HTTP Method: `PUT`
- Endpoint: `/integrations/mailgun`

**Parameters**

| Name | Type                                                      | Required | Description       |
| :--- | :-------------------------------------------------------- | :------- | :---------------- |
| body | [MailgunConfigPayload](../models/MailgunConfigPayload.md) | ❌       | The request body. |

**Return Type**

`MailgunConfigPayload`

**Example Usage Code Snippet**

```typescript
import { Client, MailgunConfigPayload } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const mailgunConfigPayloadFrom: MailgunConfigPayloadFrom = {
    email: 'email',
    name: 'name',
  };

  const region = Region.US;

  const mailgunConfigPayload: MailgunConfigPayload = {
    apiKey: 'api_key',
    domain: 'domain',
    from: mailgunConfigPayloadFrom,
    region: region,
  };

  const { data } = await client.integrations.saveMailgunIntegration(mailgunConfigPayload);

  console.log(data);
})();
```

## deleteMailgunIntegration

Deletes the Mailgun integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/mailgun`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ❌       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteMailgunIntegration({
    id: 'id',
  });

  console.log(data);
})();
```

## listPingEmailIntegrations

Retrieves the current Ping Email integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/ping_email`

**Return Type**

`PingConfigCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.listPingEmailIntegrations();

  console.log(data);
})();
```

## savePingEmailIntegration

Updates or creates the Ping Email integration for the project.

- HTTP Method: `PUT`
- Endpoint: `/integrations/ping_email`

**Parameters**

| Name | Type                                                | Required | Description       |
| :--- | :-------------------------------------------------- | :------- | :---------------- |
| body | [PingConfigPayload](../models/PingConfigPayload.md) | ❌       | The request body. |

**Return Type**

`PingConfigPayload`

**Example Usage Code Snippet**

```typescript
import { Client, PingConfigPayload } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const pingConfigPayload: PingConfigPayload = {
    url: 'url',
  };

  const { data } = await client.integrations.savePingEmailIntegration(pingConfigPayload);

  console.log(data);
})();
```

## deletePingEmailIntegration

Deletes the Ping Email integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/ping_email`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ❌       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deletePingEmailIntegration({
    id: 'id',
  });

  console.log(data);
})();
```

## listSendgridIntegrations

Retrieves the current SendGrid integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/sendgrid`

**Return Type**

`SendgridConfigCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.listSendgridIntegrations();

  console.log(data);
})();
```

## saveSendgridIntegration

Updates or creates the SendGrid integration for the project.

- HTTP Method: `PUT`
- Endpoint: `/integrations/sendgrid`

**Parameters**

| Name | Type                                                        | Required | Description       |
| :--- | :---------------------------------------------------------- | :------- | :---------------- |
| body | [SendgridConfigPayload](../models/SendgridConfigPayload.md) | ❌       | The request body. |

**Return Type**

`SendgridConfigPayload`

**Example Usage Code Snippet**

```typescript
import { Client, SendgridConfigPayload } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const sendgridConfigPayloadFrom: SendgridConfigPayloadFrom = {
    email: 'email',
    name: 'name',
  };

  const replyTo: ReplyTo = {
    email: 'email',
    name: 'name',
  };

  const sendgridConfigPayload: SendgridConfigPayload = {
    apiKey: 'api_key',
    from: sendgridConfigPayloadFrom,
    replyTo: replyTo,
  };

  const { data } = await client.integrations.saveSendgridIntegration(sendgridConfigPayload);

  console.log(data);
})();
```

## deleteSendgridIntegration

Deletes the SendGrid integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/sendgrid`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ❌       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteSendgridIntegration({
    id: 'id',
  });

  console.log(data);
})();
```

## listSesIntegrations

Retrieves the current Amazon SES integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/ses`

**Return Type**

`SesConfigCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.listSesIntegrations();

  console.log(data);
})();
```

## saveSesIntegration

Updates or creates the Amazon SES integration for the project.

- HTTP Method: `PUT`
- Endpoint: `/integrations/ses`

**Parameters**

| Name | Type                                              | Required | Description       |
| :--- | :------------------------------------------------ | :------- | :---------------- |
| body | [SesConfigPayload](../models/SesConfigPayload.md) | ❌       | The request body. |

**Return Type**

`SesConfigPayload`

**Example Usage Code Snippet**

```typescript
import { Client, SesConfigPayload } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const sesConfigPayloadFrom: SesConfigPayloadFrom = {
    email: 'email',
    name: 'name',
  };

  const sesConfigPayload: SesConfigPayload = {
    from: sesConfigPayloadFrom,
    keyId: 'key_id',
    region: 'region',
    secretKey: 'secret_key',
  };

  const { data } = await client.integrations.saveSesIntegration(sesConfigPayload);

  console.log(data);
})();
```

## deleteSesIntegration

Deletes the Amazon SES integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/ses`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ❌       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteSesIntegration({
    id: 'id',
  });

  console.log(data);
})();
```

## listSlackIntegrations

Retrieves the current Slack integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/slack`

**Return Type**

`SlackConfigCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.listSlackIntegrations();

  console.log(data);
})();
```

## saveSlackIntegration

Updates or creates the Slack integration for the project.

- HTTP Method: `PUT`
- Endpoint: `/integrations/slack`

**Parameters**

| Name | Type                                                  | Required | Description       |
| :--- | :---------------------------------------------------- | :------- | :---------------- |
| body | [SlackConfigPayload](../models/SlackConfigPayload.md) | ❌       | The request body. |

**Return Type**

`SlackConfigPayload`

**Example Usage Code Snippet**

```typescript
import { Client, SlackConfigPayload } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const slackConfigPayload: SlackConfigPayload = {
    appId: 'VDHAC',
    clientId: '27521046.35070406',
    clientSecret: 'in laboris ullamco nulla aliquip',
    signingSecret: 'esse exercitation etdolore aute ',
  };

  const { data } = await client.integrations.saveSlackIntegration(slackConfigPayload);

  console.log(data);
})();
```

## deleteSlackIntegration

Deletes the Slack integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/slack`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ❌       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteSlackIntegration({
    id: 'id',
  });

  console.log(data);
})();
```

## listTwilioIntegrations

Retrieves the current Twilio integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/twilio`

**Return Type**

`TwilioConfigCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.listTwilioIntegrations();

  console.log(data);
})();
```

## saveTwilioIntegration

Updates or creates the Twilio integration for the project.

- HTTP Method: `PUT`
- Endpoint: `/integrations/twilio`

**Parameters**

| Name | Type                                                    | Required | Description       |
| :--- | :------------------------------------------------------ | :------- | :---------------- |
| body | [TwilioConfigPayload](../models/TwilioConfigPayload.md) | ❌       | The request body. |

**Return Type**

`TwilioConfigPayload`

**Example Usage Code Snippet**

```typescript
import { Client, TwilioConfigPayload } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const twilioConfigPayload: TwilioConfigPayload = {
    accountSid: 'account_sid',
    apiKey: 'api_key',
    apiSecret: 'api_secret',
    from: '+43543',
  };

  const { data } = await client.integrations.saveTwilioIntegration(twilioConfigPayload);

  console.log(data);
})();
```

## deleteTwilioIntegration

Deletes the Twilio integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/twilio`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ❌       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteTwilioIntegration({
    id: 'id',
  });

  console.log(data);
})();
```

## listWebPushIntegrations

Retrieves the current Web Push integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/web_push`

**Return Type**

`WebpushConfigCollection`

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.listWebPushIntegrations();

  console.log(data);
})();
```

## saveWebPushIntegration

Updates or creates the Web Push integration for the project.

- HTTP Method: `PUT`
- Endpoint: `/integrations/web_push`

**Parameters**

| Name | Type                                                      | Required | Description       |
| :--- | :-------------------------------------------------------- | :------- | :---------------- |
| body | [WebpushConfigPayload](../models/WebpushConfigPayload.md) | ❌       | The request body. |

**Return Type**

`WebpushConfigPayload`

**Example Usage Code Snippet**

```typescript
import { Client, WebpushConfigPayload } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const webpushConfigPayload: WebpushConfigPayload = {
    privateKey: 'private_key',
    publicKey: 'public_key',
  };

  const { data } = await client.integrations.saveWebPushIntegration(webpushConfigPayload);

  console.log(data);
})();
```

## deleteWebPushIntegration

Deletes the Web Push integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/web_push`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ❌       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from 'magicbell-js/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteWebPushIntegration({
    id: 'id',
  });

  console.log(data);
})();
```
