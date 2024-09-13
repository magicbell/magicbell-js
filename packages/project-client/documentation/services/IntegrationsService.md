# IntegrationsService

A list of all methods in the `IntegrationsService` service. Click on the method name to view detailed information about that method.

| Methods                                                           | Description |
| :---------------------------------------------------------------- | :---------- |
| [listIntegrations](#listintegrations)                             |             |
| [getApnsIntegration](#getapnsintegration)                         |             |
| [saveApnsIntegration](#saveapnsintegration)                       |             |
| [deleteApnsIntegration](#deleteapnsintegration)                   |             |
| [deleteApnsIntegrationById](#deleteapnsintegrationbyid)           |             |
| [getAwssnsIntegration](#getawssnsintegration)                     |             |
| [saveAwssnsIntegration](#saveawssnsintegration)                   |             |
| [deleteAwssnsIntegration](#deleteawssnsintegration)               |             |
| [deleteAwssnsIntegrationById](#deleteawssnsintegrationbyid)       |             |
| [getExpoIntegration](#getexpointegration)                         |             |
| [saveExpoIntegration](#saveexpointegration)                       |             |
| [deleteExpoIntegration](#deleteexpointegration)                   |             |
| [deleteExpoIntegrationById](#deleteexpointegrationbyid)           |             |
| [getFcmIntegration](#getfcmintegration)                           |             |
| [saveFcmIntegration](#savefcmintegration)                         |             |
| [deleteFcmIntegration](#deletefcmintegration)                     |             |
| [deleteFcmIntegrationById](#deletefcmintegrationbyid)             |             |
| [getGithubIntegration](#getgithubintegration)                     |             |
| [saveGithubIntegration](#savegithubintegration)                   |             |
| [deleteGithubIntegration](#deletegithubintegration)               |             |
| [deleteGithubIntegrationById](#deletegithubintegrationbyid)       |             |
| [getInboxIntegration](#getinboxintegration)                       |             |
| [saveInboxIntegration](#saveinboxintegration)                     |             |
| [deleteInboxIntegration](#deleteinboxintegration)                 |             |
| [deleteInboxIntegrationById](#deleteinboxintegrationbyid)         |             |
| [getMailgunIntegration](#getmailgunintegration)                   |             |
| [saveMailgunIntegration](#savemailgunintegration)                 |             |
| [deleteMailgunIntegration](#deletemailgunintegration)             |             |
| [deleteMailgunIntegrationById](#deletemailgunintegrationbyid)     |             |
| [getPingEmailIntegration](#getpingemailintegration)               |             |
| [savePingEmailIntegration](#savepingemailintegration)             |             |
| [deletePingEmailIntegration](#deletepingemailintegration)         |             |
| [deletePingEmailIntegrationById](#deletepingemailintegrationbyid) |             |
| [getSendgridIntegration](#getsendgridintegration)                 |             |
| [saveSendgridIntegration](#savesendgridintegration)               |             |
| [deleteSendgridIntegration](#deletesendgridintegration)           |             |
| [deleteSendgridIntegrationById](#deletesendgridintegrationbyid)   |             |
| [getSesIntegration](#getsesintegration)                           |             |
| [saveSesIntegration](#savesesintegration)                         |             |
| [deleteSesIntegration](#deletesesintegration)                     |             |
| [deleteSesIntegrationById](#deletesesintegrationbyid)             |             |
| [getSlackIntegration](#getslackintegration)                       |             |
| [saveSlackIntegration](#saveslackintegration)                     |             |
| [deleteSlackIntegration](#deleteslackintegration)                 |             |
| [deleteSlackIntegrationById](#deleteslackintegrationbyid)         |             |
| [getStripeIntegration](#getstripeintegration)                     |             |
| [saveStripeIntegration](#savestripeintegration)                   |             |
| [deleteStripeIntegration](#deletestripeintegration)               |             |
| [deleteStripeIntegrationById](#deletestripeintegrationbyid)       |             |
| [getTemplatesIntegration](#gettemplatesintegration)               |             |
| [saveTemplatesIntegration](#savetemplatesintegration)             |             |
| [deleteTemplatesIntegration](#deletetemplatesintegration)         |             |
| [deleteTemplatesIntegrationById](#deletetemplatesintegrationbyid) |             |
| [getTwilioIntegration](#gettwiliointegration)                     |             |
| [saveTwilioIntegration](#savetwiliointegration)                   |             |
| [deleteTwilioIntegration](#deletetwiliointegration)               |             |
| [deleteTwilioIntegrationById](#deletetwiliointegrationbyid)       |             |
| [getWebPushIntegration](#getwebpushintegration)                   |             |
| [saveWebPushIntegration](#savewebpushintegration)                 |             |
| [deleteWebPushIntegration](#deletewebpushintegration)             |             |
| [deleteWebPushIntegrationById](#deletewebpushintegrationbyid)     |             |

## listIntegrations

- HTTP Method: `GET`
- Endpoint: `/integrations`

**Return Type**

`ListIntegrationsResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.listIntegrations();

  console.log(data);
})();
```

## getApnsIntegration

- HTTP Method: `GET`
- Endpoint: `/integrations/apns`

**Return Type**

`ListIntegrationsResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.getApnsIntegration();

  console.log(data);
})();
```

## saveApnsIntegration

- HTTP Method: `PUT`
- Endpoint: `/integrations/apns`

**Parameters**

| Name | Type                                    | Required | Description       |
| :--- | :-------------------------------------- | :------- | :---------------- |
| body | `[ApnsConfig](../models/ApnsConfig.md)` | ❌       | The request body. |

**Return Type**

`ApnsConfig`

**Example Usage Code Snippet**

```typescript
import { ApnsConfig, Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const badge = Badge.UNREAD;

  const apnsConfig: ApnsConfig = {
    appId: 'ZabA6uTnpv8S3Obr6slNb|wfbQCxeGJ9TTf;gEpHhFigXjWvQ8I6kN3xOSJGiGC',
    badge: badge,
    certificate: 'certificate',
    keyId: 'eiusmod pa',
    teamId: 'adipisicin',
  };

  const { data } = await client.integrations.saveApnsIntegration(input);

  console.log(data);
})();
```

## deleteApnsIntegration

- HTTP Method: `DELETE`
- Endpoint: `/integrations/apns`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteApnsIntegration();

  console.log(data);
})();
```

## deleteApnsIntegrationById

- HTTP Method: `DELETE`
- Endpoint: `/integrations/apns/{id}`

**Parameters**

| Name | Type     | Required | Description |
| :--- | :------- | :------- | :---------- |
| id   | `string` | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteApnsIntegrationById('id');

  console.log(data);
})();
```

## getAwssnsIntegration

- HTTP Method: `GET`
- Endpoint: `/integrations/awssns`

**Return Type**

`ListIntegrationsResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.getAwssnsIntegration();

  console.log(data);
})();
```

## saveAwssnsIntegration

- HTTP Method: `PUT`
- Endpoint: `/integrations/awssns`

**Parameters**

| Name | Type                                        | Required | Description       |
| :--- | :------------------------------------------ | :------- | :---------------- |
| body | `[AwssnsConfig](../models/AwssnsConfig.md)` | ❌       | The request body. |

**Return Type**

`AwssnsConfig`

**Example Usage Code Snippet**

```typescript
import { AwssnsConfig, Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const awssnsConfig: AwssnsConfig = {
    webhookSigningSecret: 'voluptate',
  };

  const { data } = await client.integrations.saveAwssnsIntegration(input);

  console.log(data);
})();
```

## deleteAwssnsIntegration

- HTTP Method: `DELETE`
- Endpoint: `/integrations/awssns`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteAwssnsIntegration();

  console.log(data);
})();
```

## deleteAwssnsIntegrationById

- HTTP Method: `DELETE`
- Endpoint: `/integrations/awssns/{id}`

**Parameters**

| Name | Type     | Required | Description |
| :--- | :------- | :------- | :---------- |
| id   | `string` | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteAwssnsIntegrationById('id');

  console.log(data);
})();
```

## getExpoIntegration

- HTTP Method: `GET`
- Endpoint: `/integrations/expo`

**Return Type**

`ListIntegrationsResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.getExpoIntegration();

  console.log(data);
})();
```

## saveExpoIntegration

- HTTP Method: `PUT`
- Endpoint: `/integrations/expo`

**Parameters**

| Name | Type                                    | Required | Description       |
| :--- | :-------------------------------------- | :------- | :---------------- |
| body | `[ExpoConfig](../models/ExpoConfig.md)` | ❌       | The request body. |

**Return Type**

`ExpoConfig`

**Example Usage Code Snippet**

```typescript
import { Client, ExpoConfig } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const expoConfig: ExpoConfig = {
    accessToken: 'non dolor',
  };

  const { data } = await client.integrations.saveExpoIntegration(input);

  console.log(data);
})();
```

## deleteExpoIntegration

- HTTP Method: `DELETE`
- Endpoint: `/integrations/expo`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteExpoIntegration();

  console.log(data);
})();
```

## deleteExpoIntegrationById

- HTTP Method: `DELETE`
- Endpoint: `/integrations/expo/{id}`

**Parameters**

| Name | Type     | Required | Description |
| :--- | :------- | :------- | :---------- |
| id   | `string` | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteExpoIntegrationById('id');

  console.log(data);
})();
```

## getFcmIntegration

- HTTP Method: `GET`
- Endpoint: `/integrations/fcm`

**Return Type**

`ListIntegrationsResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.getFcmIntegration();

  console.log(data);
})();
```

## saveFcmIntegration

- HTTP Method: `PUT`
- Endpoint: `/integrations/fcm`

**Parameters**

| Name | Type                                  | Required | Description       |
| :--- | :------------------------------------ | :------- | :---------------- |
| body | `[FcmConfig](../models/FcmConfig.md)` | ❌       | The request body. |

**Return Type**

`FcmConfig`

**Example Usage Code Snippet**

```typescript
import { Client, FcmConfig } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const type_ = Type_.SERVICEACCOUNT;

  const fcmConfig: FcmConfig = {
    authProviderX509CertUrl: 'auth_provider_x509_cert_url',
    authUri: 'auth_uri',
    clientEmail: 'client_email',
    clientId: 'client_id',
    clientX509CertUrl: 'client_x509_cert_url',
    privateKey: 'private_key',
    privateKeyId: 'private_key_id',
    projectId: 'project_id',
    tokenUri: 'token_uri',
    type: type_,
    universeDomain: 'universe_domain',
  };

  const { data } = await client.integrations.saveFcmIntegration(input);

  console.log(data);
})();
```

## deleteFcmIntegration

- HTTP Method: `DELETE`
- Endpoint: `/integrations/fcm`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteFcmIntegration();

  console.log(data);
})();
```

## deleteFcmIntegrationById

- HTTP Method: `DELETE`
- Endpoint: `/integrations/fcm/{id}`

**Parameters**

| Name | Type     | Required | Description |
| :--- | :------- | :------- | :---------- |
| id   | `string` | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteFcmIntegrationById('id');

  console.log(data);
})();
```

## getGithubIntegration

- HTTP Method: `GET`
- Endpoint: `/integrations/github`

**Return Type**

`ListIntegrationsResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.getGithubIntegration();

  console.log(data);
})();
```

## saveGithubIntegration

- HTTP Method: `PUT`
- Endpoint: `/integrations/github`

**Parameters**

| Name | Type                                        | Required | Description       |
| :--- | :------------------------------------------ | :------- | :---------------- |
| body | `[GithubConfig](../models/GithubConfig.md)` | ❌       | The request body. |

**Return Type**

`GithubConfig`

**Example Usage Code Snippet**

```typescript
import { Client, GithubConfig } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const githubConfig: GithubConfig = {
    webhookSigningSecret: 'ut',
  };

  const { data } = await client.integrations.saveGithubIntegration(input);

  console.log(data);
})();
```

## deleteGithubIntegration

- HTTP Method: `DELETE`
- Endpoint: `/integrations/github`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteGithubIntegration();

  console.log(data);
})();
```

## deleteGithubIntegrationById

- HTTP Method: `DELETE`
- Endpoint: `/integrations/github/{id}`

**Parameters**

| Name | Type     | Required | Description |
| :--- | :------- | :------- | :---------- |
| id   | `string` | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteGithubIntegrationById('id');

  console.log(data);
})();
```

## getInboxIntegration

- HTTP Method: `GET`
- Endpoint: `/integrations/inbox`

**Return Type**

`ListIntegrationsResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.getInboxIntegration();

  console.log(data);
})();
```

## saveInboxIntegration

- HTTP Method: `PUT`
- Endpoint: `/integrations/inbox`

**Parameters**

| Name | Type                                      | Required | Description       |
| :--- | :---------------------------------------- | :------- | :---------------- |
| body | `[InboxConfig](../models/InboxConfig.md)` | ❌       | The request body. |

**Return Type**

`InboxConfig`

**Example Usage Code Snippet**

```typescript
import { Client, InboxConfig } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const images: Images = {
    emptyInboxUrl: 'emptyInboxUrl',
  };

  const banner: Banner = {
    backgroundColor: 'backgroundColor',
    backgroundOpacity: 6.65,
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

  const inboxConfig: InboxConfig = {
    images: images,
    locale: 'non',
    theme: theme,
  };

  const { data } = await client.integrations.saveInboxIntegration(input);

  console.log(data);
})();
```

## deleteInboxIntegration

- HTTP Method: `DELETE`
- Endpoint: `/integrations/inbox`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteInboxIntegration();

  console.log(data);
})();
```

## deleteInboxIntegrationById

- HTTP Method: `DELETE`
- Endpoint: `/integrations/inbox/{id}`

**Parameters**

| Name | Type     | Required | Description |
| :--- | :------- | :------- | :---------- |
| id   | `string` | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteInboxIntegrationById('id');

  console.log(data);
})();
```

## getMailgunIntegration

- HTTP Method: `GET`
- Endpoint: `/integrations/mailgun`

**Return Type**

`ListIntegrationsResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.getMailgunIntegration();

  console.log(data);
})();
```

## saveMailgunIntegration

- HTTP Method: `PUT`
- Endpoint: `/integrations/mailgun`

**Parameters**

| Name | Type                                          | Required | Description       |
| :--- | :-------------------------------------------- | :------- | :---------------- |
| body | `[MailgunConfig](../models/MailgunConfig.md)` | ❌       | The request body. |

**Return Type**

`MailgunConfig`

**Example Usage Code Snippet**

```typescript
import { Client, MailgunConfig } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const mailgunConfigRegion = MailgunConfigRegion.US;

  const mailgunConfig: MailgunConfig = {
    apiKey: 'volupt',
    domain: 'aliquip',
    region: mailgunConfigRegion,
  };

  const { data } = await client.integrations.saveMailgunIntegration(input);

  console.log(data);
})();
```

## deleteMailgunIntegration

- HTTP Method: `DELETE`
- Endpoint: `/integrations/mailgun`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteMailgunIntegration();

  console.log(data);
})();
```

## deleteMailgunIntegrationById

- HTTP Method: `DELETE`
- Endpoint: `/integrations/mailgun/{id}`

**Parameters**

| Name | Type     | Required | Description |
| :--- | :------- | :------- | :---------- |
| id   | `string` | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteMailgunIntegrationById('id');

  console.log(data);
})();
```

## getPingEmailIntegration

- HTTP Method: `GET`
- Endpoint: `/integrations/ping_email`

**Return Type**

`ListIntegrationsResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.getPingEmailIntegration();

  console.log(data);
})();
```

## savePingEmailIntegration

- HTTP Method: `PUT`
- Endpoint: `/integrations/ping_email`

**Parameters**

| Name | Type                                    | Required | Description       |
| :--- | :-------------------------------------- | :------- | :---------------- |
| body | `[PingConfig](../models/PingConfig.md)` | ❌       | The request body. |

**Return Type**

`PingConfig`

**Example Usage Code Snippet**

```typescript
import { Client, PingConfig } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const pingConfig: PingConfig = {
    url: 'minim',
  };

  const { data } = await client.integrations.savePingEmailIntegration(input);

  console.log(data);
})();
```

## deletePingEmailIntegration

- HTTP Method: `DELETE`
- Endpoint: `/integrations/ping_email`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deletePingEmailIntegration();

  console.log(data);
})();
```

## deletePingEmailIntegrationById

- HTTP Method: `DELETE`
- Endpoint: `/integrations/ping_email/{id}`

**Parameters**

| Name | Type     | Required | Description |
| :--- | :------- | :------- | :---------- |
| id   | `string` | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deletePingEmailIntegrationById('id');

  console.log(data);
})();
```

## getSendgridIntegration

- HTTP Method: `GET`
- Endpoint: `/integrations/sendgrid`

**Return Type**

`ListIntegrationsResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.getSendgridIntegration();

  console.log(data);
})();
```

## saveSendgridIntegration

- HTTP Method: `PUT`
- Endpoint: `/integrations/sendgrid`

**Parameters**

| Name | Type                                            | Required | Description       |
| :--- | :---------------------------------------------- | :------- | :---------------- |
| body | `[SendgridConfig](../models/SendgridConfig.md)` | ❌       | The request body. |

**Return Type**

`SendgridConfig`

**Example Usage Code Snippet**

```typescript
import { Client, SendgridConfig } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const sendgridConfigFrom: SendgridConfigFrom = {
    email: 'email',
    name: 'name',
  };

  const replyTo: ReplyTo = {
    email: 'email',
    name: 'name',
  };

  const sendgridConfig: SendgridConfig = {
    apiKey: 'api_key',
    from: sendgridConfigFrom,
    replyTo: replyTo,
  };

  const { data } = await client.integrations.saveSendgridIntegration(input);

  console.log(data);
})();
```

## deleteSendgridIntegration

- HTTP Method: `DELETE`
- Endpoint: `/integrations/sendgrid`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteSendgridIntegration();

  console.log(data);
})();
```

## deleteSendgridIntegrationById

- HTTP Method: `DELETE`
- Endpoint: `/integrations/sendgrid/{id}`

**Parameters**

| Name | Type     | Required | Description |
| :--- | :------- | :------- | :---------- |
| id   | `string` | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteSendgridIntegrationById('id');

  console.log(data);
})();
```

## getSesIntegration

- HTTP Method: `GET`
- Endpoint: `/integrations/ses`

**Return Type**

`ListIntegrationsResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.getSesIntegration();

  console.log(data);
})();
```

## saveSesIntegration

- HTTP Method: `PUT`
- Endpoint: `/integrations/ses`

**Parameters**

| Name | Type                                  | Required | Description       |
| :--- | :------------------------------------ | :------- | :---------------- |
| body | `[SesConfig](../models/SesConfig.md)` | ❌       | The request body. |

**Return Type**

`SesConfig`

**Example Usage Code Snippet**

```typescript
import { Client, SesConfig } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const sesConfigFrom: SesConfigFrom = {
    email: 'email',
    name: 'name',
  };

  const sesConfig: SesConfig = {
    endpoint: 'elit su',
    from: sesConfigFrom,
    keyId: 'sit in occa',
    region: 'cillum ',
    secretKey: 'aute Ut cu',
  };

  const { data } = await client.integrations.saveSesIntegration(input);

  console.log(data);
})();
```

## deleteSesIntegration

- HTTP Method: `DELETE`
- Endpoint: `/integrations/ses`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteSesIntegration();

  console.log(data);
})();
```

## deleteSesIntegrationById

- HTTP Method: `DELETE`
- Endpoint: `/integrations/ses/{id}`

**Parameters**

| Name | Type     | Required | Description |
| :--- | :------- | :------- | :---------- |
| id   | `string` | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteSesIntegrationById('id');

  console.log(data);
})();
```

## getSlackIntegration

- HTTP Method: `GET`
- Endpoint: `/integrations/slack`

**Return Type**

`ListIntegrationsResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.getSlackIntegration();

  console.log(data);
})();
```

## saveSlackIntegration

- HTTP Method: `PUT`
- Endpoint: `/integrations/slack`

**Parameters**

| Name | Type                                      | Required | Description       |
| :--- | :---------------------------------------- | :------- | :---------------- |
| body | `[SlackConfig](../models/SlackConfig.md)` | ❌       | The request body. |

**Return Type**

`SlackConfig`

**Example Usage Code Snippet**

```typescript
import { Client, SlackConfig } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const slackConfig: SlackConfig = {
    appId: 'DQ01',
    clientId: '1361923.1921861',
    clientSecret: 'cupidatat non suntdolore Excepte',
    signingSecret: 'aliquip Excepteur laboris pariat',
  };

  const { data } = await client.integrations.saveSlackIntegration(input);

  console.log(data);
})();
```

## deleteSlackIntegration

- HTTP Method: `DELETE`
- Endpoint: `/integrations/slack`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteSlackIntegration();

  console.log(data);
})();
```

## deleteSlackIntegrationById

- HTTP Method: `DELETE`
- Endpoint: `/integrations/slack/{id}`

**Parameters**

| Name | Type     | Required | Description |
| :--- | :------- | :------- | :---------- |
| id   | `string` | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteSlackIntegrationById('id');

  console.log(data);
})();
```

## getStripeIntegration

- HTTP Method: `GET`
- Endpoint: `/integrations/stripe`

**Return Type**

`ListIntegrationsResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.getStripeIntegration();

  console.log(data);
})();
```

## saveStripeIntegration

- HTTP Method: `PUT`
- Endpoint: `/integrations/stripe`

**Parameters**

| Name | Type                                        | Required | Description       |
| :--- | :------------------------------------------ | :------- | :---------------- |
| body | `[StripeConfig](../models/StripeConfig.md)` | ❌       | The request body. |

**Return Type**

`StripeConfig`

**Example Usage Code Snippet**

```typescript
import { Client, StripeConfig } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const stripeConfig: StripeConfig = {
    webhookSigningSecret: 'Excepteur Ut cupidatat co',
  };

  const { data } = await client.integrations.saveStripeIntegration(input);

  console.log(data);
})();
```

## deleteStripeIntegration

- HTTP Method: `DELETE`
- Endpoint: `/integrations/stripe`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteStripeIntegration();

  console.log(data);
})();
```

## deleteStripeIntegrationById

- HTTP Method: `DELETE`
- Endpoint: `/integrations/stripe/{id}`

**Parameters**

| Name | Type     | Required | Description |
| :--- | :------- | :------- | :---------- |
| id   | `string` | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteStripeIntegrationById('id');

  console.log(data);
})();
```

## getTemplatesIntegration

- HTTP Method: `GET`
- Endpoint: `/integrations/templates`

**Return Type**

`ListIntegrationsResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.getTemplatesIntegration();

  console.log(data);
})();
```

## saveTemplatesIntegration

- HTTP Method: `PUT`
- Endpoint: `/integrations/templates`

**Parameters**

| Name | Type  | Required | Description       |
| :--- | :---- | :------- | :---------------- |
| body | `any` | ❌       | The request body. |

**Return Type**

`any`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const input = {};

  const { data } = await client.integrations.saveTemplatesIntegration(input);

  console.log(data);
})();
```

## deleteTemplatesIntegration

- HTTP Method: `DELETE`
- Endpoint: `/integrations/templates`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteTemplatesIntegration();

  console.log(data);
})();
```

## deleteTemplatesIntegrationById

- HTTP Method: `DELETE`
- Endpoint: `/integrations/templates/{id}`

**Parameters**

| Name | Type     | Required | Description |
| :--- | :------- | :------- | :---------- |
| id   | `string` | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteTemplatesIntegrationById('id');

  console.log(data);
})();
```

## getTwilioIntegration

- HTTP Method: `GET`
- Endpoint: `/integrations/twilio`

**Return Type**

`ListIntegrationsResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.getTwilioIntegration();

  console.log(data);
})();
```

## saveTwilioIntegration

- HTTP Method: `PUT`
- Endpoint: `/integrations/twilio`

**Parameters**

| Name | Type                                        | Required | Description       |
| :--- | :------------------------------------------ | :------- | :---------------- |
| body | `[TwilioConfig](../models/TwilioConfig.md)` | ❌       | The request body. |

**Return Type**

`TwilioConfig`

**Example Usage Code Snippet**

```typescript
import { Client, TwilioConfig } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const twilioConfigRegion = TwilioConfigRegion.US1;

  const twilioConfig: TwilioConfig = {
    accountSid: 'in id occaecat',
    apiKey: 'ut est enim dolor es',
    apiSecret: 'ad',
    from: '+7881753143',
    region: twilioConfigRegion,
  };

  const { data } = await client.integrations.saveTwilioIntegration(input);

  console.log(data);
})();
```

## deleteTwilioIntegration

- HTTP Method: `DELETE`
- Endpoint: `/integrations/twilio`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteTwilioIntegration();

  console.log(data);
})();
```

## deleteTwilioIntegrationById

- HTTP Method: `DELETE`
- Endpoint: `/integrations/twilio/{id}`

**Parameters**

| Name | Type     | Required | Description |
| :--- | :------- | :------- | :---------- |
| id   | `string` | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteTwilioIntegrationById('id');

  console.log(data);
})();
```

## getWebPushIntegration

- HTTP Method: `GET`
- Endpoint: `/integrations/web_push`

**Return Type**

`ListIntegrationsResponse`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.getWebPushIntegration();

  console.log(data);
})();
```

## saveWebPushIntegration

- HTTP Method: `PUT`
- Endpoint: `/integrations/web_push`

**Parameters**

| Name | Type                                          | Required | Description       |
| :--- | :-------------------------------------------- | :------- | :---------------- |
| body | `[WebpushConfig](../models/WebpushConfig.md)` | ❌       | The request body. |

**Return Type**

`WebpushConfig`

**Example Usage Code Snippet**

```typescript
import { Client, WebpushConfig } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const webpushConfig: WebpushConfig = {
    privateKey: 'adipisicing consequat consectetur',
    publicKey: 'magna esse',
  };

  const { data } = await client.integrations.saveWebPushIntegration(input);

  console.log(data);
})();
```

## deleteWebPushIntegration

- HTTP Method: `DELETE`
- Endpoint: `/integrations/web_push`

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteWebPushIntegration();

  console.log(data);
})();
```

## deleteWebPushIntegrationById

- HTTP Method: `DELETE`
- Endpoint: `/integrations/web_push/{id}`

**Parameters**

| Name | Type     | Required | Description |
| :--- | :------- | :------- | :---------- |
| id   | `string` | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { Client } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const { data } = await client.integrations.deleteWebPushIntegrationById('id');

  console.log(data);
})();
```
