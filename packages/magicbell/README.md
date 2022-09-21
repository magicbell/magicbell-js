# MagicBell Node.js Library

This package provides a convenient interface to query the [MagicBell](https://magicbell.com) API. Note that as some methods depend on your secret key, this SDK is not to be used in browsers.

> note: This package is in early release and is subject to change. TypeScript is supported, but api responses are untyped at the moment. We'll add types before we reach v1.0.0.

## Requirements

Node 14 or higher.

## Installation

Install the package with npm:

```sh
npm install magicbell --save
```

or yarn:

```sh
yarn add magicbell
```

## Usage

The package needs to be configured with your project's secret key & api key, which are
available in the [MagicBell Dashboard][dashboard].

```js
import MagicBell from 'magicbell';

const magicbell = new MagicBell({
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
});

try {
  const notification = await magicbell.notifications.create({
    title: 'Sweet!',
    content: 'When you see it, you know it!',
    recipients: [{ email: 'customer@example.com' }],
  });
  console.log(notification.id);
} catch (error) {
  console.error(error);
}
```

or go old-school with require and promises:

```js
const MagicBell = require('magicbell').default;

const magicbell = new MagicBell({
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
});

magicbell.notifications
  .create({
    title: 'Sweet!',
    content: 'When you see it, you know it!',
    recipients: [{ email: 'customer@example.com' }],
  })
  .then((notification) => console.log(notification.id))
  .catch((error) => console.error(error));
```

Some endpoints, like `notifications.list` are user oriented, and require the `userEmail` option to be set. This can be done via the client options, or on a per-request basis:

```js
const magicbell = new MagicBell({
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
  userEmail: 'you@example.com',
});

const notification = await magicbell.notifications.list();

// alternatively, provide the userEmail via request option instead
const notification = await magicbell.notifications.list({
  userEmail: 'someone@example.com',
});
```

Note that every resource method accepts an optional `options` object, which can be used to override client defaults and pass additional options to the request.

This can for example be used to fetch notification preferences for specific users:

```js
const johnsPreferences = await magicbell.notificationPreferences.list({
  userEmail: 'john@example.com',
});

const janesPreferences = await magicbell.notificationPreferences.list({
  userEmail: 'jane@example.com',
});
```

### Using Promises

Every method returns a promise.

```js
const user = await magicbell.users.create({
  email: 'person@example.com',
  first_name: 'Person',
  last_name: 'Doe',
});
```

List methods return iterable promises and the response can be handled in different ways:

**standard promise** - this method requires manual iteration to fetch multiple pages.

```js
const firstPage = await magicbell.notifications.list();
// firstPage: { page: 1, total_pages: 5, notifications: [{ id: '…', title: '…', … }, …], … }
const nextPage = await magicbell.notifications.list({ page: firstPage.current_page + 1 });
```

**async iterator** - this iterates over all items across multiple pages. Call `break` when you wish to step out of the iteration / auto fetching.

```js
for await (const notification of magicbell.notifications.list()) {
  console.log(notification.title);
  // break to abort and stop fetching/iterating
  if (shouldStop()) break;
}
```

**forEach** - similiar to the iterator, but in a callback style fashion. Return `false` when you wish to step out of the iteration / auto fetching.

```js
await magicbell.notifications.list().forEach((notification) => {
  console.log(notification.title);
  // return false to abort and stop fetching/iterating
  if (shouldStop()) return false;
});
```

**toArray** - all items across multiple pages are fetched and returned in a single array. This method cannot be cancelled half way, and requires a limit to be set to prevent your process from running out of memory. Use the iterators above if you need to fetch lots of data.

```js
const notifications = await magicbell.notifications.list().toArray({ limit: 1000 });
```

## Configuration

### Initialize with config object

The package can be initialized with several options:

```js
import MagicBell from 'magicbell';

const magicbell = new MagicBell({
  host: 'https://api.magicbell.com',

  // auth
  apiKey: 'your-api-key', // required
  apiSecret: 'your-secret-key', // required for project oriented endpoints
  userEmail: 'you@example.com', // required for user oriented endpoints

  // network
  timeout: 30_000,
  maxRetries: 3,
  maxRetryDelay: 60,
  telemetry: true,

  // logging
  debug: false,
});
```

#### Options

- **host** _String_

  The current refresh token.

- **apiKey** _String_

  Your project api key which can be found on the [MagicBell Dashboard][dashboard]. This key is required for all calls.

- **apiSecret** _String_

  Your project api secret which can be found on the [MagicBell Dashboard][dashboard]. This key is required for project oriented endpoints.

- **userEmail** _String_

  The email of the user you want to make requests for. This key is required for user oriented endpoints, but can also be provided on a per request basis. You only want to provide it to the client, if you're using the SDK for a single user/inbox.

- **timeout** _Number_

  A network timeout in milliseconds. Defaults to 30 seconds. Network requests will be canceled if they take longer than this.

- **maxRetries** _Number_

  The maximum number of times to retry a request. Defaults to 3. Set to 0 to disable retries.

- **maxRetryDelay** _Number_

  The maximum time in milliseconds to wait between retry requests. Note that subsequent retries can have a longer total duration than this. Defaults to 60 seconds.

- **telemetry** _Boolean_

  Each request - after the first - includes a header with the response time of the previous request. This helps us to improve the performance of the API. You can opt out of this by setting this option to `false`.

### Configuring Timeout

Timeout can be set globally via the config object:

```js
const magicbell = new MagicBell({
  // ...
  timeout: 20_000, // 20 seconds
});
```

And overridden on a per-request basis:

```js
magicbell.notifications.create(
  { title: 'Hi there!' },
  { timeout: 1_000 }, // 1 second
);
```

### Configuring for users

A per-request `userEmail` header can be added to any method. Note that we'll automatically add a `userKey` containing [the HMAC][hmac-authentication], if you've provided the `apiSecret` option.

```js
// List the notifications for a specific account
magicbell.notifications.list({ page: 1 }, { userEmail: 'person@example.com' });
```

### Network retries

Automatic network retries can be configured with the `maxRetries` option. This will retry network requests - with an exponential backoff - when it makes sense to retry them. For example, a request that failed due to a network error will be retried, but a request that failed due to an invalid API key or incorrect data will not.

> note: automatic retries are meant to handle short network disturbances. They're handled in-process, and don't use a persistent job queue. They won't survive process restarts. You might need to implement your own persistent workers with retry logic if delivery is crucial to your business.

We'll automatically add [idempotency keys][idempotent-requests] if you haven't provided on, to prevent duplication.

A request that was retried, will take longer, but looks exactly the same as a direct success to the caller. The caller will not be notified that a request was retried.

```js
const magicbell = new MagicBell({
  maxRetries: 2, // Retry a request twice before giving up
});
```

Network retries can also be set on a per-request basis:

```js
magicbell.notifications.create(
  { recipients: [{ email: 'person@example.com' }] },
  { maxRetries: 2 }, // Retry this specific request twice before giving up
);
```

### Using in a package

If you're wrapping our SDK, or using it in a specific app, we'd appreciate it if you instantiated your MagicBell client with `appInfo`, eg;

```js
const magicbell = new MagicBell({
  apiKey: '...',
  appInfo: {
    name: 'MyAwesomePlugin',
    version: '1.2.34', // Optional
    url: 'https://myawesomeplugin.info', // Optional
  },
});
```

### Request latency telemetry

By default, the library sends request latency telemetry to MagicBell. These
numbers help us to improve the overall latency of our API for all users.

You can disable this behavior if you prefer:

```js
const magicbell = new MagicBell({
  telemetry: false,
});
```

## Support

New features and bug fixes are released on the latest major version of the `magicbell` package. If you are on an older major version, we recommend that you upgrade to the latest in order to use the new features and bug fixes including those for security vulnerabilities. Older major versions of the package will continue to be available for use, but will not be receiving any updates.

## Credits

Credit where credits due, this package is inspired by and based on the [Stripe Node.js SDK](https://github.com/stripe/stripe-node).

[dashboard]: https://app.magicbell.com
[idempotent-requests]: https://www.magicbell.com/docs/rest-api/idempotent-requests
[hmac-authentication]: https://www.magicbell.com/docs/hmac-authentication
