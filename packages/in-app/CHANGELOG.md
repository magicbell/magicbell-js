# @magicbell/in-app

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
