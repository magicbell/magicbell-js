# WebPushStartInstallationResponse

**Properties**

| Name      | Type   | Required | Description                                                |
| :-------- | :----- | :------- | :--------------------------------------------------------- |
| authToken | string | ✅       | Auth secret returned from PushSubscription.getKey('auth'). |
| publicKey | string | ✅       | VAPID public key generated for this web push installation. |
