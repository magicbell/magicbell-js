# TeamsToken

**Properties**

| Name        | Type              | Required | Description                                                |
| :---------- | :---------------- | :------- | :--------------------------------------------------------- |
| createdAt   | string            | ✅       | The timestamp when the token was created.                  |
| id          | string            | ✅       | The unique identifier for the token.                       |
| discardedAt | string            | ❌       | The timestamp when the token was discarded, if applicable. |
| updatedAt   | string            | ❌       | The timestamp when the token metadata last changed.        |
| webhook     | TeamsTokenWebhook | ❌       |                                                            |

# TeamsTokenWebhook

**Properties**

| Name | Type   | Required | Description |
| :--- | :----- | :------- | :---------- |
| url  | string | ❌       |             |
