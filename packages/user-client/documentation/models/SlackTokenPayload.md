# SlackTokenPayload

**Properties**

| Name    | Type                     | Required | Description                                                                                         |
| :------ | :----------------------- | :------- | :-------------------------------------------------------------------------------------------------- |
| oauth   | SlackTokenPayloadOauth   | ❌       |                                                                                                     |
| webhook | SlackTokenPayloadWebhook | ❌       | Obtained directly from the incoming_webhook object in the installation response from the Slack API. |

# SlackTokenPayloadOauth

**Properties**

| Name           | Type   | Required | Description |
| :------------- | :----- | :------- | :---------- |
| channelId      | string | ✅       |             |
| installationId | string | ✅       |             |
| scope          | string | ❌       |             |

# SlackTokenPayloadWebhook

Obtained directly from the incoming_webhook object in the installation response from the Slack API.

**Properties**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| url  | string | ✅       |             |
