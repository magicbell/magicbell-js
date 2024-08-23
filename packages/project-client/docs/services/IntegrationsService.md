# IntegrationsService

A list of all methods in the `IntegrationsService` service. Click on the method name to view detailed information about that method.

| Methods                                                                     | Description |
| :-------------------------------------------------------------------------- | :---------- |
| [list_integrations](#list_integrations)                                     |             |
| [get_apns_integration](#get_apns_integration)                               |             |
| [save_apns_integration](#save_apns_integration)                             |             |
| [delete_apns_integration](#delete_apns_integration)                         |             |
| [delete_apns_integration_by_id](#delete_apns_integration_by_id)             |             |
| [get_fcm_integration](#get_fcm_integration)                                 |             |
| [save_fcm_integration](#save_fcm_integration)                               |             |
| [delete_fcm_integration](#delete_fcm_integration)                           |             |
| [delete_fcm_integration_by_id](#delete_fcm_integration_by_id)               |             |
| [get_github_integration](#get_github_integration)                           |             |
| [save_github_integration](#save_github_integration)                         |             |
| [delete_github_integration](#delete_github_integration)                     |             |
| [delete_github_integration_by_id](#delete_github_integration_by_id)         |             |
| [get_inbox_integration](#get_inbox_integration)                             |             |
| [save_inbox_integration](#save_inbox_integration)                           |             |
| [delete_inbox_integration](#delete_inbox_integration)                       |             |
| [delete_inbox_integration_by_id](#delete_inbox_integration_by_id)           |             |
| [get_mailgun_integration](#get_mailgun_integration)                         |             |
| [save_mailgun_integration](#save_mailgun_integration)                       |             |
| [delete_mailgun_integration](#delete_mailgun_integration)                   |             |
| [delete_mailgun_integration_by_id](#delete_mailgun_integration_by_id)       |             |
| [get_ping_email_integration](#get_ping_email_integration)                   |             |
| [save_ping_email_integration](#save_ping_email_integration)                 |             |
| [delete_ping_email_integration](#delete_ping_email_integration)             |             |
| [delete_ping_email_integration_by_id](#delete_ping_email_integration_by_id) |             |
| [get_sendgrid_integration](#get_sendgrid_integration)                       |             |
| [save_sendgrid_integration](#save_sendgrid_integration)                     |             |
| [delete_sendgrid_integration](#delete_sendgrid_integration)                 |             |
| [delete_sendgrid_integration_by_id](#delete_sendgrid_integration_by_id)     |             |
| [get_ses_integration](#get_ses_integration)                                 |             |
| [save_ses_integration](#save_ses_integration)                               |             |
| [delete_ses_integration](#delete_ses_integration)                           |             |
| [delete_ses_integration_by_id](#delete_ses_integration_by_id)               |             |
| [get_slack_integration](#get_slack_integration)                             |             |
| [save_slack_integration](#save_slack_integration)                           |             |
| [delete_slack_integration](#delete_slack_integration)                       |             |
| [delete_slack_integration_by_id](#delete_slack_integration_by_id)           |             |
| [get_stripe_integration](#get_stripe_integration)                           |             |
| [save_stripe_integration](#save_stripe_integration)                         |             |
| [delete_stripe_integration](#delete_stripe_integration)                     |             |
| [delete_stripe_integration_by_id](#delete_stripe_integration_by_id)         |             |
| [get_templates_integration](#get_templates_integration)                     |             |
| [save_templates_integration](#save_templates_integration)                   |             |
| [delete_templates_integration](#delete_templates_integration)               |             |
| [delete_templates_integration_by_id](#delete_templates_integration_by_id)   |             |
| [get_twilio_integration](#get_twilio_integration)                           |             |
| [save_twilio_integration](#save_twilio_integration)                         |             |
| [delete_twilio_integration](#delete_twilio_integration)                     |             |
| [delete_twilio_integration_by_id](#delete_twilio_integration_by_id)         |             |
| [get_web_push_integration](#get_web_push_integration)                       |             |
| [save_web_push_integration](#save_web_push_integration)                     |             |
| [delete_web_push_integration](#delete_web_push_integration)                 |             |
| [delete_web_push_integration_by_id](#delete_web_push_integration_by_id)     |             |

## list_integrations

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

## get_apns_integration

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

## save_apns_integration

- HTTP Method: `PUT`
- Endpoint: `/integrations/apns`

**Parameters**

| Name | Type                                  | Required | Description       |
| :--- | :------------------------------------ | :------- | :---------------- |
| body | [ApnsConfig](../models/ApnsConfig.md) | ❌       | The request body. |

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
    appId: 'iAYqMy12w9iGu7ff1EsX`Yd7Od!5pFmfIMNCPzvFgZiCEg+ihR0u2bAgXQlSqFd8hh',
    badge: badge,
    certificate: 'certificate',
    keyId: 'nostrud ul',
    teamId: 'ut reprehe',
  };

  const { data } = await client.integrations.saveApnsIntegration(input);

  console.log(data);
})();
```

## delete_apns_integration

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

## delete_apns_integration_by_id

- HTTP Method: `DELETE`
- Endpoint: `/integrations/apns/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

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

## get_fcm_integration

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

## save_fcm_integration

- HTTP Method: `PUT`
- Endpoint: `/integrations/fcm`

**Parameters**

| Name | Type                                | Required | Description       |
| :--- | :---------------------------------- | :------- | :---------------- |
| body | [FcmConfig](../models/FcmConfig.md) | ❌       | The request body. |

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

## delete_fcm_integration

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

## delete_fcm_integration_by_id

- HTTP Method: `DELETE`
- Endpoint: `/integrations/fcm/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

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

## get_github_integration

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

## save_github_integration

- HTTP Method: `PUT`
- Endpoint: `/integrations/github`

**Parameters**

| Name | Type                                      | Required | Description       |
| :--- | :---------------------------------------- | :------- | :---------------- |
| body | [GithubConfig](../models/GithubConfig.md) | ❌       | The request body. |

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
    webhookSigningSecret: 'adipisicing',
  };

  const { data } = await client.integrations.saveGithubIntegration(input);

  console.log(data);
})();
```

## delete_github_integration

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

## delete_github_integration_by_id

- HTTP Method: `DELETE`
- Endpoint: `/integrations/github/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

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

## get_inbox_integration

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

## save_inbox_integration

- HTTP Method: `PUT`
- Endpoint: `/integrations/inbox`

**Parameters**

| Name | Type                                    | Required | Description       |
| :--- | :-------------------------------------- | :------- | :---------------- |
| body | [InboxConfig](../models/InboxConfig.md) | ❌       | The request body. |

**Return Type**

`InboxConfig`

**Example Usage Code Snippet**

```typescript
import { Client, InboxConfig } from '@magicbell/project-client';

(async () => {
  const client = new Client({
    token: 'YOUR_TOKEN',
  });

  const inboxConfig: InboxConfig = {
    images: {},
    locale: 'dolore moll',
    theme: {},
  };

  const { data } = await client.integrations.saveInboxIntegration(input);

  console.log(data);
})();
```

## delete_inbox_integration

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

## delete_inbox_integration_by_id

- HTTP Method: `DELETE`
- Endpoint: `/integrations/inbox/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

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

## get_mailgun_integration

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

## save_mailgun_integration

- HTTP Method: `PUT`
- Endpoint: `/integrations/mailgun`

**Parameters**

| Name | Type                                        | Required | Description       |
| :--- | :------------------------------------------ | :------- | :---------------- |
| body | [MailgunConfig](../models/MailgunConfig.md) | ❌       | The request body. |

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
    apiKey: 'molli',
    domain: 'do ',
    region: mailgunConfigRegion,
  };

  const { data } = await client.integrations.saveMailgunIntegration(input);

  console.log(data);
})();
```

## delete_mailgun_integration

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

## delete_mailgun_integration_by_id

- HTTP Method: `DELETE`
- Endpoint: `/integrations/mailgun/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

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

## get_ping_email_integration

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

## save_ping_email_integration

- HTTP Method: `PUT`
- Endpoint: `/integrations/ping_email`

**Parameters**

| Name | Type                                  | Required | Description       |
| :--- | :------------------------------------ | :------- | :---------------- |
| body | [PingConfig](../models/PingConfig.md) | ❌       | The request body. |

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
    url: 'laboris Duis',
  };

  const { data } = await client.integrations.savePingEmailIntegration(input);

  console.log(data);
})();
```

## delete_ping_email_integration

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

## delete_ping_email_integration_by_id

- HTTP Method: `DELETE`
- Endpoint: `/integrations/ping_email/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

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

## get_sendgrid_integration

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

## save_sendgrid_integration

- HTTP Method: `PUT`
- Endpoint: `/integrations/sendgrid`

**Parameters**

| Name | Type                                          | Required | Description       |
| :--- | :-------------------------------------------- | :------- | :---------------- |
| body | [SendgridConfig](../models/SendgridConfig.md) | ❌       | The request body. |

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

## delete_sendgrid_integration

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

## delete_sendgrid_integration_by_id

- HTTP Method: `DELETE`
- Endpoint: `/integrations/sendgrid/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

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

## get_ses_integration

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

## save_ses_integration

- HTTP Method: `PUT`
- Endpoint: `/integrations/ses`

**Parameters**

| Name | Type                                | Required | Description       |
| :--- | :---------------------------------- | :------- | :---------------- |
| body | [SesConfig](../models/SesConfig.md) | ❌       | The request body. |

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
    endpoint: 'dolor e',
    from: sesConfigFrom,
    keyId: 'cillum no',
    region: 'dolor culpa co',
    secretKey: 'pa',
  };

  const { data } = await client.integrations.saveSesIntegration(input);

  console.log(data);
})();
```

## delete_ses_integration

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

## delete_ses_integration_by_id

- HTTP Method: `DELETE`
- Endpoint: `/integrations/ses/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

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

## get_slack_integration

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

## save_slack_integration

- HTTP Method: `PUT`
- Endpoint: `/integrations/slack`

**Parameters**

| Name | Type                                    | Required | Description       |
| :--- | :-------------------------------------- | :------- | :---------------- |
| body | [SlackConfig](../models/SlackConfig.md) | ❌       | The request body. |

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
    appId: '6SX2ZNPXG8L',
    clientId: '430411624.02717865207',
    clientSecret: 'labore in ea fugiat magnainsed v',
    id: 'CM0mBN',
    signingSecret: 'exercitation Excepteur et euanim',
  };

  const { data } = await client.integrations.saveSlackIntegration(input);

  console.log(data);
})();
```

## delete_slack_integration

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

## delete_slack_integration_by_id

- HTTP Method: `DELETE`
- Endpoint: `/integrations/slack/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

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

## get_stripe_integration

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

## save_stripe_integration

- HTTP Method: `PUT`
- Endpoint: `/integrations/stripe`

**Parameters**

| Name | Type                                      | Required | Description       |
| :--- | :---------------------------------------- | :------- | :---------------- |
| body | [StripeConfig](../models/StripeConfig.md) | ❌       | The request body. |

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
    webhookSigningSecret: 'et nisi',
  };

  const { data } = await client.integrations.saveStripeIntegration(input);

  console.log(data);
})();
```

## delete_stripe_integration

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

## delete_stripe_integration_by_id

- HTTP Method: `DELETE`
- Endpoint: `/integrations/stripe/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

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

## get_templates_integration

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

## save_templates_integration

- HTTP Method: `PUT`
- Endpoint: `/integrations/templates`

**Parameters**

| Name | Type | Required | Description       |
| :--- | :--- | :------- | :---------------- |
| body | any  | ❌       | The request body. |

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

## delete_templates_integration

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

## delete_templates_integration_by_id

- HTTP Method: `DELETE`
- Endpoint: `/integrations/templates/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

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

## get_twilio_integration

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

## save_twilio_integration

- HTTP Method: `PUT`
- Endpoint: `/integrations/twilio`

**Parameters**

| Name | Type                                      | Required | Description       |
| :--- | :---------------------------------------- | :------- | :---------------- |
| body | [TwilioConfig](../models/TwilioConfig.md) | ❌       | The request body. |

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
    accountSid: 'sunt',
    apiKey: 'laboris non sunt fugiat',
    apiSecret: 'aliqua sit laboris labore',
    from: '+959',
    region: twilioConfigRegion,
  };

  const { data } = await client.integrations.saveTwilioIntegration(input);

  console.log(data);
})();
```

## delete_twilio_integration

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

## delete_twilio_integration_by_id

- HTTP Method: `DELETE`
- Endpoint: `/integrations/twilio/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

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

## get_web_push_integration

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

## save_web_push_integration

- HTTP Method: `PUT`
- Endpoint: `/integrations/web_push`

**Parameters**

| Name | Type                                        | Required | Description       |
| :--- | :------------------------------------------ | :------- | :---------------- |
| body | [WebpushConfig](../models/WebpushConfig.md) | ❌       | The request body. |

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
    privateKey: 'pariatur occaecat magna',
    publicKey: 'exercitati',
  };

  const { data } = await client.integrations.saveWebPushIntegration(input);

  console.log(data);
})();
```

## delete_web_push_integration

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

## delete_web_push_integration_by_id

- HTTP Method: `DELETE`
- Endpoint: `/integrations/web_push/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

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
