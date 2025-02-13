# SlackTokenResponse

**Properties**

| Name        | Type                      | Required | Description |
| :---------- | :------------------------ | :------- | :---------- |
| createdAt   | string                    | ✅       |             |
| id          | string                    | ✅       |             |
| discardedAt | string                    | ❌       |             |
| oauth       | Oauth                     | ❌       |             |
| updatedAt   | string                    | ❌       |             |
| webhook     | SlackTokenResponseWebhook | ❌       |             |

# Oauth

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
