# SlackToken

**Properties**

| Name        | Type              | Required | Description                                                                                         |
| :---------- | :---------------- | :------- | :-------------------------------------------------------------------------------------------------- |
| createdAt   | string            | ✅       |                                                                                                     |
| id          | string            | ✅       |                                                                                                     |
| discardedAt | string            | ❌       |                                                                                                     |
| oauth       | SlackTokenOauth   | ❌       |                                                                                                     |
| updatedAt   | string            | ❌       |                                                                                                     |
| webhook     | SlackTokenWebhook | ❌       | Obtained directly from the incoming_webhook object in the installation response from the Slack API. |

# SlackTokenOauth

**Properties**

| Name           | Type   | Required | Description |
| :------------- | :----- | :------- | :---------- |
| channelId      | string | ✅       |             |
| installationId | string | ✅       |             |
| scope          | string | ❌       |             |

# SlackTokenWebhook

Obtained directly from the incoming_webhook object in the installation response from the Slack API.

**Properties**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| url  | string | ✅       |             |
