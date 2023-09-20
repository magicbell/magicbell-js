# @magicbell/react-headless

## 4.3.2

### Patch Changes

- [`79d3019`](https://github.com/magicbell-io/magicbell-js/commit/79d3019482c53644e44b016b41bad723ddd1bd49) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `immer` to `^9.0.21`.

- [`0a40f2d`](https://github.com/magicbell-io/magicbell-js/commit/0a40f2d5f4eded31784caf7476771b90694684f2) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.198`.

- [`6159725`](https://github.com/magicbell-io/magicbell-js/commit/6159725eddf22be5787ae1441131ef7aad97632e) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@types/humps` to `^2.0.4`.

- [`ffb1b21`](https://github.com/magicbell-io/magicbell-js/commit/ffb1b213607f1ba5ff0d86c9478d758f89924a68) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `sinon` to `^13.0.2`.

- [`f83b52c`](https://github.com/magicbell-io/magicbell-js/commit/f83b52ccec1bf7479709252ccdda83522e736840) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `mitt` to `^3.0.1`.

- [#179](https://github.com/magicbell-io/magicbell-js/pull/179) [`cda7f21`](https://github.com/magicbell-io/magicbell-js/commit/cda7f215d8d5cc71faf150ebc6843805a1572fb5) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `ably` to `^1.2.44`.

- [`5088009`](https://github.com/magicbell-io/magicbell-js/commit/50880093f31b88e34a74d2f75b7860de1ac4b88d) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `dayjs` to `^1.11.9`.

- Updated dependencies [[`3f7ab5a`](https://github.com/magicbell-io/magicbell-js/commit/3f7ab5a532ec5c02e7f8ff41261548c0accd78ca)]:
  - magicbell@2.3.0

## 4.3.1

### Patch Changes

- Updated dependencies [[`1f40263`](https://github.com/magicbell-io/magicbell-js/commit/1f40263c112dcf5a05cac3d59661c7b8ddc41858)]:
  - magicbell@2.2.0

## 4.3.0

### Minor Changes

- [#168](https://github.com/magicbell-io/magicbell-js/pull/168) [`ce6ecc2`](https://github.com/magicbell-io/magicbell-js/commit/ce6ecc2cb207effe9755ea1883f696dcf5d5aad5) Thanks [@smeijer](https://github.com/smeijer)! - Use `magicbell` client for api requests. This change includes the addition of automatic retry of failed requests. Requests are retried up to 3 times with exponential backoff.

### Patch Changes

- [#168](https://github.com/magicbell-io/magicbell-js/pull/168) [`ce6ecc2`](https://github.com/magicbell-io/magicbell-js/commit/ce6ecc2cb207effe9755ea1883f696dcf5d5aad5) Thanks [@smeijer](https://github.com/smeijer)! - Mark `apiKey` and either `userEmail` or `userExternalId` as required. Note that this is an update in type definitions only, the implementation is not changed.

- [#166](https://github.com/magicbell-io/magicbell-js/pull/166) [`b835ff3`](https://github.com/magicbell-io/magicbell-js/commit/b835ff33aa3f19d1855d69235db70ff4774c2770) Thanks [@smeijer](https://github.com/smeijer)! - Removed `apiSecret` from `ClientSettings`.

- [#166](https://github.com/magicbell-io/magicbell-js/pull/166) [`b835ff3`](https://github.com/magicbell-io/magicbell-js/commit/b835ff33aa3f19d1855d69235db70ff4774c2770) Thanks [@smeijer](https://github.com/smeijer)! - Removed index signature from `QueryParams`, so TypeScript will properly warn about misspelled options.

- Updated dependencies [[`998008a`](https://github.com/magicbell-io/magicbell-js/commit/998008a04f40833954ec9a47bfe447989f7079aa), [`24c00f4`](https://github.com/magicbell-io/magicbell-js/commit/24c00f400f571ab0518f3ece7601f99360f85f68), [`998008a`](https://github.com/magicbell-io/magicbell-js/commit/998008a04f40833954ec9a47bfe447989f7079aa), [`998008a`](https://github.com/magicbell-io/magicbell-js/commit/998008a04f40833954ec9a47bfe447989f7079aa), [`ce6ecc2`](https://github.com/magicbell-io/magicbell-js/commit/ce6ecc2cb207effe9755ea1883f696dcf5d5aad5), [`666d2bb`](https://github.com/magicbell-io/magicbell-js/commit/666d2bbefe2365b6691607a38514d51d302e8248)]:
  - magicbell@2.1.0

## 4.2.8

### Patch Changes

- [#153](https://github.com/magicbell-io/magicbell-js/pull/153) [`6aa5cee`](https://github.com/magicbell-io/magicbell-js/commit/6aa5cee31e0a413207007803e7ad6a109a664cd8) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.195`.

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
