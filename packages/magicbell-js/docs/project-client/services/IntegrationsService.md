# IntegrationsService

A list of all methods in the `IntegrationsService` service. Click on the method name to view detailed information about that method.

| Methods                                                               | Description                                                                                                                                                             |
| :-------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [listIntegrations](#listintegrations)                                 | Lists all available and configured integrations for the project. Returns a summary of each integration including its type, status, and basic configuration information. |
| [getApnsIntegration](#getapnsintegration)                             | Retrieves the current apns integration configurations for a specific integration type in the project. Returns configuration details and status information.             |
| [saveApnsIntegration](#saveapnsintegration)                           | Creates or updates a apns integration for the project. Only administrators can configure integrations.                                                                  |
| [deleteApnsIntegration](#deleteapnsintegration)                       | Removes a apns integration configuration from the project. This will disable the integration's functionality within the project.                                        |
| [deleteApnsIntegrationById](#deleteapnsintegrationbyid)               | Removes a specific apns integration instance by ID from the project.                                                                                                    |
| [getAwssnsIntegration](#getawssnsintegration)                         | Retrieves the current awssns integration configurations for a specific integration type in the project. Returns configuration details and status information.           |
| [saveAwssnsIntegration](#saveawssnsintegration)                       | Creates or updates a awssns integration for the project. Only administrators can configure integrations.                                                                |
| [deleteAwssnsIntegration](#deleteawssnsintegration)                   | Removes a awssns integration configuration from the project. This will disable the integration's functionality within the project.                                      |
| [deleteAwssnsIntegrationById](#deleteawssnsintegrationbyid)           | Removes a specific awssns integration instance by ID from the project.                                                                                                  |
| [getEventsourceIntegration](#geteventsourceintegration)               | Retrieves the current eventsource integration configurations for a specific integration type in the project. Returns configuration details and status information.      |
| [saveEventsourceIntegration](#saveeventsourceintegration)             | Creates or updates a eventsource integration for the project. Only administrators can configure integrations.                                                           |
| [deleteEventsourceIntegration](#deleteeventsourceintegration)         | Removes a eventsource integration configuration from the project. This will disable the integration's functionality within the project.                                 |
| [deleteEventsourceIntegrationById](#deleteeventsourceintegrationbyid) | Removes a specific eventsource integration instance by ID from the project.                                                                                             |
| [getExpoIntegration](#getexpointegration)                             | Retrieves the current expo integration configurations for a specific integration type in the project. Returns configuration details and status information.             |
| [saveExpoIntegration](#saveexpointegration)                           | Creates or updates a expo integration for the project. Only administrators can configure integrations.                                                                  |
| [deleteExpoIntegration](#deleteexpointegration)                       | Removes a expo integration configuration from the project. This will disable the integration's functionality within the project.                                        |
| [deleteExpoIntegrationById](#deleteexpointegrationbyid)               | Removes a specific expo integration instance by ID from the project.                                                                                                    |
| [getFcmIntegration](#getfcmintegration)                               | Retrieves the current fcm integration configurations for a specific integration type in the project. Returns configuration details and status information.              |
| [saveFcmIntegration](#savefcmintegration)                             | Creates or updates a fcm integration for the project. Only administrators can configure integrations.                                                                   |
| [deleteFcmIntegration](#deletefcmintegration)                         | Removes a fcm integration configuration from the project. This will disable the integration's functionality within the project.                                         |
| [deleteFcmIntegrationById](#deletefcmintegrationbyid)                 | Removes a specific fcm integration instance by ID from the project.                                                                                                     |
| [getGithubIntegration](#getgithubintegration)                         | Retrieves the current github integration configurations for a specific integration type in the project. Returns configuration details and status information.           |
| [saveGithubIntegration](#savegithubintegration)                       | Creates or updates a github integration for the project. Only administrators can configure integrations.                                                                |
| [deleteGithubIntegration](#deletegithubintegration)                   | Removes a github integration configuration from the project. This will disable the integration's functionality within the project.                                      |
| [deleteGithubIntegrationById](#deletegithubintegrationbyid)           | Removes a specific github integration instance by ID from the project.                                                                                                  |
| [getInboxIntegration](#getinboxintegration)                           | Retrieves the current inbox integration configurations for a specific integration type in the project. Returns configuration details and status information.            |
| [saveInboxIntegration](#saveinboxintegration)                         | Creates or updates a inbox integration for the project. Only administrators can configure integrations.                                                                 |
| [deleteInboxIntegration](#deleteinboxintegration)                     | Removes a inbox integration configuration from the project. This will disable the integration's functionality within the project.                                       |
| [deleteInboxIntegrationById](#deleteinboxintegrationbyid)             | Removes a specific inbox integration instance by ID from the project.                                                                                                   |
| [getMailgunIntegration](#getmailgunintegration)                       | Retrieves the current mailgun integration configurations for a specific integration type in the project. Returns configuration details and status information.          |
| [saveMailgunIntegration](#savemailgunintegration)                     | Creates or updates a mailgun integration for the project. Only administrators can configure integrations.                                                               |
| [deleteMailgunIntegration](#deletemailgunintegration)                 | Removes a mailgun integration configuration from the project. This will disable the integration's functionality within the project.                                     |
| [deleteMailgunIntegrationById](#deletemailgunintegrationbyid)         | Removes a specific mailgun integration instance by ID from the project.                                                                                                 |
| [getPingEmailIntegration](#getpingemailintegration)                   | Retrieves the current ping_email integration configurations for a specific integration type in the project. Returns configuration details and status information.       |
| [savePingEmailIntegration](#savepingemailintegration)                 | Creates or updates a ping_email integration for the project. Only administrators can configure integrations.                                                            |
| [deletePingEmailIntegration](#deletepingemailintegration)             | Removes a ping_email integration configuration from the project. This will disable the integration's functionality within the project.                                  |
| [deletePingEmailIntegrationById](#deletepingemailintegrationbyid)     | Removes a specific ping_email integration instance by ID from the project.                                                                                              |
| [getSendgridIntegration](#getsendgridintegration)                     | Retrieves the current sendgrid integration configurations for a specific integration type in the project. Returns configuration details and status information.         |
| [saveSendgridIntegration](#savesendgridintegration)                   | Creates or updates a sendgrid integration for the project. Only administrators can configure integrations.                                                              |
| [deleteSendgridIntegration](#deletesendgridintegration)               | Removes a sendgrid integration configuration from the project. This will disable the integration's functionality within the project.                                    |
| [deleteSendgridIntegrationById](#deletesendgridintegrationbyid)       | Removes a specific sendgrid integration instance by ID from the project.                                                                                                |
| [getSesIntegration](#getsesintegration)                               | Retrieves the current ses integration configurations for a specific integration type in the project. Returns configuration details and status information.              |
| [saveSesIntegration](#savesesintegration)                             | Creates or updates a ses integration for the project. Only administrators can configure integrations.                                                                   |
| [deleteSesIntegration](#deletesesintegration)                         | Removes a ses integration configuration from the project. This will disable the integration's functionality within the project.                                         |
| [deleteSesIntegrationById](#deletesesintegrationbyid)                 | Removes a specific ses integration instance by ID from the project.                                                                                                     |
| [getSlackIntegration](#getslackintegration)                           | Retrieves the current slack integration configurations for a specific integration type in the project. Returns configuration details and status information.            |
| [saveSlackIntegration](#saveslackintegration)                         | Creates or updates a slack integration for the project. Only administrators can configure integrations.                                                                 |
| [deleteSlackIntegration](#deleteslackintegration)                     | Removes a slack integration configuration from the project. This will disable the integration's functionality within the project.                                       |
| [deleteSlackIntegrationById](#deleteslackintegrationbyid)             | Removes a specific slack integration instance by ID from the project.                                                                                                   |
| [getStripeIntegration](#getstripeintegration)                         | Retrieves the current stripe integration configurations for a specific integration type in the project. Returns configuration details and status information.           |
| [saveStripeIntegration](#savestripeintegration)                       | Creates or updates a stripe integration for the project. Only administrators can configure integrations.                                                                |
| [deleteStripeIntegration](#deletestripeintegration)                   | Removes a stripe integration configuration from the project. This will disable the integration's functionality within the project.                                      |
| [deleteStripeIntegrationById](#deletestripeintegrationbyid)           | Removes a specific stripe integration instance by ID from the project.                                                                                                  |
| [getTemplatesIntegration](#gettemplatesintegration)                   | Retrieves the current templates integration configurations for a specific integration type in the project. Returns configuration details and status information.        |
| [saveTemplatesIntegration](#savetemplatesintegration)                 | Creates or updates a templates integration for the project. Only administrators can configure integrations.                                                             |
| [deleteTemplatesIntegration](#deletetemplatesintegration)             | Removes a templates integration configuration from the project. This will disable the integration's functionality within the project.                                   |
| [deleteTemplatesIntegrationById](#deletetemplatesintegrationbyid)     | Removes a specific templates integration instance by ID from the project.                                                                                               |
| [getTwilioIntegration](#gettwiliointegration)                         | Retrieves the current twilio integration configurations for a specific integration type in the project. Returns configuration details and status information.           |
| [saveTwilioIntegration](#savetwiliointegration)                       | Creates or updates a twilio integration for the project. Only administrators can configure integrations.                                                                |
| [deleteTwilioIntegration](#deletetwiliointegration)                   | Removes a twilio integration configuration from the project. This will disable the integration's functionality within the project.                                      |
| [deleteTwilioIntegrationById](#deletetwiliointegrationbyid)           | Removes a specific twilio integration instance by ID from the project.                                                                                                  |
| [getWebPushIntegration](#getwebpushintegration)                       | Retrieves the current web_push integration configurations for a specific integration type in the project. Returns configuration details and status information.         |
| [saveWebPushIntegration](#savewebpushintegration)                     | Creates or updates a web_push integration for the project. Only administrators can configure integrations.                                                              |
| [deleteWebPushIntegration](#deletewebpushintegration)                 | Removes a web_push integration configuration from the project. This will disable the integration's functionality within the project.                                    |
| [deleteWebPushIntegrationById](#deletewebpushintegrationbyid)         | Removes a specific web_push integration instance by ID from the project.                                                                                                |

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.listIntegrations({
    limit: 8,
    startingAfter: 'starting_after',
    endingBefore: 'ending_before',
  });

  console.log(data);
})();
```

## getApnsIntegration

Retrieves the current apns integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/apns`

**Return Type**

`ApnsConfigCollection`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.getApnsIntegration();

  console.log(data);
})();
```

## saveApnsIntegration

Creates or updates a apns integration for the project. Only administrators can configure integrations.

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
import { ApnsConfigPayload, ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
	token: 'YOUR_TOKEN'});

  const badge = Badge.UNREAD;

const payloadVersion = PayloadVersion._1;

const apnsConfigPayload: ApnsConfigPayload = {
  appId: "app_id",
  badge: badge,
  certificate: "- BEGIN PRIVATE KEY-----------
+KMovN
---------END PRIVATE KEYYYYYYY---------",
  keyId: "voluptaten",
  payloadVersion: payloadVersion,
  teamId: "dolorfugia"
};

  const { data } = await projectClient.integrations.saveApnsIntegration(
  apnsConfigPayload
);

  console.log(data);
})();
```

## deleteApnsIntegration

Removes a apns integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/apns`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteApnsIntegration();

  console.log(data);
})();
```

## deleteApnsIntegrationById

Removes a specific apns integration instance by ID from the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/apns/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteApnsIntegrationById('id');

  console.log(data);
})();
```

## getAwssnsIntegration

Retrieves the current awssns integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/awssns`

**Return Type**

`AwssnsConfigCollection`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.getAwssnsIntegration();

  console.log(data);
})();
```

## saveAwssnsIntegration

Creates or updates a awssns integration for the project. Only administrators can configure integrations.

- HTTP Method: `PUT`
- Endpoint: `/integrations/awssns`

**Parameters**

| Name | Type                                                    | Required | Description       |
| :--- | :------------------------------------------------------ | :------- | :---------------- |
| body | [AwssnsConfigPayload](../models/AwssnsConfigPayload.md) | ❌       | The request body. |

**Return Type**

`AwssnsConfigPayload`

**Example Usage Code Snippet**

```typescript
import { AwssnsConfigPayload, ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const awssnsConfigPayload: AwssnsConfigPayload = {
    webhookSigningSecret: 'webhook_signing_secret',
  };

  const { data } = await projectClient.integrations.saveAwssnsIntegration(awssnsConfigPayload);

  console.log(data);
})();
```

## deleteAwssnsIntegration

Removes a awssns integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/awssns`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteAwssnsIntegration();

  console.log(data);
})();
```

## deleteAwssnsIntegrationById

Removes a specific awssns integration instance by ID from the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/awssns/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteAwssnsIntegrationById('id');

  console.log(data);
})();
```

## getEventsourceIntegration

Retrieves the current eventsource integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/eventsource`

**Return Type**

`EventSourceConfigCollection`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.getEventsourceIntegration();

  console.log(data);
})();
```

## saveEventsourceIntegration

Creates or updates a eventsource integration for the project. Only administrators can configure integrations.

- HTTP Method: `PUT`
- Endpoint: `/integrations/eventsource`

**Parameters**

| Name | Type                                                              | Required | Description       |
| :--- | :---------------------------------------------------------------- | :------- | :---------------- |
| body | [EventSourceConfigPayload](../models/EventSourceConfigPayload.md) | ❌       | The request body. |

**Return Type**

`EventSourceConfigPayload`

**Example Usage Code Snippet**

```typescript
import { EventSourceConfigPayload, ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const eventSourceConfigPayload: EventSourceConfigPayload = {
    source: 'source',
  };

  const { data } = await projectClient.integrations.saveEventsourceIntegration(eventSourceConfigPayload);

  console.log(data);
})();
```

## deleteEventsourceIntegration

Removes a eventsource integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/eventsource`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteEventsourceIntegration();

  console.log(data);
})();
```

## deleteEventsourceIntegrationById

Removes a specific eventsource integration instance by ID from the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/eventsource/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteEventsourceIntegrationById('id');

  console.log(data);
})();
```

## getExpoIntegration

Retrieves the current expo integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/expo`

**Return Type**

`ExpoConfigCollection`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.getExpoIntegration();

  console.log(data);
})();
```

## saveExpoIntegration

Creates or updates a expo integration for the project. Only administrators can configure integrations.

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
import { ExpoConfigPayload, ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const expoConfigPayload: ExpoConfigPayload = {
    accessToken: 'access_token',
  };

  const { data } = await projectClient.integrations.saveExpoIntegration(expoConfigPayload);

  console.log(data);
})();
```

## deleteExpoIntegration

Removes a expo integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/expo`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteExpoIntegration();

  console.log(data);
})();
```

## deleteExpoIntegrationById

Removes a specific expo integration instance by ID from the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/expo/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteExpoIntegrationById('id');

  console.log(data);
})();
```

## getFcmIntegration

Retrieves the current fcm integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/fcm`

**Return Type**

`FcmConfigCollection`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.getFcmIntegration();

  console.log(data);
})();
```

## saveFcmIntegration

Creates or updates a fcm integration for the project. Only administrators can configure integrations.

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
import { FcmConfigPayload, ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
	token: 'YOUR_TOKEN'});

  const type_ = Type_.SERVICE_ACCOUNT;

const fcmConfigPayload: FcmConfigPayload = {
  authProviderX509CertUrl: "auth_provider_x509_cert_url",
  authUri: "auth_uri",
  clientEmail: "client_email",
  clientId: "client_id",
  clientX509CertUrl: "client_x509_cert_url",
  privateKey: "----------- BEGINLWUTSS---
Z/yRHoY
--- ENDMKQETWCLJB-",
  privateKeyId: "private_key_id",
  projectId: "project_id",
  tokenUri: "token_uri",
  type: type_,
  universeDomain: "universe_domain"
};

  const { data } = await projectClient.integrations.saveFcmIntegration(
  fcmConfigPayload
);

  console.log(data);
})();
```

## deleteFcmIntegration

Removes a fcm integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/fcm`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteFcmIntegration();

  console.log(data);
})();
```

## deleteFcmIntegrationById

Removes a specific fcm integration instance by ID from the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/fcm/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteFcmIntegrationById('id');

  console.log(data);
})();
```

## getGithubIntegration

Retrieves the current github integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/github`

**Return Type**

`GithubConfigCollection`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.getGithubIntegration();

  console.log(data);
})();
```

## saveGithubIntegration

Creates or updates a github integration for the project. Only administrators can configure integrations.

- HTTP Method: `PUT`
- Endpoint: `/integrations/github`

**Parameters**

| Name | Type                                                    | Required | Description       |
| :--- | :------------------------------------------------------ | :------- | :---------------- |
| body | [GithubConfigPayload](../models/GithubConfigPayload.md) | ❌       | The request body. |

**Return Type**

`GithubConfigPayload`

**Example Usage Code Snippet**

```typescript
import { GithubConfigPayload, ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const githubConfigPayload: GithubConfigPayload = {
    webhookSigningSecret: 'webhook_signing_secret',
  };

  const { data } = await projectClient.integrations.saveGithubIntegration(githubConfigPayload);

  console.log(data);
})();
```

## deleteGithubIntegration

Removes a github integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/github`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteGithubIntegration();

  console.log(data);
})();
```

## deleteGithubIntegrationById

Removes a specific github integration instance by ID from the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/github/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteGithubIntegrationById('id');

  console.log(data);
})();
```

## getInboxIntegration

Retrieves the current inbox integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/inbox`

**Return Type**

`InboxConfigCollection`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.getInboxIntegration();

  console.log(data);
})();
```

## saveInboxIntegration

Creates or updates a inbox integration for the project. Only administrators can configure integrations.

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
import { InboxConfigPayload, ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const images: Images = {
    emptyInboxUrl: 'emptyInboxUrl',
  };

  const banner: Banner = {
    backgroundColor: 'backgroundColor',
    backgroundOpacity: 2.74,
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

  const { data } = await projectClient.integrations.saveInboxIntegration(inboxConfigPayload);

  console.log(data);
})();
```

## deleteInboxIntegration

Removes a inbox integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/inbox`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteInboxIntegration();

  console.log(data);
})();
```

## deleteInboxIntegrationById

Removes a specific inbox integration instance by ID from the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/inbox/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteInboxIntegrationById('id');

  console.log(data);
})();
```

## getMailgunIntegration

Retrieves the current mailgun integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/mailgun`

**Return Type**

`MailgunConfigCollection`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.getMailgunIntegration();

  console.log(data);
})();
```

## saveMailgunIntegration

Creates or updates a mailgun integration for the project. Only administrators can configure integrations.

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
import { MailgunConfigPayload, ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
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

  const { data } = await projectClient.integrations.saveMailgunIntegration(mailgunConfigPayload);

  console.log(data);
})();
```

## deleteMailgunIntegration

Removes a mailgun integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/mailgun`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteMailgunIntegration();

  console.log(data);
})();
```

## deleteMailgunIntegrationById

Removes a specific mailgun integration instance by ID from the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/mailgun/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteMailgunIntegrationById('id');

  console.log(data);
})();
```

## getPingEmailIntegration

Retrieves the current ping_email integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/ping_email`

**Return Type**

`PingConfigCollection`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.getPingEmailIntegration();

  console.log(data);
})();
```

## savePingEmailIntegration

Creates or updates a ping_email integration for the project. Only administrators can configure integrations.

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
import { PingConfigPayload, ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const pingConfigPayload: PingConfigPayload = {
    url: 'url',
  };

  const { data } = await projectClient.integrations.savePingEmailIntegration(pingConfigPayload);

  console.log(data);
})();
```

## deletePingEmailIntegration

Removes a ping_email integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/ping_email`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deletePingEmailIntegration();

  console.log(data);
})();
```

## deletePingEmailIntegrationById

Removes a specific ping_email integration instance by ID from the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/ping_email/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deletePingEmailIntegrationById('id');

  console.log(data);
})();
```

## getSendgridIntegration

Retrieves the current sendgrid integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/sendgrid`

**Return Type**

`SendgridConfigCollection`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.getSendgridIntegration();

  console.log(data);
})();
```

## saveSendgridIntegration

Creates or updates a sendgrid integration for the project. Only administrators can configure integrations.

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
import { ProjectClient, SendgridConfigPayload } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
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

  const { data } = await projectClient.integrations.saveSendgridIntegration(sendgridConfigPayload);

  console.log(data);
})();
```

## deleteSendgridIntegration

Removes a sendgrid integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/sendgrid`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteSendgridIntegration();

  console.log(data);
})();
```

## deleteSendgridIntegrationById

Removes a specific sendgrid integration instance by ID from the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/sendgrid/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteSendgridIntegrationById('id');

  console.log(data);
})();
```

## getSesIntegration

Retrieves the current ses integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/ses`

**Return Type**

`SesConfigCollection`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.getSesIntegration();

  console.log(data);
})();
```

## saveSesIntegration

Creates or updates a ses integration for the project. Only administrators can configure integrations.

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
import { ProjectClient, SesConfigPayload } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
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

  const { data } = await projectClient.integrations.saveSesIntegration(sesConfigPayload);

  console.log(data);
})();
```

## deleteSesIntegration

Removes a ses integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/ses`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteSesIntegration();

  console.log(data);
})();
```

## deleteSesIntegrationById

Removes a specific ses integration instance by ID from the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/ses/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteSesIntegrationById('id');

  console.log(data);
})();
```

## getSlackIntegration

Retrieves the current slack integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/slack`

**Return Type**

`SlackConfigCollection`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.getSlackIntegration();

  console.log(data);
})();
```

## saveSlackIntegration

Creates or updates a slack integration for the project. Only administrators can configure integrations.

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
import { ProjectClient, SlackConfigPayload } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const slackConfigPayload: SlackConfigPayload = {
    appId: 'EMY',
    clientId: '70.75502767692',
    clientSecret: 'reprehenderit animaliqua suntins',
    signingSecret: 'sint Loremsitofficiaoccaecat Lor',
  };

  const { data } = await projectClient.integrations.saveSlackIntegration(slackConfigPayload);

  console.log(data);
})();
```

## deleteSlackIntegration

Removes a slack integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/slack`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteSlackIntegration();

  console.log(data);
})();
```

## deleteSlackIntegrationById

Removes a specific slack integration instance by ID from the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/slack/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteSlackIntegrationById('id');

  console.log(data);
})();
```

## getStripeIntegration

Retrieves the current stripe integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/stripe`

**Return Type**

`StripeConfigCollection`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.getStripeIntegration();

  console.log(data);
})();
```

## saveStripeIntegration

Creates or updates a stripe integration for the project. Only administrators can configure integrations.

- HTTP Method: `PUT`
- Endpoint: `/integrations/stripe`

**Parameters**

| Name | Type                                                    | Required | Description       |
| :--- | :------------------------------------------------------ | :------- | :---------------- |
| body | [StripeConfigPayload](../models/StripeConfigPayload.md) | ❌       | The request body. |

**Return Type**

`StripeConfigPayload`

**Example Usage Code Snippet**

```typescript
import { ProjectClient, StripeConfigPayload } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const stripeConfigPayload: StripeConfigPayload = {
    webhookSigningSecret: 'webhook_signing_secret',
  };

  const { data } = await projectClient.integrations.saveStripeIntegration(stripeConfigPayload);

  console.log(data);
})();
```

## deleteStripeIntegration

Removes a stripe integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/stripe`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteStripeIntegration();

  console.log(data);
})();
```

## deleteStripeIntegrationById

Removes a specific stripe integration instance by ID from the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/stripe/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteStripeIntegrationById('id');

  console.log(data);
})();
```

## getTemplatesIntegration

Retrieves the current templates integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/templates`

**Return Type**

`TemplatesConfigCollection`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.getTemplatesIntegration();

  console.log(data);
})();
```

## saveTemplatesIntegration

Creates or updates a templates integration for the project. Only administrators can configure integrations.

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
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const input = {};

  const { data } = await projectClient.integrations.saveTemplatesIntegration();

  console.log(data);
})();
```

## deleteTemplatesIntegration

Removes a templates integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/templates`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteTemplatesIntegration();

  console.log(data);
})();
```

## deleteTemplatesIntegrationById

Removes a specific templates integration instance by ID from the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/templates/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteTemplatesIntegrationById('id');

  console.log(data);
})();
```

## getTwilioIntegration

Retrieves the current twilio integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/twilio`

**Return Type**

`TwilioConfigCollection`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.getTwilioIntegration();

  console.log(data);
})();
```

## saveTwilioIntegration

Creates or updates a twilio integration for the project. Only administrators can configure integrations.

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
import { ProjectClient, TwilioConfigPayload } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const twilioConfigPayload: TwilioConfigPayload = {
    accountSid: 'account_sid',
    apiKey: 'api_key',
    apiSecret: 'api_secret',
    from: '+7',
  };

  const { data } = await projectClient.integrations.saveTwilioIntegration(twilioConfigPayload);

  console.log(data);
})();
```

## deleteTwilioIntegration

Removes a twilio integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/twilio`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteTwilioIntegration();

  console.log(data);
})();
```

## deleteTwilioIntegrationById

Removes a specific twilio integration instance by ID from the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/twilio/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteTwilioIntegrationById('id');

  console.log(data);
})();
```

## getWebPushIntegration

Retrieves the current web_push integration configurations for a specific integration type in the project. Returns configuration details and status information.

- HTTP Method: `GET`
- Endpoint: `/integrations/web_push`

**Return Type**

`WebpushConfigCollection`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.getWebPushIntegration();

  console.log(data);
})();
```

## saveWebPushIntegration

Creates or updates a web_push integration for the project. Only administrators can configure integrations.

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
import { ProjectClient, WebpushConfigPayload } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const webpushConfigPayload: WebpushConfigPayload = {
    privateKey: 'private_key',
    publicKey: 'public_key',
  };

  const { data } = await projectClient.integrations.saveWebPushIntegration(webpushConfigPayload);

  console.log(data);
})();
```

## deleteWebPushIntegration

Removes a web_push integration configuration from the project. This will disable the integration's functionality within the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/web_push`

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteWebPushIntegration();

  console.log(data);
})();
```

## deleteWebPushIntegrationById

Removes a specific web_push integration instance by ID from the project.

- HTTP Method: `DELETE`
- Endpoint: `/integrations/web_push/{id}`

**Parameters**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| id   | string | ✅       |             |

**Example Usage Code Snippet**

```typescript
import { ProjectClient } from 'magicbell-js/project-client';

(async () => {
  const projectClient = new ProjectClient({
    token: 'YOUR_TOKEN',
  });

  const { data } = await projectClient.integrations.deleteWebPushIntegrationById('id');

  console.log(data);
})();
```
