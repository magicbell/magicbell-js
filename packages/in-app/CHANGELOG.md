# @magicbell/in-app

## 0.2.7

### Patch Changes

- Updated dependencies [[`fc280e0`](https://github.com/magicbell/magicbell-js/commit/fc280e077a71a76b9b9f909d5ff4d21f39ff1746)]:
  - @magicbell/user-client@0.8.0

## 0.2.6

### Patch Changes

- Updated dependencies [[`6688f1c`](https://github.com/magicbell/magicbell-js/commit/6688f1ced10daa74d4953042fe7de12554d88156)]:
  - @magicbell/user-client@0.7.0

## 0.2.5

### Patch Changes

- Updated dependencies [[`5e06ee7`](https://github.com/magicbell/magicbell-js/commit/5e06ee7cc69dae3660a48cf80265462ff128c95e)]:
  - @magicbell/user-client@0.6.0

## 0.2.4

### Patch Changes

- Updated dependencies [[`e2e3a78`](https://github.com/magicbell/magicbell-js/commit/e2e3a78ac1f32ccca77a0c8604b85a534d9c0c5c)]:
  - @magicbell/user-client@0.5.0

## 0.2.3

### Patch Changes

- Updated dependencies [[`6900feb`](https://github.com/magicbell/magicbell-js/commit/6900febaedbad1e11828c1d87d40fed80b343d7e)]:
  - @magicbell/user-client@0.4.0

## 0.2.2

### Patch Changes

- [#357](https://github.com/magicbell/magicbell-js/pull/357) [`139cbb0`](https://github.com/magicbell/magicbell-js/commit/139cbb03633fbf83dcdd8fa92cb5f60dd0ea3531) Thanks [@smeijer](https://github.com/smeijer)! - updated to use new `@magicbell/user-client` version

- Updated dependencies [[`139cbb0`](https://github.com/magicbell/magicbell-js/commit/139cbb03633fbf83dcdd8fa92cb5f60dd0ea3531), [`036278a`](https://github.com/magicbell/magicbell-js/commit/036278ac94df336514454ecee4f5e4cdc1dc75da), [`8f20ec9`](https://github.com/magicbell/magicbell-js/commit/8f20ec9bbea55371b27cf59b22501dcbf758e8e1)]:
  - @magicbell/user-client@0.3.0

## 0.2.1

### Patch Changes

- [`ec38aee`](https://github.com/magicbell/magicbell-js/commit/ec38aee8acc69b263ae5a803fb46228a52a2501a) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `lit` to `^3.2.0`.

- [#338](https://github.com/magicbell/magicbell-js/pull/338) [`640c42c`](https://github.com/magicbell/magicbell-js/commit/640c42cf4d9aadc928fbaef452e4644ff7eccd7b) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@custom-elements-manifest/analyzer` to `^0.10.3`.

## 0.2.0

### Minor Changes

- [#329](https://github.com/magicbell/magicbell-js/pull/329) [`d99ef65`](https://github.com/magicbell/magicbell-js/commit/d99ef65ea3006281d7ca23e18edc703eabf5215b) Thanks [@smeijer](https://github.com/smeijer)! - This adds the `@magicbell/in-app` package, a component library for web browsers, which focuses on the MagicBell v2 API.

  Note that these are native web components. Frameworks that do not support web components on the server side need to be instructed to render the components on the client only.

  ```astro
  ---
  import '@magicbell/in-app/css/core.css';
  import '@magicbell/in-app/css/theme.css';
  import '@magicbell/in-app/components/mb-webpush-button.js';
  ---

  <mb-webpush-button access-token="{USER_AUTH_TOKEN}">subscribe</mb-webpush-button>
  ```

### Patch Changes

- Updated dependencies [[`78bb61d`](https://github.com/magicbell/magicbell-js/commit/78bb61d20108c7cc37ab67484cceb96a51a8d2c3)]:
  - @magicbell/user-client@0.2.0
