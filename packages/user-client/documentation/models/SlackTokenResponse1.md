# SlackTokenResponse1

**Properties**

| Name        | Type                      | Required | Description                                                                                         |
| :---------- | :------------------------ | :------- | :-------------------------------------------------------------------------------------------------- |
| createdAt   | string                    | ✅       |                                                                                                     |
| id          | string                    | ✅       |                                                                                                     |
| discardedAt | string                    | ❌       |                                                                                                     |
| oauth       | SlackTokenResponseOauth   | ❌       |                                                                                                     |
| updatedAt   | string                    | ❌       |                                                                                                     |
| webhook     | SlackTokenResponseWebhook | ❌       | Obtained directly from the incoming_webhook object in the installation response from the Slack API. |

# SlackTokenResponseOauth

**Properties**

| Name           | Type   | Required | Description |
| :------------- | :----- | :------- | :---------- |
| channelId      | string | ✅       |             |
| installationId | string | ✅       |             |
| scope          | string | ❌       |             |

# SlackTokenResponseWebhook

Obtained directly from the incoming_webhook object in the installation response from the Slack API.

**Properties**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| url  | string | ✅       |             |
