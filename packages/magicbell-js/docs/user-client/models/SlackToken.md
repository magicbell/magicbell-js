# SlackToken

**Properties**

| Name        | Type              | Required | Description                                                                                         |
| :---------- | :---------------- | :------- | :-------------------------------------------------------------------------------------------------- |
| createdAt   | string            | ✅       | The timestamp when the token was created.                                                           |
| id          | string            | ✅       | The unique identifier for the token.                                                                |
| discardedAt | string            | ❌       | The timestamp when the token was discarded, if applicable.                                          |
| oauth       | SlackTokenOauth   | ❌       |                                                                                                     |
| updatedAt   | string            | ❌       | The timestamp when the token metadata last changed.                                                 |
| webhook     | SlackTokenWebhook | ❌       | Obtained directly from the incoming_webhook object in the installation response from the Slack API. |

# SlackTokenOauth

**Properties**

| Name           | Type   | Required | Description                                                      |
| :------------- | :----- | :------- | :--------------------------------------------------------------- |
| channelId      | string | ✅       | The ID of the Slack channel this installation is associated with |
| installationId | string | ✅       | A unique identifier for this Slack workspace installation        |
| scope          | string | ❌       | The OAuth scope granted during installation                      |

# SlackTokenWebhook

Obtained directly from the incoming_webhook object in the installation response from the Slack API.

**Properties**

| Name | Type   | Required | Description                                 |
| :--- | :----- | :------- | :------------------------------------------ |
| url  | string | ✅       | The URL for the incoming webhook from Slack |
