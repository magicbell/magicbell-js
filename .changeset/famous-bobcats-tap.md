---
'magicbell': major
---

**Breaking Changes** - please read carefully.

We've separated the project from user resources. There are now two API clients exposed that can be used independently. A `ProjectClient` and a `UserClient`.

**Project Client**

The `ProjectClient` provides access to all our API endpoints that require the api secret key. It's the same client as in v1, but with all user scoped endpoints removed.

In most cases, you'll only have to change the import statements to use the new client.

```diff
- import { Client } from 'magicbell';
+ import { ProjectClient } from 'magicbell/project-client';

- const magicbell = new Client({
+ const magicbell = new ProjectClient({
  apiKey: 'your-api-key', // required
  apiSecret: 'your-secret-key', // required
});

magicbell.users.list();
```

**User Client**

The `UserClient` provides access to all our API endpoints that require the user email or user external id. As the user client only supports user scoped APIs and does not require or accept the api secret key, it's safe to use in the browser.

If you've used the client scoped resources before, you'll have to migrate those calls to the user client. Note that if you provided the `apiSecret` to the old client, you'll have to remove it from the new one. User credentials are now provided in the constructor, and no longer overridable on a per request basis.

```diff
- import { Client } from 'magicbell';
+ import { UserClient } from 'magicbell/user-client';

- const magicbell = new Client({
+ const magicbell = new UserClient({
  apiKey: 'your-api-key', // required
- apiSecret: 'your-secret-key',
+ userEmail: 'you@example.com', // required if userExternalId is not set
+ userExternalId: 'your-external-id', // required if userEmail is not set
+ userHmac: 'your-user-hmac', // required if HMAC is enabled
});

magicbell.notifications.list();
```

**User HMAC**

As the `UserClient` does not have access to your api secret key, `userHmac` keys are no longer automatically generated. You'll have to generate them yourself and provide them to the client. This is a necessary change to make the client safe to use in the browser without exposing your api secret key.

We've exported a `createHmac` util for you to generate the HMAC keys. You can use it in your backend to generate the HMAC keys.

```js
import { createHmac } from 'magicbell/crypto';

const userHmac = createHmac(process.env.MAGICBELL_API_KEY, user);
```

We've made the `createHmac` util as flexible as possible. It accepts MagicBell user objects with properties as `userEmail` and/or `userExternalId`, as well as objects with `id`, `_id`, or `email` properties. When providing the `id`, we assume that it maps to our `userExternalId`. If none of those properties work for you, it's possible to provide a string as second argument.

```js
// these are all supported and the same
const userHmac = createHmac('secret-key', 'value');
const userHmac = createHmac('secret-key', { userExternalId: 'value' });
const userHmac = createHmac('secret-key', { userEmail: 'value' });
const userHmac = createHmac('secret-key', { id: 'value' });
const userHmac = createHmac('secret-key', { _id: 'value' });
const userHmac = createHmac('secret-key', { email: 'value' });
```
