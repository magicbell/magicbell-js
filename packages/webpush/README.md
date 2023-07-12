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

### Subscribe

```js
import { subscribe } from '@magicbell/webpush';

subscribe({
  token: 'jwt-token',
  host: 'https://api.magicbell.com',
  project: 'string',
  serviceWorkerPath: '/sw.js',
});
```

#### Options

**token** _String_

The JWT token you received from the MagicBell API. This token is used to authenticate the request.

**host** _String_

Optional. The host of the MagicBell API. Defaults to `https://api.magicbell.com`.

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
  host: 'https://api.magicbell.com',
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
  host: 'https://api.magicbell.com',
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
[hmac-authentication]: https://www.magicbell.com/docs/hmac-authentication
[api-reference]: https://www.magicbell.com/docs/rest-api/reference

```

```
