# @magicbell/webpush

## 0.1.0

### Minor Changes

- [#93](https://github.com/magicbell-io/magicbell-js/pull/93) [`5eeee58`](https://github.com/magicbell-io/magicbell-js/commit/5eeee58ef8f92a68bbe3d0407f1630d5531074ec) Thanks [@smeijer](https://github.com/smeijer)! - Publish `@magicbell/webpush`, this package provides a convenient interface to subscribe to browser/web push notifications using [MagicBell](https://magicbell.com).

  ```js
  import { subscribe } from '@magicbell/webpush';

  subscribe({
    token: 'jwt-token',
  });
  ```
