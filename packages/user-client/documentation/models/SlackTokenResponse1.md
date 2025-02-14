# SlackTokenResponse1

**Properties**

| Name        | Type                      | Required | Description |
| :---------- | :------------------------ | :------- | :---------- |
| createdAt   | string                    | ✅       |             |
| id          | string                    | ✅       |             |
| discardedAt | string                    | ❌       |             |
| oauth       | SlackTokenResponseOauth   | ❌       |             |
| updatedAt   | string                    | ❌       |             |
| webhook     | SlackTokenResponseWebhook | ❌       |             |

# SlackTokenResponseOauth

**Properties**

| Name           | Type   | Required | Description |
| :------------- | :----- | :------- | :---------- |
| channelId      | string | ✅       |             |
| installationId | string | ✅       |             |
| scope          | string | ❌       |             |

# SlackTokenResponseWebhook

**Properties**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| url  | string | ✅       |             |
