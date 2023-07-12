# @magicbell/webpush

## 1.3.0

### Minor Changes

- [#155](https://github.com/magicbell-io/magicbell-js/pull/155) [`2c7ba0c`](https://github.com/magicbell-io/magicbell-js/commit/2c7ba0c652317b626708561c1436f0439efe22fd) Thanks [@moxley01](https://github.com/moxley01)! - Adds an 'isSubscribed' method that checks if the user is subscribed to push notifications in the current browser, e.g.

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

## 1.2.0

### Minor Changes

- [#126](https://github.com/magicbell-io/magicbell-js/pull/126) [`03f2d30`](https://github.com/magicbell-io/magicbell-js/commit/03f2d3077a8e2affd02c8f2eb9e67253e793bb63) Thanks [@smeijer](https://github.com/smeijer)! - Added warmup method to speedup subscription process. By prefetching config, you'll separate the subscription from config fetching, and thereby reduce the time to subscribe, which improves the user experience.

  ```js
  import { prefetchConfig } from '@magicbell/webpush';

  prefetchConfig({
    token: 'jwt-token',
    host: 'https://api.magicbell.com',
    project: 'string',
    serviceWorkerPath: '/sw.js',
  });
  ```

## 1.1.0

### Minor Changes

- [#121](https://github.com/magicbell-io/magicbell-js/pull/121) [`4e567b9`](https://github.com/magicbell-io/magicbell-js/commit/4e567b93c231975caf941c8daf5d64ea92db5aff) Thanks [@smeijer](https://github.com/smeijer)! - Remove support for Safari's proprietary push notification protocol.

## 1.0.0

### Major Changes

- [#119](https://github.com/magicbell-io/magicbell-js/pull/119) [`549c8a9`](https://github.com/magicbell-io/magicbell-js/commit/549c8a911bdb8bb4467c90398de6d130451be818) Thanks [@smeijer](https://github.com/smeijer)! - feat: add `registerServiceWorker` method that can be used to register a service
  worker, prior to calling `subscribe`. This preflight allows for a faster
  subscription process.

  Registration will be skipped if a service worker is already registered. In which
  case, the active registration will be returned.

  The returned promise resolves when the registration is ready.

  ```js
  import { registerServiceWorker } from '@magicbell/webpush';
  registerServiceWorker({ path: '/sw.js' });
  ```

  **NOTE:**

  This milestone also marks the `@magicbell/webpush` as stable. We will be following
  [semantic versioning](https://semver.org/) going forward.

## 0.1.3

### Patch Changes

- [#104](https://github.com/magicbell-io/magicbell-js/pull/104) [`6454a1b`](https://github.com/magicbell-io/magicbell-js/commit/6454a1b0cb1de65e700bc065ab89c41f0e5c549a) Thanks [@smeijer](https://github.com/smeijer)! - fix: use jwt token for post request

## 0.1.2

### Patch Changes

- [`2dbd982`](https://github.com/magicbell-io/magicbell-js/commit/2dbd982b750736809525a00d083f06b5fe9cb9e2) Thanks [@smeijer](https://github.com/smeijer)! - fix: correct project param

## 0.1.1

### Patch Changes

- [#99](https://github.com/magicbell-io/magicbell-js/pull/99) [`028456a`](https://github.com/magicbell-io/magicbell-js/commit/028456a1acd4a7e9487aa991d0e9e8da43f344ba) Thanks [@smeijer](https://github.com/smeijer)! - fix: include project param in subscribe method

## 0.1.0

### Minor Changes

- [#93](https://github.com/magicbell-io/magicbell-js/pull/93) [`5eeee58`](https://github.com/magicbell-io/magicbell-js/commit/5eeee58ef8f92a68bbe3d0407f1630d5531074ec) Thanks [@smeijer](https://github.com/smeijer)! - Publish `@magicbell/webpush`, this package provides a convenient interface to subscribe to browser/web push notifications using [MagicBell](https://magicbell.com).

  ```js
  import { subscribe } from '@magicbell/webpush';

  subscribe({
    token: 'jwt-token',
  });
  ```
