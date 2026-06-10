# SlackTokenPayload

**Properties**

| Name    | Type                     | Required | Description                                                                                         |
| :------ | :----------------------- | :------- | :-------------------------------------------------------------------------------------------------- |
| oauth   | SlackTokenPayloadOauth   | ❌       |                                                                                                     |
| webhook | SlackTokenPayloadWebhook | ❌       | Obtained directly from the incoming_webhook object in the installation response from the Slack API. |

# SlackTokenPayloadOauth

**Properties**

| Name           | Type   | Required | Description                                                      |
| :------------- | :----- | :------- | :--------------------------------------------------------------- |
| channelId      | string | ✅       | The ID of the Slack channel this installation is associated with |
| installationId | string | ✅       | A unique identifier for this Slack workspace installation        |
| scope          | string | ❌       | The OAuth scope granted during installation                      |

# SlackTokenPayloadWebhook

Obtained directly from the incoming_webhook object in the installation response from the Slack API.

**Properties**

| Name | Type   | Required | Description                                 |
| :--- | :----- | :------- | :------------------------------------------ |
| url  | string | ✅       | The URL for the incoming webhook from Slack |
