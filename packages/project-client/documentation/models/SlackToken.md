# SlackToken

**Properties**

| Name    | Type              | Required | Description |
| :------ | :---------------- | :------- | :---------- |
| oauth   | Oauth             | ❌       |             |
| webhook | SlackTokenWebhook | ❌       |             |

# Oauth

**Properties**

| Name           | Type   | Required | Description |
| :------------- | :----- | :------- | :---------- |
| channelId      | string | ✅       |             |
| installationId | string | ✅       |             |
| scope          | string | ❌       |             |

# SlackTokenWebhook

**Properties**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| url  | string | ✅       |             |
