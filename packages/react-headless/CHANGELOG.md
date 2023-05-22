# @magicbell/react-headless

## 4.2.7

### Patch Changes

- [#110](https://github.com/magicbell-io/magicbell-js/pull/110) [`c030ce4`](https://github.com/magicbell-io/magicbell-js/commit/c030ce41e094c19b62cbabbbe62f8e3b0ceeb31f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@faker-js/faker` to `^6.3.1`.

- [#111](https://github.com/magicbell-io/magicbell-js/pull/111) [`8987a92`](https://github.com/magicbell-io/magicbell-js/commit/8987a92fe0d48999514228d09a2c89cfcc6e4716) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.194`.

- [#117](https://github.com/magicbell-io/magicbell-js/pull/117) [`5bd3ac7`](https://github.com/magicbell-io/magicbell-js/commit/5bd3ac767602d06409dafcd9a144e5c18fbfd55c) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `twind` to `^0.16.19`.

## 4.2.6

### Patch Changes

- [`fbbbae7`](https://github.com/magicbell-io/magicbell-js/commit/fbbbae744e0b39b9caca32fd329b148709749529) Thanks [@smeijer](https://github.com/smeijer)! - deps: bump ably to 1.2.39 to fix CVE-2022-33987

## 4.2.5

### Patch Changes

- [#73](https://github.com/magicbell-io/magicbell-js/pull/73) [`6eb5705`](https://github.com/magicbell-io/magicbell-js/commit/6eb5705c502ab64caa32ce1d5ffa79d1fd671b06) Thanks [@SuzukiRyuichiro](https://github.com/SuzukiRyuichiro)! - Fix example in docs for `useBell`, to provide `storeId` via an options object.

## 4.2.4

### Patch Changes

- [#43](https://github.com/magicbell-io/magicbell-js/pull/43) [`d9d2318`](https://github.com/magicbell-io/magicbell-js/commit/d9d23180be66f0487b12c71440eb1cf1bbcb41c9) Thanks [@rollacaster](https://github.com/rollacaster)! - fix: initialize stores in an effect instead of lazy use-state.

  This solves an "cannot update component" warning that was thrown in development mode.

## 4.2.3

### Patch Changes

- [#26](https://github.com/magicbell-io/magicbell-js/pull/26) [`2f295b0`](https://github.com/magicbell-io/magicbell-js/commit/2f295b0a02bf735e0f594f0bd0985b1523615ac7) Thanks [@smeijer](https://github.com/smeijer)! - Remove react-dom from peer-dependencies, so we don't cause trouble in react-native projects.

## 4.2.2

### Patch Changes

- [#7](https://github.com/magicbell-io/magicbell-js/pull/7) [`7712e28`](https://github.com/magicbell-io/magicbell-js/commit/7712e28911718b9585ebe0bee72d22f14fc137d1) Thanks [@smeijer](https://github.com/smeijer)! - ensure that stores are updated to include or remove notification after an mark-all-read action.

- [#8](https://github.com/magicbell-io/magicbell-js/pull/8) [`6a812ca`](https://github.com/magicbell-io/magicbell-js/commit/6a812ca48dc2e250260cd24967724f560f6415fd) Thanks [@smeijer](https://github.com/smeijer)! - ensure that stores are updated to include or remove notification after an mark-all-seen action.

## 4.2.1

### Patch Changes

- [`36d7ef7`](https://github.com/magicbell-io/magicbell-js/commit/36d7ef726317efac1cbe30a97afdf26c5a4e7cd5) Thanks [@smeijer](https://github.com/smeijer)! - ensure that the badge count doesn't drop below zero when clicking unread notifications.
