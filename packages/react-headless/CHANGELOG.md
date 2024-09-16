# @magicbell/react-headless

## 5.0.2

### Patch Changes

- Updated dependencies [[`71815e7`](https://github.com/magicbell/magicbell-js/commit/71815e770145bbd1efc81b041f6d5d6a968033dc)]:
  - magicbell@4.1.0

## 5.0.1

### Patch Changes

- [#370](https://github.com/magicbell/magicbell-js/pull/370) [`f8e51c3`](https://github.com/magicbell/magicbell-js/commit/f8e51c3ff0abf4bb9a37937d79a15075d61f21df) Thanks [@smeijer](https://github.com/smeijer)! - return categories and category channels from useNotificationPreferences hook in stable order

## 5.0.0

### Major Changes

- [#361](https://github.com/magicbell/magicbell-js/pull/361) [`e5027a8`](https://github.com/magicbell/magicbell-js/commit/e5027a817d7e85d3291099e4df93bd5b409be44b) Thanks [@smeijer](https://github.com/smeijer)! - **Breaking Change**!

  We've renamed the `categories` property to `category` and the `topics` property to `topic`, to reflect that these properties only support a single value. We haven't been supporting multiple categories or topics for a while now, and believe that renaming this property is the right thing to do. It requires a small change on your end, but the clear naming reduces the number of potential bugs caused by misunderstanding.

  If you make use of different stores or filters using the `categories` or `topics` properties, you'll need to rename them to their singular variants.

  ```diff
  import { MagicBellProvider } from '@magicbell/react-headless';

  const stores = [
    { id: 'default', defaultQueryParams: {} },
    { id: 'unread', defaultQueryParams: { read: false } },
  - { id: 'billing', defaultQueryParams: { categories: ['billing'] } },
  + { id: 'billing', defaultQueryParams: { category: 'billing' } },
  - { id: 'support', defaultQueryParams: { topics: ['support'] } },
  + { id: 'support', defaultQueryParams: { topic: 'support' } },
  ];

  export default function Index({ children }) {
    return (
      <MagicBellProvider
        apiKey="__MAGICBELL_API_KEY__"
        userEmail="__MAGICBELL_USER_EMAIL__"
        userKey="__MAGICBELL_USER_KEY__"
        stores={stores}
      >
        {children}
      </MagicBell>
    );
  }
  ```

### Patch Changes

- Updated dependencies [[`95bd18d`](https://github.com/magicbell/magicbell-js/commit/95bd18dd99be576321a947cacad407679501385a), [`13e54bc`](https://github.com/magicbell/magicbell-js/commit/13e54bcea17510814685c32bc6cd0f6f34b360d6), [`39832a3`](https://github.com/magicbell/magicbell-js/commit/39832a3f5d35ee4c3aba7b0788a7cfc893c07b08), [`e5027a8`](https://github.com/magicbell/magicbell-js/commit/e5027a817d7e85d3291099e4df93bd5b409be44b)]:
  - magicbell@4.0.0

## 4.5.6

### Patch Changes

- Updated dependencies [[`e439f60`](https://github.com/magicbell/magicbell-js/commit/e439f60567e987d692eebea503ba2569ab94f54a), [`2e3e7de`](https://github.com/magicbell/magicbell-js/commit/2e3e7de2ac9b29b0cec91db31b6164d299d431ca)]:
  - magicbell@3.3.0

## 4.5.5

### Patch Changes

- [#311](https://github.com/magicbell/magicbell-js/pull/311) [`eb8e699`](https://github.com/magicbell/magicbell-js/commit/eb8e699d5c9402924368d39fa917978fac24637c) Thanks [@smeijer](https://github.com/smeijer)! - update repository in package.json

- Updated dependencies [[`eb8e699`](https://github.com/magicbell/magicbell-js/commit/eb8e699d5c9402924368d39fa917978fac24637c)]:
  - magicbell@3.2.1

## 4.5.4

### Patch Changes

- [#292](https://github.com/magicbell/magicbell-js/pull/292) [`95a4d26`](https://github.com/magicbell/magicbell-js/commit/95a4d26d37f8fe88ebfdaf2f5f28ce77c4f441e7) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `zustand` to `^4.5.2`.

- Updated dependencies [[`feb3dd6`](https://github.com/magicbell/magicbell-js/commit/feb3dd69260d58e7ec0afa2c59b9466cfdfa7101)]:
  - magicbell@3.2.0

## 4.5.3

### Patch Changes

- Updated dependencies [[`c16e604`](https://github.com/magicbell/magicbell-js/commit/c16e6040dfe8268f41a592c50a4c1aa2caad7189)]:
  - magicbell@3.1.4

## 4.5.2

### Patch Changes

- Updated dependencies [[`3982658`](https://github.com/magicbell/magicbell-js/commit/3982658e38647dccf8e8d1e2c39b44844df74e60)]:
  - magicbell@3.1.3

## 4.5.1

### Patch Changes

- Updated dependencies [[`30ed933`](https://github.com/magicbell/magicbell-js/commit/30ed93388b2b5018bd0224892be69028a7632245)]:
  - magicbell@3.1.2

## 4.5.0

### Minor Changes

- [#243](https://github.com/magicbell/magicbell-js/pull/243) [`e6f514e`](https://github.com/magicbell/magicbell-js/commit/e6f514e008d5300ce8a7ba192dbb3a9aed137206) Thanks [@smeijer](https://github.com/smeijer)! - Add archive and unarchive utilities to the `useNotification` hook.

  ```js
  const notification = useNotification(data);

  await notification.archive();
  await notification.unarchive();
  ```

  Archived notifications are not included in the default notification store. Create a separate store for archived notifications if you want to display them.

  ```tsx
  const stores = [
    { id: 'default', defaultQueryParams: {} },
    { id: 'archived', defaultQueryParams: { archived: true } },
  ];

  const tabs = [
    { storeId: 'default', label: 'Latest' },
    { storeId: 'archived', label: 'Archive' },
  ];

  export default function Index() {
    return (
      <MagicBell apiKey="__MAGICBELL_API_KEY__" userEmail="__MAGICBELL_USER_EMAIL__" stores={stores}>
        {(props) => <FloatingNotificationInbox height={450} tabs={tabs} {...props} />}
      </MagicBell>
    );
  }
  ```

### Patch Changes

- [#246](https://github.com/magicbell/magicbell-js/pull/246) [`ce7bc6f`](https://github.com/magicbell/magicbell-js/commit/ce7bc6fb02e54f68e2f0dbd1545b53af9354a079) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `react` to `>= 18.2.0`.
  - updated `react-dom` to `^18.2.0`.

- [`464b168`](https://github.com/magicbell/magicbell-js/commit/464b168994ab8927f1d79e2c8c75d7c496608591) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `tslib` to `^2.6.2`.

- Updated dependencies [[`840263b`](https://github.com/magicbell/magicbell-js/commit/840263bd2921abc46d62732d5188c71a9fecf675), [`aee799d`](https://github.com/magicbell/magicbell-js/commit/aee799deebd15f904153cbc4a7c3ff5dca9accc4)]:
  - magicbell@3.1.1

## 4.4.9

### Patch Changes

- Updated dependencies [[`8bee76e`](https://github.com/magicbell/magicbell-js/commit/8bee76eff4f35a55c5b50e25c0f143bd49c5ae3e), [`1041cdf`](https://github.com/magicbell/magicbell-js/commit/1041cdf10f7ae87413ca5c00236d8a9ac8d33183)]:
  - magicbell@3.1.0

## 4.4.8

### Patch Changes

- [`1ed7ce5`](https://github.com/magicbell/magicbell-js/commit/1ed7ce52f27569e06878d6fcac42531055b57fc1) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@size-limit/preset-small-lib` to `^8.2.6`.

- [`aa44b32`](https://github.com/magicbell/magicbell-js/commit/aa44b32184e05526a5b0b1af6fa5f580d322aefe) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@types/react` to `^18.2.39`.
  - updated `@types/react-dom` to `^18.2.17`.
  - updated `react` to `>= 16.14.0`.

- [`184de06`](https://github.com/magicbell/magicbell-js/commit/184de06495eeb2643916246c31ea25250da3fabb) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `size-limit` to `^8.2.6`.

- [`8649b12`](https://github.com/magicbell/magicbell-js/commit/8649b122832af97b250471fc2ee54b0977cf0027) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `babel-loader` to `^8.3.0`.

- Updated dependencies [[`1ed7ce5`](https://github.com/magicbell/magicbell-js/commit/1ed7ce52f27569e06878d6fcac42531055b57fc1), [`5a3443f`](https://github.com/magicbell/magicbell-js/commit/5a3443f814323352b35eab36d87dbf9e3aa1cba0), [`33d2cab`](https://github.com/magicbell/magicbell-js/commit/33d2cabca427e4ea9bc00b2e6304b57d6b7191f6), [`444e653`](https://github.com/magicbell/magicbell-js/commit/444e653a435255d5ffcd10257f595cf496e3d1c8)]:
  - magicbell@3.0.1

## 4.4.7

### Patch Changes

- [`9be10f5`](https://github.com/magicbell/magicbell-js/commit/9be10f5f641888f4431b8c112155c5b9b3f0731b) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.202`.

- [`d29b034`](https://github.com/magicbell/magicbell-js/commit/d29b034767ba539164b330f0b3fd94822b8817ff) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `rosie` to `^2.1.1`.

## 4.4.6

### Patch Changes

- [#210](https://github.com/magicbell/magicbell-js/pull/210) [`9280ca7`](https://github.com/magicbell/magicbell-js/commit/9280ca79f6a51936cccaeb61cb78f0eabfb5c656) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/rosie` to `^0.0.45`.

- [`d199c74`](https://github.com/magicbell/magicbell-js/commit/d199c74d38c4dfe6e7d0bdcf63a4e8e19da9dda9) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.201`.

## 4.4.5

### Patch Changes

- [#200](https://github.com/magicbell/magicbell-js/pull/200) [`ef5248c`](https://github.com/magicbell/magicbell-js/commit/ef5248ce58525ac9f7113a5070822945b18a67cc) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/humps` to `^2.0.6`.

- [#207](https://github.com/magicbell/magicbell-js/pull/207) [`f694679`](https://github.com/magicbell/magicbell-js/commit/f6946794d559d7479288616dd69ae7d20d857ab8) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `tiny-invariant` to `^1.3.1`.

- Updated dependencies [[`62eae8f`](https://github.com/magicbell/magicbell-js/commit/62eae8f23ac7bbcdc3a600d514969bd7ba459722), [`62eae8f`](https://github.com/magicbell/magicbell-js/commit/62eae8f23ac7bbcdc3a600d514969bd7ba459722)]:
  - magicbell@3.0.0

## 4.4.4

### Patch Changes

- Updated dependencies [[`5c8f4c9`](https://github.com/magicbell/magicbell-js/commit/5c8f4c902294c68a002d55c2e3ee340ffb30758c)]:
  - magicbell@2.4.1

## 4.4.3

### Patch Changes

- [#191](https://github.com/magicbell/magicbell-js/pull/191) [`9c30c22`](https://github.com/magicbell/magicbell-js/commit/9c30c22f9f0a7e9facf10e89d8777a1eed4ce03d) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/rosie` to `^0.0.43`.

## 4.4.2

### Patch Changes

- Updated dependencies [[`725ab1a`](https://github.com/magicbell/magicbell-js/commit/725ab1ad14619341beee9d4422da9ecce27a7e7e)]:
  - magicbell@2.4.0

## 4.4.1

### Patch Changes

- Updated dependencies [[`c6054af`](https://github.com/magicbell/magicbell-js/commit/c6054afd4db0879b51ee4142d8295766cf983043)]:
  - magicbell@2.3.1

## 4.4.0

### Minor Changes

- [#185](https://github.com/magicbell/magicbell-js/pull/185) [`78b62cb`](https://github.com/magicbell/magicbell-js/commit/78b62cb571aba9d5eeb96015491b1cfbbb1c7fb8) Thanks [@smeijer](https://github.com/smeijer)! - Listen to realtime events using SSE, and drop the Ably dependency

### Patch Changes

- [#188](https://github.com/magicbell/magicbell-js/pull/188) [`f12d410`](https://github.com/magicbell/magicbell-js/commit/f12d4107bca195936832a466ec846fe0b657871a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `dayjs` to `^1.11.10`.

## 4.3.2

### Patch Changes

- [`79d3019`](https://github.com/magicbell/magicbell-js/commit/79d3019482c53644e44b016b41bad723ddd1bd49) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `immer` to `^9.0.21`.

- [`0a40f2d`](https://github.com/magicbell/magicbell-js/commit/0a40f2d5f4eded31784caf7476771b90694684f2) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.198`.

- [`6159725`](https://github.com/magicbell/magicbell-js/commit/6159725eddf22be5787ae1441131ef7aad97632e) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@types/humps` to `^2.0.4`.

- [`ffb1b21`](https://github.com/magicbell/magicbell-js/commit/ffb1b213607f1ba5ff0d86c9478d758f89924a68) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `sinon` to `^13.0.2`.

- [`f83b52c`](https://github.com/magicbell/magicbell-js/commit/f83b52ccec1bf7479709252ccdda83522e736840) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `mitt` to `^3.0.1`.

- [#179](https://github.com/magicbell/magicbell-js/pull/179) [`cda7f21`](https://github.com/magicbell/magicbell-js/commit/cda7f215d8d5cc71faf150ebc6843805a1572fb5) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `ably` to `^1.2.44`.

- [`5088009`](https://github.com/magicbell/magicbell-js/commit/50880093f31b88e34a74d2f75b7860de1ac4b88d) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `dayjs` to `^1.11.9`.

- Updated dependencies [[`3f7ab5a`](https://github.com/magicbell/magicbell-js/commit/3f7ab5a532ec5c02e7f8ff41261548c0accd78ca)]:
  - magicbell@2.3.0

## 4.3.1

### Patch Changes

- Updated dependencies [[`1f40263`](https://github.com/magicbell/magicbell-js/commit/1f40263c112dcf5a05cac3d59661c7b8ddc41858)]:
  - magicbell@2.2.0

## 4.3.0

### Minor Changes

- [#168](https://github.com/magicbell/magicbell-js/pull/168) [`ce6ecc2`](https://github.com/magicbell/magicbell-js/commit/ce6ecc2cb207effe9755ea1883f696dcf5d5aad5) Thanks [@smeijer](https://github.com/smeijer)! - Use `magicbell` client for api requests. This change includes the addition of automatic retry of failed requests. Requests are retried up to 3 times with exponential backoff.

### Patch Changes

- [#168](https://github.com/magicbell/magicbell-js/pull/168) [`ce6ecc2`](https://github.com/magicbell/magicbell-js/commit/ce6ecc2cb207effe9755ea1883f696dcf5d5aad5) Thanks [@smeijer](https://github.com/smeijer)! - Mark `apiKey` and either `userEmail` or `userExternalId` as required. Note that this is an update in type definitions only, the implementation is not changed.

- [#166](https://github.com/magicbell/magicbell-js/pull/166) [`b835ff3`](https://github.com/magicbell/magicbell-js/commit/b835ff33aa3f19d1855d69235db70ff4774c2770) Thanks [@smeijer](https://github.com/smeijer)! - Removed `apiSecret` from `ClientSettings`.

- [#166](https://github.com/magicbell/magicbell-js/pull/166) [`b835ff3`](https://github.com/magicbell/magicbell-js/commit/b835ff33aa3f19d1855d69235db70ff4774c2770) Thanks [@smeijer](https://github.com/smeijer)! - Removed index signature from `QueryParams`, so TypeScript will properly warn about misspelled options.

- Updated dependencies [[`998008a`](https://github.com/magicbell/magicbell-js/commit/998008a04f40833954ec9a47bfe447989f7079aa), [`24c00f4`](https://github.com/magicbell/magicbell-js/commit/24c00f400f571ab0518f3ece7601f99360f85f68), [`998008a`](https://github.com/magicbell/magicbell-js/commit/998008a04f40833954ec9a47bfe447989f7079aa), [`998008a`](https://github.com/magicbell/magicbell-js/commit/998008a04f40833954ec9a47bfe447989f7079aa), [`ce6ecc2`](https://github.com/magicbell/magicbell-js/commit/ce6ecc2cb207effe9755ea1883f696dcf5d5aad5), [`666d2bb`](https://github.com/magicbell/magicbell-js/commit/666d2bbefe2365b6691607a38514d51d302e8248)]:
  - magicbell@2.1.0

## 4.2.8

### Patch Changes

- [#153](https://github.com/magicbell/magicbell-js/pull/153) [`6aa5cee`](https://github.com/magicbell/magicbell-js/commit/6aa5cee31e0a413207007803e7ad6a109a664cd8) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.195`.

## 4.2.7

### Patch Changes

- [#110](https://github.com/magicbell/magicbell-js/pull/110) [`c030ce4`](https://github.com/magicbell/magicbell-js/commit/c030ce41e094c19b62cbabbbe62f8e3b0ceeb31f) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@faker-js/faker` to `^6.3.1`.

- [#111](https://github.com/magicbell/magicbell-js/pull/111) [`8987a92`](https://github.com/magicbell/magicbell-js/commit/8987a92fe0d48999514228d09a2c89cfcc6e4716) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.194`.

- [#117](https://github.com/magicbell/magicbell-js/pull/117) [`5bd3ac7`](https://github.com/magicbell/magicbell-js/commit/5bd3ac767602d06409dafcd9a144e5c18fbfd55c) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `twind` to `^0.16.19`.

## 4.2.6

### Patch Changes

- [`fbbbae7`](https://github.com/magicbell/magicbell-js/commit/fbbbae744e0b39b9caca32fd329b148709749529) Thanks [@smeijer](https://github.com/smeijer)! - deps: bump ably to 1.2.39 to fix CVE-2022-33987

## 4.2.5

### Patch Changes

- [#73](https://github.com/magicbell/magicbell-js/pull/73) [`6eb5705`](https://github.com/magicbell/magicbell-js/commit/6eb5705c502ab64caa32ce1d5ffa79d1fd671b06) Thanks [@SuzukiRyuichiro](https://github.com/SuzukiRyuichiro)! - Fix example in docs for `useBell`, to provide `storeId` via an options object.

## 4.2.4

### Patch Changes

- [#43](https://github.com/magicbell/magicbell-js/pull/43) [`d9d2318`](https://github.com/magicbell/magicbell-js/commit/d9d23180be66f0487b12c71440eb1cf1bbcb41c9) Thanks [@rollacaster](https://github.com/rollacaster)! - fix: initialize stores in an effect instead of lazy use-state.

  This solves an "cannot update component" warning that was thrown in development mode.

## 4.2.3

### Patch Changes

- [#26](https://github.com/magicbell/magicbell-js/pull/26) [`2f295b0`](https://github.com/magicbell/magicbell-js/commit/2f295b0a02bf735e0f594f0bd0985b1523615ac7) Thanks [@smeijer](https://github.com/smeijer)! - Remove react-dom from peer-dependencies, so we don't cause trouble in react-native projects.

## 4.2.2

### Patch Changes

- [#7](https://github.com/magicbell/magicbell-js/pull/7) [`7712e28`](https://github.com/magicbell/magicbell-js/commit/7712e28911718b9585ebe0bee72d22f14fc137d1) Thanks [@smeijer](https://github.com/smeijer)! - ensure that stores are updated to include or remove notification after an mark-all-read action.

- [#8](https://github.com/magicbell/magicbell-js/pull/8) [`6a812ca`](https://github.com/magicbell/magicbell-js/commit/6a812ca48dc2e250260cd24967724f560f6415fd) Thanks [@smeijer](https://github.com/smeijer)! - ensure that stores are updated to include or remove notification after an mark-all-seen action.

## 4.2.1

### Patch Changes

- [`36d7ef7`](https://github.com/magicbell/magicbell-js/commit/36d7ef726317efac1cbe30a97afdf26c5a4e7cd5) Thanks [@smeijer](https://github.com/smeijer)! - ensure that the badge count doesn't drop below zero when clicking unread notifications.
