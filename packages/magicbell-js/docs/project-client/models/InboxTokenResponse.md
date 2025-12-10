# InboxTokenResponse

**Properties**

| Name         | Type   | Required | Description                                                                |
| :----------- | :----- | :------- | :------------------------------------------------------------------------- |
| createdAt    | string | ✅       | The timestamp when the token was created.                                  |
| id           | string | ✅       | The unique identifier for the token.                                       |
| token        | string | ✅       | The in-app inbox token generated for this user.                            |
| connectionId | string | ❌       | Realtime connection ID to restrict delivery to a specific Ably connection. |
| discardedAt  | string | ❌       | The timestamp when the token was discarded, if applicable.                 |
| updatedAt    | string | ❌       | The timestamp when the token metadata last changed.                        |
