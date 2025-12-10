# ExpoToken

**Properties**

| Name        | Type   | Required | Description                                                |
| :---------- | :----- | :------- | :--------------------------------------------------------- |
| createdAt   | string | ✅       | The timestamp when the token was created.                  |
| deviceToken | string | ✅       | The Expo push token returned by the Expo client.           |
| id          | string | ✅       | The unique identifier for the token.                       |
| discardedAt | string | ❌       | The timestamp when the token was discarded, if applicable. |
| updatedAt   | string | ❌       | The timestamp when the token metadata last changed.        |
