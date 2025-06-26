# MagicBell WebPush Library

This package provides a convenient interface to subscribe to browser/web push notifications using [MagicBell](https://magicbell.com).

## Installation

Install the package with npm:

```sh
npm install @magicbell/webpush --save
```

or yarn:

```sh
yarn add @magicbell/webpush
```

## Usage

Note that some of our endpoints used for push subscriptions, require a JWT for authentication. This is because we often want to show the "enable push subscriptions" button in a dialog (`window.open`), but we don't want to expose the `userMac` to the client via browser history. Therefore, we need to authenticate the request with a JWT token, which expires and thereby is relatively safe to expose to the client via the address bar.

Use the `getAuthToken` request to exchange the API Key based credentials for a JWT based token. Then use the `subscribe` request to subscribe the user to push notifications.

### Get a JWT token

To get a JWT token, you need to [authenticate][authentication] against the MagicBell API. You can do this by using your API key and user credentials. You only need to provide either `userEmail` or `userExternalId` and optionally - but recommended - `userHmac`. The latter is used for [HMAC authentication][hmac-authentication].

```js
import { getAuthToken } from '@magicbell/webpush';

// authenticate user by external id
getAuthToken({
  apiKey: '024…0bd',
  userExternalId: 'user_123',
  userHmac: 'NCI…I6M',
});

// or based by their email address
getAuthToken({
  apiKey: '024…0bd',
  userEmail: 'person@example.com',
  userHmac: 'NCI…I6M',
});
```

#### Options

**apiKey** _String_

Your MagicBell API key. You can find it in the [MagicBell dashboard][dashboard].

**userEmail** _String_

The email address of the user you want to authenticate. Required if no `userExternalId` is provided.

**userExternalId** _String_

The external ID of the user you want to authenticate. Required if no `userEmail` is provided.

**userHmac** _String_

The HMAC signature of the user you want to authenticate. Required if you want to use [HMAC authentication][hmac-authentication].

### Subscribe

Subscribe the user to push notifications. This method will register a service worker if it isn't already registered. The service worker will be registered at the path provided in the `serviceWorkerPath` option. If the service worker is already registered, it will be used to subscribe the user.

```js
import { subscribe } from '@magicbell/webpush';

subscribe({
  token: 'jwt-token',
  project: 'string',
  serviceWorkerPath: '/sw.js',
});
```

#### Options

**token** _String_

The JWT token you received from the MagicBell API. This token is used to authenticate the request.

**project** _String_

The random subdomain that MagicBell generated for your service worker registration.

**serviceWorkerPath** _String_

The path to the service worker file. Defaults to `/sw.js`.

### Register a service worker

A helper that can be used to register a service worker, prior to calling `subscribe`. This preflight allows for a faster
subscription process. If this method isn't used, registration will be done during `subscribe`.

Registration will be skipped if a service worker is already registered. In which case, the
active registration will be returned.

The returned promise resolves when the registration is ready.

```js
import { registerServiceWorker } from '@magicbell/webpush';

registerServiceWorker({
  path: '/sw.js',
});
```

#### Options

**path** _String_

The path to the service worker file. Defaults to `/sw.js`.

### Prefetch config

To speedup the subscription process, you can prefetch the config. This will separate the subscription from config fetching, and thereby reduce the time to subscribe. The method requires the same options as `subscribe`.

```js
import { prefetchConfig } from '@magicbell/webpush';

prefetchConfig({
  token: 'jwt-token',
  project: 'string',
  serviceWorkerPath: '/sw.js',
});
```

### isSubscribed

Check if the user is subscribed to push notifications in the current browser.

```js
import { isSubscribed } from '@magicbell/webpush';

const subscribed = await isSubscribed({
  token: 'jwt-token',
  project: 'string',
});

if (subscribed) {
  // Do something
} else {
  // Do something else
}
```

## Support

New features and bug fixes are released on the latest major version of the `magicbell` package. If you are on an older major version, we recommend that you upgrade to the latest in order to use the new features and bug fixes including those for security vulnerabilities. Older major versions of the package will continue to be available for use, but will not be receiving any updates.

## Credits

Credit where credits due, this package is inspired by and based on the [Stripe Node.js SDK](https://github.com/stripe/stripe-node).

[dashboard]: https://app.magicbell.com
[idempotent-requests]: https://www.magicbell.com/docs/rest-api/idempotent-requests
[authentication]: https://www.magicbell.com/docs/api-authentication
[hmac-authentication]: https://www.magicbell.com/docs/hmac-authentication
[api-reference]: https://www.magicbell.com/docs/rest-api/reference
