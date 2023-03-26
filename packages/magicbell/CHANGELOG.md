# magicbell

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
