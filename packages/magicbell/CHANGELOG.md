# magicbell

## 1.7.2

### Patch Changes

- [`e78af04`](https://github.com/magicbell-io/magicbell-js/commit/e78af04eb97aebffe8fa41e088890364cb5367ad) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `json5` to `^2.2.3`.

## 1.7.1

### Patch Changes

- [#97](https://github.com/magicbell-io/magicbell-js/pull/97) [`9af0890`](https://github.com/magicbell-io/magicbell-js/commit/9af0890bae5668f24e69ef167aea5dfa413cede9) Thanks [@smeijer](https://github.com/smeijer)! - fix: correct response type for `users.list()` by renaming `user` prop to `users`.

## 1.7.0

### Minor Changes

- [#95](https://github.com/magicbell-io/magicbell-js/pull/95) [`87b781b`](https://github.com/magicbell-io/magicbell-js/commit/87b781be77fd66d89ae46567d0f8a5788acd588e) Thanks [@smeijer](https://github.com/smeijer)! - The `total` and `total_pages` props are removed from the following method return types:

  - `magicbell.broadcasts.list()`
  - `magicbell.broadcasts.notifications.list()`
  - `magicbell.users.list()`

  The [auto pagination](https://github.com/magicbell-io/magicbell-js/tree/main/packages/magicbell#using-promises) methods are updated to support the paginated responses that do not have those fields. Thereby, pagination helpers like `.list().forEach()`, `.list().toArray()` and the iterator in `for await (const node of method.list())` keep working as before.

## 1.6.0

### Minor Changes

- [#90](https://github.com/magicbell-io/magicbell-js/pull/90) [`ea0a9ca`](https://github.com/magicbell-io/magicbell-js/commit/ea0a9ca456cb9c82f6e6d4b9d0add512bce22a0e) Thanks [@smeijer](https://github.com/smeijer)! - update broadcast > notification response schema to include the fields:

  - `created_at`; datetime when notification was created
  - `updated_at`; datetime when notification was last updated
  - `seen_at`; datetime when notification was first seen
  - `read_at`; datetime when notification was first read
  - `status`; enum showing current state, current values: `unseen`, `unread`, `read`, `archived`

  Further changes are:

  - `recipient`; is marked as non-nullable
  - `deliveries`; is marked as non-nullable

- [#92](https://github.com/magicbell-io/magicbell-js/pull/92) [`530476e`](https://github.com/magicbell-io/magicbell-js/commit/530476e3d8f79c8c5176661316d2cdb46e424236) Thanks [@smeijer](https://github.com/smeijer)! - Rename `users.fetch` to `users.get`. Tho it's in theory a breaking change, the users api is relatively new, and the convention in this sdk is to use `get` for single entity retrieval, and not `fetch`. So we're going with a `minor` instead to get this fixed.

## 1.5.0

### Minor Changes

- [#83](https://github.com/magicbell-io/magicbell-js/pull/83) [`94cbb92`](https://github.com/magicbell-io/magicbell-js/commit/94cbb927bbc88791100dbb10c5be519d1f598a72) Thanks [@smeijer](https://github.com/smeijer)! - feat: add broadcasts.list method to the client.

  ```ts
  const broadcasts = magicbell.broadcasts.list({ per_page: 10 });

  await broadcasts.forEach((broadcast) => {
    console.log(broadcast.id);
  });
  ```

- [#84](https://github.com/magicbell-io/magicbell-js/pull/84) [`b0a809d`](https://github.com/magicbell-io/magicbell-js/commit/b0a809db0fbc074a5a10b011bc84561285def6c4) Thanks [@smeijer](https://github.com/smeijer)! - feat: add `broadcasts.get` method to the client.

  ```ts
  const broadcasts = await magicbell.broadcasts.get(broadcastId);
  console.log(broadcast.id);
  ```

- [#86](https://github.com/magicbell-io/magicbell-js/pull/86) [`073e3f8`](https://github.com/magicbell-io/magicbell-js/commit/073e3f840932ccad8a63ba390c1ebaf59e95903e) Thanks [@smeijer](https://github.com/smeijer)! - feat: add `broadcasts.notifications.list` method to the client.

  ```ts
  const notifications = magicbell.broadcasts.notifications.list(broadcastId, { per_page: 10 });

  await notifications.forEach((notification) => {
    console.log(notification.id);
  });
  ```

- [#87](https://github.com/magicbell-io/magicbell-js/pull/87) [`f0ec9a5`](https://github.com/magicbell-io/magicbell-js/commit/f0ec9a5258d2053a0f9d87108308808b6f1f1411) Thanks [@smeijer](https://github.com/smeijer)! - Update schemas for broadcast methods.

  - dropped `broadcast.recipients_count`, use `broadcast.status.summary.total` instead.
  - broadcast notification `status` is now an enum string.
  - changed `sent_at` timestamps to be iso-strings.
  - added `created_at` to broadcast.
  - added `title` to broadcast notification

## 1.4.4

### Patch Changes

- [#76](https://github.com/magicbell-io/magicbell-js/pull/76) [`fe450c8`](https://github.com/magicbell-io/magicbell-js/commit/fe450c884900e1d42b8ae868710742c2fea61256) Thanks [@smeijer](https://github.com/smeijer)! - Feature flags are now typed, making it easier to enable beta features, and harder to forget removing flags when beta features turned stable.

- [#77](https://github.com/magicbell-io/magicbell-js/pull/77) [`9f4be9a`](https://github.com/magicbell-io/magicbell-js/commit/9f4be9ace0123ce8de710b8af4683d5a3c0b27fe) Thanks [@smeijer](https://github.com/smeijer)! - return the full response data from users.push_subscriptions.list()

## 1.4.3

### Patch Changes

- [#75](https://github.com/magicbell-io/magicbell-js/pull/75) [`14c30fe`](https://github.com/magicbell-io/magicbell-js/commit/14c30fe7855adf55096f4a9f8a63f1f4240f6dac) Thanks [@smeijer](https://github.com/smeijer)! - fix: handle network level request errors

## 1.4.2

### Patch Changes

- [#70](https://github.com/magicbell-io/magicbell-js/pull/70) [`3590285`](https://github.com/magicbell-io/magicbell-js/commit/3590285471b80559f20308e2bbccfd244f6682fa) Thanks [@smeijer](https://github.com/smeijer)! - fix: add types for listener close method

## 1.4.1

### Patch Changes

- [#68](https://github.com/magicbell-io/magicbell-js/pull/68) [`8ae8b38`](https://github.com/magicbell-io/magicbell-js/commit/8ae8b38189171188f78b767f63f4e34583abd6fb) Thanks [@smeijer](https://github.com/smeijer)! - fix typescript issue that showed arguments in camelCase vs snake_case.

## 1.4.0

### Minor Changes

- [#59](https://github.com/magicbell-io/magicbell-js/pull/59) [`6d7e434`](https://github.com/magicbell-io/magicbell-js/commit/6d7e4343d997ee845ad54b41cb9ca1171019764b) Thanks [@unamashana](https://github.com/unamashana)!
  - remove beta flag from `pushSubscriptions`
  - move `imports` method behind feature flag
  - add `users.list` method to list all users
  - add `users.fetch` method to fetch a single user
  - add `users.pushSubscriptions` resource to manage users push subscriptions
  - add `users.pushSubscriptions.list` method to list all push subscriptions for a user
  - add `users.pushSubscriptions.delete` method to delete a single push subscription for a user

## 1.3.0

### Minor Changes

- [#64](https://github.com/magicbell-io/magicbell-js/pull/64) [`1676fd3`](https://github.com/magicbell-io/magicbell-js/commit/1676fd3f5a93a8a5f8dd3319f84173e6d0b9df95) Thanks [@smeijer](https://github.com/smeijer)! - feat: support custom request headers

  Custom request headers can be used to decorate requests for logs and metrics or for example to instruct proxy servers.

  ```ts
  import MagicBell from 'magicbell';

  const magicbell = new MagicBell({
    apiKey: 'my-api-key',
    headers: {
      'X-Custom-Header': 'foo',
    },
  });
  ```

## 1.2.0

### Minor Changes

- [#56](https://github.com/magicbell-io/magicbell-js/pull/56) [`8139792`](https://github.com/magicbell-io/magicbell-js/commit/81397920b118f4d3dd9bda9153f931516f9f712c) Thanks [@smeijer](https://github.com/smeijer)! - feat: add close method to realtime listener

  ```ts
  const listener = magicbell.listen();

  listener.forEach((notification) => {
    console.log(notification.data.id);
  });

  // stop listening after 5 seconds
  setTimeout(() => {
    listener.close();
  }, 5_000);
  ```

## 1.1.0

### Minor Changes

- [#39](https://github.com/magicbell-io/magicbell-js/pull/39) [`68b2fbd`](https://github.com/magicbell-io/magicbell-js/commit/68b2fbd28fc1a0ca2b182611bc62fdc56a2e3f13) Thanks [@smeijer](https://github.com/smeijer)! - Add support for usage in browsers.

  - Stop tracking `client-id`. Client id was a random token stored on the filesystem, so we could identify origins across session.
  - Don't generate HMAC if no `api-secret` is provided, or if HMAC is already provided via request options.
  - Export `createHmac`, a util that generates MagicBell compatible HMAC digests.

    ```js
    import { createHmac } from 'magicbell';
    createHmac(process.env.MAGICBELL_API_SECRET, user.email);
    ```

## 1.0.1

### Patch Changes

- [#29](https://github.com/magicbell-io/magicbell-js/pull/29) [`1640aef`](https://github.com/magicbell-io/magicbell-js/commit/1640aeff3f6158047883c999fa580202651b067b) Thanks [@smeijer](https://github.com/smeijer)! - fix: be forgiving about `undefined` arguments

## 1.0.0

### Major Changes

- [#27](https://github.com/magicbell-io/magicbell-js/pull/27) [`c698320`](https://github.com/magicbell-io/magicbell-js/commit/c69832021cba9a0686a14be22dd7f46c613b954d) Thanks [@smeijer](https://github.com/smeijer)! - improve types for `notifications`, `push-subscriptions`, `imports` and `users` resources.

## 0.3.0

### Minor Changes

- [#22](https://github.com/magicbell-io/magicbell-js/pull/22) [`366adc6`](https://github.com/magicbell-io/magicbell-js/commit/366adc6af3ee2d198f5f9ad3507deee93dd88ebb) Thanks [@smeijer](https://github.com/smeijer)! - Add the `magicbell.imports` resource to import users in bulk, and query the status of import jobs. Methods that have been made available are `magicbell.imports.create` and `magicbell.imports.get`.

  See [#imports](https://github.com/magicbell-io/magicbell-js/blob/main/packages/magicbell/README.md#imports) for more information.

- [#24](https://github.com/magicbell-io/magicbell-js/pull/24) [`6cf938c`](https://github.com/magicbell-io/magicbell-js/commit/6cf938c384ea4db6e3260f8c35f9af762edc48a7) Thanks [@smeijer](https://github.com/smeijer)! - Released the `.listen` method. With this method you can listen to server sent events in realtime. For example, to do something when new notifications come in, or to trigger an event when a user marks a notification as read.

  The following events are currently emitted. Please note that all events are bound to a specific user. See [#realtime](https://github.com/magicbell-io/magicbell-js/blob/main/packages/magicbell/README.md#realtime) for more information.

  | event.name               | description                                |
  | ------------------------ | ------------------------------------------ |
  | `notifications/new`      | a new notification has been created        |
  | `notifications/read`     | a notification has been read               |
  | `notifications/unread`   | a notification has been marked as unread   |
  | `notifications/delete`   | a notification has been deleted            |
  | `notifications/read/all` | all notifications have been marked as read |
  | `notifications/seen/all` | all notifications have been marked as seen |

- [#16](https://github.com/magicbell-io/magicbell-js/pull/16) [`615b2fa`](https://github.com/magicbell-io/magicbell-js/commit/615b2faa558c19a2a50c0cb2b67b95ad3b5e68e3) Thanks [@smeijer](https://github.com/smeijer)! - Loads the axios http adapter when `XMLHttpRequest` is unsupported. This allows `magicbell` to be used in for example vscode extensions.

  - Don't persist config if `os.homedir` is unavailable, which is for example the case in vscode extensions.
  - Add support for authentication using `x-magicbell-user-external-id` header.
  - Allow specifying the `userKey`. This allows users to use `magicbell`, without the need to provide the `apiSecret` key to generate the HMAC at runtime.

- [#25](https://github.com/magicbell-io/magicbell-js/pull/25) [`13ee1d2`](https://github.com/magicbell-io/magicbell-js/commit/13ee1d242baddc97c0eabd3bf49867c3280432c5) Thanks [@smeijer](https://github.com/smeijer)! - Add type coverage to all resource methods.

  - Payload and Response types are driven by json schemas, which are stored under `/schemas`.
  - Requests now use the `accept-version: v2` header, so we use the latest version of our preferences api.
  - Failed requests now log a curl command when `debug: true` is provided to the client.
  - Requests no longer include empty headers.
  - Requests no longer include empty wrapping entities in the body.

- [#23](https://github.com/magicbell-io/magicbell-js/pull/23) [`bb857a7`](https://github.com/magicbell-io/magicbell-js/commit/bb857a738d5abfda805fecdd1154027a8077d3ed) Thanks [@smeijer](https://github.com/smeijer)! - Add the `magicbell.pushSubscriptions` resource to manage mobile devices / push subscriptions. Methods that have been made available are `magicbell.pushSubscriptions.create` and `magicbell.pushSubscriptions.delete`. Note that these methods are currently in beta, and need to be enabled via [feature flags](https://github.com/magicbell-io/magicbell-js/tree/main/packages/magicbell#feature-flags).

  See [#pushSubscriptions](https://github.com/magicbell-io/magicbell-js/blob/main/packages/magicbell/README.md#pushSubscriptions) for more information.

## 0.2.0

### Minor Changes

- [`3c04a70`](https://github.com/magicbell-io/magicbell-js/commit/3c04a70972a4983b5bd07bc62c4aa7ddd2607106) Thanks [@smeijer](https://github.com/smeijer)! - rename `.retrieve()` methods to `.get()` and remove pushSubscriptions for the time being.

## 0.1.0

### Minor Changes

- [`29c4bca`](https://github.com/magicbell-io/magicbell-js/commit/29c4bca92847ad5975b03ab006835a2210b2842f) Thanks [@smeijer](https://github.com/smeijer)! - Added the `magicbell` package - an api wrapper for node. Please see the readme at [packages/magicbell](https://github.com/magicbell-io/magicbell-js/tree/main/packages/magicbell) for more.
