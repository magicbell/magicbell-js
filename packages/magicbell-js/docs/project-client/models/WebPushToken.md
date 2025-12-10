# WebPushToken

**Properties**

| Name        | Type   | Required | Description                                                                                                                                                                                      |
| :---------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| createdAt   | string | ✅       | The timestamp when the token was created.                                                                                                                                                        |
| endpoint    | string | ✅       | The push subscription URL obtained from PushSubscription.endpoint after calling registration.pushManager.subscribe(). This is the unique URL for this device that push messages will be sent to. |
| id          | string | ✅       | The unique identifier for the token.                                                                                                                                                             |
| keys        | Keys   | ✅       | The encryption keys from the PushSubscription.getKey() method, needed to encrypt push messages for this subscription.                                                                            |
| discardedAt | string | ❌       | The timestamp when the token was discarded, if applicable.                                                                                                                                       |
| updatedAt   | string | ❌       | The timestamp when the token metadata last changed.                                                                                                                                              |

# Keys

The encryption keys from the PushSubscription.getKey() method, needed to encrypt push messages for this subscription.

**Properties**

| Name   | Type   | Required | Description                                                                                                                     |
| :----- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------ |
| auth   | string | ✅       | The authentication secret obtained from PushSubscription.getKey('auth'). Used to encrypt push messages for this subscription.   |
| p256dh | string | ✅       | The P-256 ECDH public key obtained from PushSubscription.getKey('p256dh'). Used to encrypt push messages for this subscription. |
