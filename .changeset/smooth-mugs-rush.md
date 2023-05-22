---
'@magicbell/magicbell-react': patch
---

Updates the `PushNotificationsSubscriber` component to use our `@magicbell/webpush`
SDK. This change makes it compatible with the latest browsers and our updated API.

```jsx
import { PushNotificationsSubscriber } from '@magicbell/magicbell-react';

function MyComponent() {
  return (
    <PushNotificationsSubscriber serviceWorkerPath="/service-worker.js">
      {({ createSubscription }) => <button onClick={createSubscription}>Enable push notifications</button>}
    </PushNotificationsSubscriber>
  );
}
```
