# MagicBell Node.js Library

This package provides a convenient interface to query the [MagicBell](https://magicbell.com) API. Note that as some methods depend on your secret key, this SDK is not to be used in browsers.

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

const notifications = await magicbell.notifications.list();

// alternatively, provide the userEmail via request option instead
const notifications = await magicbell.notifications.list({
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

**forEach** - similar to the iterator, but in a callback style fashion. Return `false` when you wish to step out of the iteration / auto fetching.

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

- **features** _Record<string, boolean>_

  A map of feature flags to get access to beta features. See [Feature Flags](#feature-flags) for more information.

- **headers** _Record<string, string>_

  Custom headers you wish to include on the request, for example to instruct your proxy servers or to decorate your logs.

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

### Feature Flags

Features that in beta or early release are "hidden" behind a feature flag. You can enable them by passing a `features` object to the config, provided with a key for each feature that you wish to enable.

Note that these features are behind a flag for a reason. They may change or be removed at any time and are not covered by our semantic versioning (semver) policy.

```js
const magicbell = new MagicBell({
  features: {
    'a-new-beta-feature': true,
  },
});
```

Below is a list of features that are currently behind feature flags.

<!-- AUTO-GENERATED-CONTENT:START (FEATURE_FLAGS) -->

| Feature Flag                      | Description                                                                |
| --------------------------------- | -------------------------------------------------------------------------- |
| `broadcasts-list`                 | List notification broadcasts ([docs](#broadcasts-list))                    |
| `imports-create`                  | Create a import ([docs](#imports-create))                                  |
| `imports-get`                     | Get the status of an import ([docs](#imports-get))                         |
| `users-push-subscriptions-delete` | Delete user's push subscription ([docs](#users-push-subscriptions-delete)) |
| `users-push-subscriptions-list`   | Fetch user's push subscriptions ([docs](#users-push-subscriptions-list))   |

<!-- AUTO-GENERATED-CONTENT:END (FEATURE_FLAGS) -->

## Resource methods

Below you'll find the all supported resource methods, with their signatures. The full documentation can be found in our [api-reference][api-reference]. When comparing the api-reference with these methods, you'll notice that the SDK removes any wrapping entities for your convenience. Meaning, instead of posting `{ notification: { title: 'hi' } }`, you'll call `create({ title: 'hi' })`.

Apart from the removal of the wrappers, returned entities and provided parameters are identical between our REST API and this SDK.

<!-- AUTO-GENERATED-CONTENT:START (RESOURCE_METHODS) -->

### Broadcasts

#### List notification broadcasts

> **Warning**
>
> This method is in preview and is subject to change. It needs to be enabled via the `broadcasts-list` [feature flag](#feature-flags).

List all notification broadcasts. Broadcasts are sorted in descending order by the sent_at timestamp.

```js
await magicbell.broadcasts.list({
  page: 1,
  per_page: 1,
});
```

### Notifications

#### Create notifications

Send a notification to one or multiple users. You can identify users by their email address or by an external_id.

You don't have to import your users into MagicBell. If a user does not exist we'll create it automatically.

You can send user attributes like first_name, custom_attributes, and more when creating a notification.

The new notification will be shown in the notification inbox of each recipient in real-time. It will also be delivered to each recipient through all channels you have enabled for your MagicBell project.

```js
await magicbell.notifications.create({
  title: "We're processing your order",
  content: "<p>Thank you for your order. We'll notify you when these items are ready.</p>",
  category: 'order_created',
  topic: 'order:33098',
  recipients: [
    {
      email: 'dan@example.com',
    },
    {
      external_id: '83d987a-83fd034',
      first_name: 'Hana',
      last_name: 'Mohan',
      custom_attributes: {
        plan: 'enterprise',
        pricing_version: 'v10',
        preferred_pronoun: 'She',
      },
      phone_numbers: ['+15005550001'],
    },
    {
      matches: 'custom_attributes.order.id = 88492',
    },
  ],
  overrides: {
    email: {
      title: "[MagicBell] We're processing your order",
      content:
        "Thank you for your order. If you need help, or have any questions please don't hesitate to reach out to us directly at hello@magicbell.com",
    },
  },
});
```

#### Fetch notifications

Fetch a user's notifications. Notifications are sorted in descendent order by the sent_at timestamp.

```js
await magicbell.notifications.list(
  {
    per_page: 1,
    page: 1,
    read: true,
    seen: true,
    archived: true,
    categories: ['…'],
    topics: ['…'],
  },
  {
    userEmail: 'person@example.com',
  },
);
```

#### Fetch notification by ID

Fetch a user's notification by its ID.

```js
await magicbell.notifications.get('{notification_id}', {
  userEmail: 'person@example.com',
});
```

#### Delete a notification

Delete a user's notification by its ID. The notification is deleted immediately and removed from the user's notification inbox in real-time.

```js
await magicbell.notifications.delete('{notification_id}', {
  userEmail: 'person@example.com',
});
```

#### Mark a notification as read

Mark a user notification as read. The notification will be automatically marked as seen, too.

The new state will be reflected in the user's notification inbox in real-time.

```js
await magicbell.notifications.markAsRead('{notification_id}', {
  userEmail: 'person@example.com',
});
```

#### Mark a notification as unread

Mark a user notification as unread. The new state will be reflected in the user's notification inbox in real-time.

```js
await magicbell.notifications.markAsUnread('{notification_id}', {
  userEmail: 'person@example.com',
});
```

#### Archive a notification

Mark a user notification as archived.

```js
await magicbell.notifications.archive('{notification_id}', {
  userEmail: 'person@example.com',
});
```

#### Unarchive a notification

Mark a user notification as unarchived.

```js
await magicbell.notifications.unarchive('{notification_id}', {
  userEmail: 'person@example.com',
});
```

#### Mark all notifications as read

Mark all notifications of a user as read. When you call this endpoint, the notification inboxes of this user will be updated in real-time.

```js
await magicbell.notifications.markAllRead(
  {
    archived: true,
    read: true,
    seen: true,
    categories: ['…'],
    topics: ['…'],
  },
  {
    userEmail: 'person@example.com',
  },
);
```

#### Mark all notifications as seen

Mark all notifications of a user as seen. When you call this endpoint, the notification inboxes of this user will be updated in real-time.

```js
await magicbell.notifications.markAllSeen(
  {
    archived: true,
    read: true,
    seen: true,
    categories: ['…'],
    topics: ['…'],
  },
  {
    userEmail: 'person@example.com',
  },
);
```

### Users

#### Create a user

Create a user. Please note that you must provide the user's email or the external id so MagicBell can uniquely identify the user.

The external id, if provided, must be unique to the user.

```js
await magicbell.users.create({
  external_id: '56780',
  email: 'hana@supportbee.com',
  first_name: 'Hana',
  last_name: 'Mohan',
  custom_attributes: {
    plan: 'enterprise',
    pricing_version: 'v10',
    preferred_pronoun: 'She',
  },
  phone_numbers: ['+15005550001'],
});
```

#### Fetch users

Fetches users for the project identified by the auth keys. Supports filtering, ordering, and pagination.

```js
await magicbell.users.list({
  page: 1,
  per_page: 1,
  'last_seen_at:before': '…',
  'last_seen_at:after': '…',
  'last_notified_at:before': '…',
  'last_notified_at:after': '…',
  order_by: '…',
});
```

#### Fetch user by ID

Fetch a user by id, for the project identified by the auth keys.

```js
await magicbell.users.fetch('{user_id}');
```

#### Update a user

Update a user's data. If you identify users by their email addresses, you need to update the MagicBell data, so this user can still access their notifications.

```js
await magicbell.users.update('{user_id}', {
  email: 'hana@magicbell.io',
});
```

#### Delete a user

Immediately deletes a user.

```js
await magicbell.users.delete('{user_id}');
```

#### Update a user identified by email

Update a user's data. If you identify users by their email addresses, you need to update the MagicBell data, so this user can still access their notifications.

```js
await magicbell.users.updateByEmail('{user_email}', {
  external_id: '56780',
  email: 'hana@supportbee.com',
  first_name: 'Hana',
  last_name: 'Mohan',
  custom_attributes: {
    plan: 'enterprise',
    pricing_version: 'v10',
    preferred_pronoun: 'She',
  },
  phone_numbers: ['+15005550001'],
});
```

#### Delete a user identified by email

Immediately deletes a user.

```js
await magicbell.users.deleteByEmail('{user_email}');
```

#### Update a user identified by external ID

Update a user's data. If you identify users by their email addresses, you need to update the MagicBell data, so this user can still access their notifications.

```js
await magicbell.users.updateByExternalId('{external_id}', {
  external_id: '56780',
  email: 'hana@supportbee.com',
  first_name: 'Hana',
  last_name: 'Mohan',
  custom_attributes: {
    plan: 'enterprise',
    pricing_version: 'v10',
    preferred_pronoun: 'She',
  },
  phone_numbers: ['+15005550001'],
});
```

#### Delete a user identified by external ID

Immediately deletes a user.

```js
await magicbell.users.deleteByExternalId('{external_id}');
```

### Users Push Subscriptions

#### Fetch user's push subscriptions

> **Warning**
>
> This method is in preview and is subject to change. It needs to be enabled via the `users-push-subscriptions-list` [feature flag](#feature-flags).

Fetch a user's push subscriptions. Returns a paginated list of web and mobile push subscriptions for all platforms.

```js
await magicbell.users.pushSubscriptions.list('{user_id}', {
  page: 1,
  per_page: 1,
});
```

#### Delete user's push subscription

> **Warning**
>
> This method is in preview and is subject to change. It needs to be enabled via the `users-push-subscriptions-delete` [feature flag](#feature-flags).

Delete a user's push subscriptions. Identifies the user by the user's ID and the push subscription by the subscription's ID.

```js
await magicbell.users.pushSubscriptions.delete('{user_id}', '{subscription_id}');
```

### Push Subscriptions

#### Register a device token for a user

Register a device token for push notifications.

Please keep in mind that mobile push notifications will be delivered to this device only if the channel is configured and enabled.

```js
await magicbell.pushSubscriptions.create(
  {
    device_token: 'x4doKe98yEZ21Kum2Qq39M3b8jkhonuIupobyFnL0wJMSWAZ8zoTp2dyHgV',
    platform: 'ios',
  },
  {
    userEmail: 'person@example.com',
  },
);
```

#### Delete user's device token

Deletes the registered device token to remove the mobile push subscription.

```js
await magicbell.pushSubscriptions.delete('{device_token}', {
  userEmail: 'person@example.com',
});
```

### Notification Preferences

#### Fetch user notification preferences

Fetch a user's notification preferences. If a user does not disable a channel explicitly, we would send notifications through that channel as long as your project is enabled.

```js
await magicbell.notificationPreferences.get({
  userEmail: 'person@example.com',
});
```

#### Update user notification preferences

Update a user's notification preferences. These preferences will be applied only to channels you enabled for your project.

```js
await magicbell.notificationPreferences.update(
  {
    categories: [
      {
        slug: 'billing',
        channels: [
          {
            slug: 'email',
            enabled: false,
          },
          {
            slug: 'web_push',
            enabled: false,
          },
        ],
      },
    ],
  },
  {
    userEmail: 'person@example.com',
  },
);
```

### Subscriptions

#### Fetch user's topic subscriptions

Fetch a user's topic subscriptions.

```js
await magicbell.subscriptions.list({
  userEmail: 'person@example.com',
});
```

#### Create a topic subscription

Set a user's subscription status to subscribed for a particular topic (and optional categories). If the user previously unsubscribed, the user will be resubscribed.

```js
await magicbell.subscriptions.create(
  {
    categories: [
      {
        slug: 'comments',
        reason: 'watching-the-repo',
      },
    ],
    topic: 'acme-inc.orders.1234',
  },
  {
    userEmail: 'person@example.com',
  },
);
```

#### Unsubscribe from a topic

Unusbscribe a user from a particular topic (and optional categories).

```js
await magicbell.subscriptions.unsubscribe(
  '{topic}',
  {
    categories: [
      {
        slug: 'comments',
      },
    ],
  },
  {
    userEmail: 'person@example.com',
  },
);
```

#### Show a topic subscription

Show a user's subscription status for a particular topic and categories.

```js
await magicbell.subscriptions.get('{topic}', {
  userEmail: 'person@example.com',
});
```

#### Delete topic subscription(s)

```js
await magicbell.subscriptions.delete(
  '{topic}',
  {
    categories: [
      {
        slug: '…',
      },
    ],
  },
  {
    userEmail: 'person@example.com',
  },
);
```

### Imports

#### Create a import

> **Warning**
>
> This method is in preview and is subject to change. It needs to be enabled via the `imports-create` [feature flag](#feature-flags).

Enqueues an import - currently only supported for users. Amongst other things, the users import allows associating slack channels (if you have already setup the oauth apps).

```js
await magicbell.imports.create({
  users: [
    {
      external_id: 'ugiabqertz',
      email: 'johndoe@example.com',
      first_name: 'John',
      last_name: 'Doe',
      custom_attributes: {
        age: 32,
        country: 'Spain',
      },
      channels: {
        slack: {
          providers: [
            {
              oauth: {
                channel_id: 'U039446XF3Y',
                app: {
                  app_id: 'your_slack_app_id',
                  team_id: 'workspace_id_from_slack',
                },
              },
            },
          ],
        },
      },
    },
  ],
});
```

#### Get the status of an import

> **Warning**
>
> This method is in preview and is subject to change. It needs to be enabled via the `imports-get` [feature flag](#feature-flags).

Query the status of the import for a summary of imported records and failures for each record that could not be imported successfully.

```js
await magicbell.imports.get('{import_id}');
```

<!-- AUTO-GENERATED-CONTENT:END (RESOURCE_METHODS) -->

## Realtime

Listen to realtime events using Server Sent Events / EventSource. This feature supports auto-retry for authentication requests, and auto-reconnect when streaming. In case the connection is lost, the client will try to reconnect and resume the stream from the last received event.

It's possible to listen via an async iterator, or via a callback. The listen method is for a single user. Just like with the resource methods, the user email or external-id can be provided via the client, or passed as argument to the listen method.

```js
const magicbell = new MagicBell({
  apiKey: 'your-api-key',
  userEmail: 'someone@example.com',
});

magicbell.listen({ userEmail: 'someone@example.com' });
```

**async iterator** - this iterates over all events. Call `break` when you wish to step out of the iteration and stop listening.

```js
for await (const notification of magicbell.listen()) {
  console.log(notification.data.id);
  // break to abort and stop listening
  if (shouldStop()) break;
}
```

**forEach** - similar to the iterator, but in a callback style fashion. Return `false` when you wish to stop listening.

```js
magicbell.listen().forEach((notification) => {
  console.log(notification.data.id);
  // return false to abort and stop listening
  if (shouldStop()) return false;
});
```

**close** - stop listening. This will close the connection and stop the auto-reconnect.

```js
const listener = magicbell.listen();

listener.forEach((notification) => {
  console.log(notification.data.id);
});

// stop listening after 5 seconds
setTimeout(() => {
  listener.close();
}, 5_000);
```

### Realtime events

The following events are emitted by the client:

| event.name               | description                                |
| ------------------------ | ------------------------------------------ |
| `notifications/new`      | a new notification has been created        |
| `notifications/read`     | a notification has been read               |
| `notifications/unread`   | a notification has been marked as unread   |
| `notifications/delete`   | a notification has been deleted            |
| `notifications/read/all` | all notifications have been marked as read |
| `notifications/seen/all` | all notifications have been marked as seen |

### Realtime with extended data

Note that the realtime listener returns a limited set of data. We do this intentionally, so that the listener stays fast, and doesn't use more bandwidth or battery than necessary. If you need more data, you can complement it using the notification resource method.

```js
for await (let event of client.listen()) {
  if ('id' in event.data) {
    const notification = await client.notifications.get(event.data.id);
    doSomething({ event, notification });
  } else {
    doSomething({ event });
  }
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
