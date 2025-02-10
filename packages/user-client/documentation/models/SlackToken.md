# SlackToken

**Properties**

| Name    | Type              | Required | Description |
| :------ | :---------------- | :------- | :---------- |
| oauth   | SlackTokenOauth   | ❌       |             |
| webhook | SlackTokenWebhook | ❌       |             |

# SlackTokenOauth

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
