# FcmToken

**Properties**

| Name        | Type   | Required | Description                                                                        |
| :---------- | :----- | :------- | :--------------------------------------------------------------------------------- |
| createdAt   | string | ✅       | The timestamp when the token was created.                                          |
| deviceToken | string | ✅       | The Firebase Cloud Messaging device registration token to associate with the user. |
| id          | string | ✅       | The unique identifier for the token.                                               |
| discardedAt | string | ❌       | The timestamp when the token was discarded, if applicable.                         |
| updatedAt   | string | ❌       | The timestamp when the token metadata last changed.                                |
