# @magicbell/webpush

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
