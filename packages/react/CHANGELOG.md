# @magicbell/magicbell-react

## 11.5.0

### Minor Changes

- [#549](https://github.com/magicbell/magicbell-js/pull/549) [`f710971`](https://github.com/magicbell/magicbell-js/commit/f7109713acf554c82921a94d722a43c06befee94) Thanks [@smeijer](https://github.com/smeijer)! - This package is deprecated. Please use [`@magicbell/react`](https://www.magicbell.com/docs/libraries/magicbell-react) instead.

  ```diff
  - import MagicBell, { FloatingNotificationInbox } from '@magicbell/magicbell-react';
  + import Provider from "@magicbell/react/context-provider";
  + import FloatingInbox from "@magicbell/react/floating-inbox";

  function App(props: any) {
    return (
  -   <MagicBell apiKey={MAGICBELL_API_KEY} userEmail="john@example.com">
  -     {(props) => <FloatingNotificationInbox height={300} {...props} />}
  -   </MagicBell>,
  +   <Provider token="abc123">
  +     <FloatingInbox height={500} />
  +   </Provider>
    );
  }
  ```

### Patch Changes

- Updated dependencies [[`f710971`](https://github.com/magicbell/magicbell-js/commit/f7109713acf554c82921a94d722a43c06befee94), [`f710971`](https://github.com/magicbell/magicbell-js/commit/f7109713acf554c82921a94d722a43c06befee94)]:
  - @magicbell/react-headless@5.5.0
  - @magicbell/webpush@2.2.0

## 11.4.0

### Minor Changes

- [#536](https://github.com/magicbell/magicbell-js/pull/536) [`0e64ac5`](https://github.com/magicbell/magicbell-js/commit/0e64ac5677350f8b336830f7e15e795b98d8f9b1) Thanks [@smeijer](https://github.com/smeijer)! - The Badge is now capped at showing '99+' when there are 100 or more unread notifications.

## 11.3.2

### Patch Changes

- Updated dependencies []:
  - @magicbell/react-headless@5.4.2

## 11.3.1

### Patch Changes

- Updated dependencies []:
  - @magicbell/react-headless@5.4.1

## 11.3.0

### Minor Changes

- [#487](https://github.com/magicbell/magicbell-js/pull/487) [`e3cd22e`](https://github.com/magicbell/magicbell-js/commit/e3cd22e92b00aa6f64977bcb99395235dc6afdf2) Thanks [@smeijer](https://github.com/smeijer)! - We now expose the property to control the retries of failed network requests.
  `network.maxRetries` defaults to `3`. Setting it to `0` disables retries entirely.

  ```tsx
  import MagicBellProvider, { FloatingNotificationInbox } from '@magicbell/magicbell-react';

  function Component() {
    return (
      <MagicBellProvider apiKey="your-api-key" userEmail="you@example.com" network={{ maxRetries: 5 }}>
        {(props) => <FloatingNotificationInbox height={300} {...props} />}
      </MagicBellProvider>
    );
  }
  ```

- [#487](https://github.com/magicbell/magicbell-js/pull/487) [`e3cd22e`](https://github.com/magicbell/magicbell-js/commit/e3cd22e92b00aa6f64977bcb99395235dc6afdf2) Thanks [@smeijer](https://github.com/smeijer)! - Network requests are now deduped. You can control this behavior using the
  `network.cacheTTL` setting. Setting it to `0` disables caching entirely. The TTL
  defaults to one second. Meaning any identical request within that second shares
  the same Promise and thus outcome.

  ```tsx
  import MagicBellProvider, { FloatingNotificationInbox } from '@magicbell/magicbell-react';

  function Component() {
    return (
      <MagicBellProvider apiKey="your-api-key" userEmail="you@example.com" network={{ cacheTTL: 1_000 }}>
        {(props) => <FloatingNotificationInbox height={300} {...props} />}
      </MagicBellProvider>
    );
  }
  ```

### Patch Changes

- Updated dependencies [[`e3cd22e`](https://github.com/magicbell/magicbell-js/commit/e3cd22e92b00aa6f64977bcb99395235dc6afdf2), [`e3cd22e`](https://github.com/magicbell/magicbell-js/commit/e3cd22e92b00aa6f64977bcb99395235dc6afdf2)]:
  - @magicbell/react-headless@5.4.0

## 11.2.3

### Patch Changes

- [#473](https://github.com/magicbell/magicbell-js/pull/473) [`493487c`](https://github.com/magicbell/magicbell-js/commit/493487c0f0e1debda0953a03126791ed1cec40f2) Thanks [@smeijer](https://github.com/smeijer)! - maintain stable order when moving notifications between read/unread tabs

- Updated dependencies [[`0e8d41b`](https://github.com/magicbell/magicbell-js/commit/0e8d41bf764fc0e904d3022e2c536407c0164f5e), [`493487c`](https://github.com/magicbell/magicbell-js/commit/493487c0f0e1debda0953a03126791ed1cec40f2)]:
  - @magicbell/react-headless@5.3.0

## 11.2.2

### Patch Changes

- [#468](https://github.com/magicbell/magicbell-js/pull/468) [`506e929`](https://github.com/magicbell/magicbell-js/commit/506e9293e2014cdf4ffc3c96cd73a5442950a486) Thanks [@smeijer](https://github.com/smeijer)! - notifications are no longer marked as read when the notification menu is clicked

## 11.2.1

### Patch Changes

- Updated dependencies [[`748822c`](https://github.com/magicbell/magicbell-js/commit/748822ca48d48f9361364f78ce26e819cfa28d80)]:
  - @magicbell/react-headless@5.2.0

## 11.2.0

### Minor Changes

- [#457](https://github.com/magicbell/magicbell-js/pull/457) [`679f894`](https://github.com/magicbell/magicbell-js/commit/679f894a580003a17ee8d2fd14dcfac66341600f) Thanks [@smeijer](https://github.com/smeijer)! - We fixed an issue in arrow positioning and provided a new prop, `arrowPadding,` to adjust the arrow position, for example, to match the border radius.

  Provide the `offset` property, which accepts a `number` or an object with `mainAxis` and `crossAxis` properties, to position the inbox relative to its trigger.

  ```jsx
  <FloatingNotificationInbox height={450} placement="bottom-start" offset={24} arrowPadding={16} {...props} />
  ```

## 11.1.1

### Patch Changes

- [#440](https://github.com/magicbell/magicbell-js/pull/440) [`0b8f1f2`](https://github.com/magicbell/magicbell-js/commit/0b8f1f2daa2eb322a12e8bbc691cada7c4c205f9) Thanks [@smeijer](https://github.com/smeijer)! - ensure that clicking notification menu doesn't trigger action url

## 11.1.0

### Minor Changes

- [#395](https://github.com/magicbell/magicbell-js/pull/395) [`b6d0354`](https://github.com/magicbell/magicbell-js/commit/b6d03543f06264fc75d597d190f7038ca7c37e34) Thanks [@smeijer](https://github.com/smeijer)! - Improved cjs/esm support by moving our build system to tshy. This change includes switching the floating inbox positioning from `@tippyjs/react` to `@floating-ui/react`, as the former would make it impossible to properly support both cjs and esm.

  As part of this change, we no longer export internal properties like `popperOptions` or the internal `Popover` component.

### Patch Changes

- Updated dependencies [[`60d24da`](https://github.com/magicbell/magicbell-js/commit/60d24dae5b1dc786bc7a2ade4950c4043caa10f2), [`2131ee1`](https://github.com/magicbell/magicbell-js/commit/2131ee1beef4cf0dc6a90b5e5c8ca939de9ef41e)]:
  - @magicbell/react-headless@5.1.0
  - @magicbell/webpush@2.1.0

## 11.0.2

### Patch Changes

- Updated dependencies []:
  - @magicbell/react-headless@5.0.2

## 11.0.1

### Patch Changes

- [#370](https://github.com/magicbell/magicbell-js/pull/370) [`f8e51c3`](https://github.com/magicbell/magicbell-js/commit/f8e51c3ff0abf4bb9a37937d79a15075d61f21df) Thanks [@smeijer](https://github.com/smeijer)! - maintain order of categories and channels when updating notification preferences

- [#371](https://github.com/magicbell/magicbell-js/pull/371) [`8e08182`](https://github.com/magicbell/magicbell-js/commit/8e081822c33ebdadac5932d1ef075c4e1095ec3b) Thanks [@smeijer](https://github.com/smeijer)! - make sure that last category in notification preferences can be scrolled to

- Updated dependencies [[`f8e51c3`](https://github.com/magicbell/magicbell-js/commit/f8e51c3ff0abf4bb9a37937d79a15075d61f21df)]:
  - @magicbell/react-headless@5.0.1

## 11.0.0

### Major Changes

- [#361](https://github.com/magicbell/magicbell-js/pull/361) [`e5027a8`](https://github.com/magicbell/magicbell-js/commit/e5027a817d7e85d3291099e4df93bd5b409be44b) Thanks [@smeijer](https://github.com/smeijer)! - **Breaking Change**!

  We've renamed the `categories` property to `category` and the `topics` property to `topic`, to reflect that these properties only support a single value. We haven't been supporting multiple categories or topics for a while now, and believe that renaming this property is the right thing to do. It requires a small change on your end, but the clear naming reduces the number of potential bugs caused by misunderstanding.

  If you make use of different stores or tabs using the `categories` or `topics` properties, you'll need to rename them to their singular variants.

  ```diff
  import MagicBell, { FloatingNotificationInbox } from '@magicbell/magicbell-react';
  import React from 'react';

  const stores = [
    { id: 'default', defaultQueryParams: {} },
    { id: 'unread', defaultQueryParams: { read: false } },
  - { id: 'billing', defaultQueryParams: { categories: ['billing'] } },
  + { id: 'billing', defaultQueryParams: { category: 'billing' } },
  - { id: 'support', defaultQueryParams: { topics: ['support'] } },
  + { id: 'support', defaultQueryParams: { topic: 'support' } },
  ];

  const tabs = [
    { storeId: 'default', label: 'Latest' },
    { storeId: 'unread', label: 'Archive' },
    { storeId: 'billing', label: 'Billing' },
    { storeId: 'support', label: 'Issues' },
  ];

  export default function Index() {
    return (
      <MagicBell
        apiKey="__MAGICBELL_API_KEY__"
        userEmail="__MAGICBELL_USER_EMAIL__"
        userKey="__MAGICBELL_USER_KEY__"
        stores={stores}
      >
        {(props) => <FloatingNotificationInbox height={450} tabs={tabs} {...props} />}
      </MagicBell>
    );
  }
  ```

### Patch Changes

- Updated dependencies [[`e5027a8`](https://github.com/magicbell/magicbell-js/commit/e5027a817d7e85d3291099e4df93bd5b409be44b)]:
  - @magicbell/react-headless@5.0.0

## 10.11.8

### Patch Changes

- [`604cce2`](https://github.com/magicbell/magicbell-js/commit/604cce23a75cb352e714f9171d01316f9ac35951) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@babel/core` to `^7.25.2`.

## 10.11.7

### Patch Changes

- [#333](https://github.com/magicbell/magicbell-js/pull/333) [`ccb7feb`](https://github.com/magicbell/magicbell-js/commit/ccb7feb189b229c62d97006e77d562fdaf46ba5c) Thanks [@moxley01](https://github.com/moxley01)! - Fixes an issue whereby published inbox themes were not being retrieved.

## 10.11.6

### Patch Changes

- Updated dependencies []:
  - @magicbell/react-headless@4.5.6

## 10.11.5

### Patch Changes

- [#311](https://github.com/magicbell/magicbell-js/pull/311) [`eb8e699`](https://github.com/magicbell/magicbell-js/commit/eb8e699d5c9402924368d39fa917978fac24637c) Thanks [@smeijer](https://github.com/smeijer)! - update repository in package.json

- Updated dependencies [[`eb8e699`](https://github.com/magicbell/magicbell-js/commit/eb8e699d5c9402924368d39fa917978fac24637c)]:
  - @magicbell/react-headless@4.5.5
  - @magicbell/webpush@2.0.2

## 10.11.4

### Patch Changes

- [#292](https://github.com/magicbell/magicbell-js/pull/292) [`95a4d26`](https://github.com/magicbell/magicbell-js/commit/95a4d26d37f8fe88ebfdaf2f5f28ce77c4f441e7) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `zustand` to `^4.5.2`.

- Updated dependencies [[`95a4d26`](https://github.com/magicbell/magicbell-js/commit/95a4d26d37f8fe88ebfdaf2f5f28ce77c4f441e7)]:
  - @magicbell/react-headless@4.5.4

## 10.11.3

### Patch Changes

- Updated dependencies [[`2095743`](https://github.com/magicbell/magicbell-js/commit/2095743f23e5fe35da335dfaa84e6808616f58f1)]:
  - @magicbell/webpush@2.0.1

## 10.11.2

### Patch Changes

- Updated dependencies [[`7bea88f`](https://github.com/magicbell/magicbell-js/commit/7bea88f45389329261843d7b2e0fb8d06fe62078)]:
  - @magicbell/webpush@2.0.0
  - @magicbell/react-headless@4.5.3

## 10.11.1

### Patch Changes

- Updated dependencies []:
  - @magicbell/react-headless@4.5.2

## 10.11.0

### Minor Changes

- [`7e918d9`](https://github.com/magicbell/magicbell-js/commit/7e918d9a609c6300425cd87866db31dfe3e4e937) Thanks [@smeijer](https://github.com/smeijer)! - Include MagicBell as named export. These two are now the same:

  ```jsx
  import MagicBell from '@magicbell/magicbell-react';
  import { MagicBell } from '@magicbell/magicbell-react';
  ```

## 10.10.2

### Patch Changes

- Updated dependencies []:
  - @magicbell/react-headless@4.5.1

## 10.10.1

### Patch Changes

- Updated dependencies [[`b37ed53`](https://github.com/magicbell/magicbell-js/commit/b37ed530d35dc5060e05d2b588d255f8648cc865)]:
  - @magicbell/webpush@1.4.2

## 10.10.0

### Minor Changes

- [#240](https://github.com/magicbell/magicbell-js/pull/240) [`00451d2`](https://github.com/magicbell/magicbell-js/commit/00451d2d23cad54480f93ad8e3968921fd491559) Thanks [@smeijer](https://github.com/smeijer)! - Theme, locale, and image settings can now be published from the MagicBell dashboard, and will be automatically used by the inbox. This means you can now change the look and feel of the inbox without needing to change code.

  The behavior is backward compatible. Config is only applied after publishing from the dashboard, and properties provided to the MagicBell provider precede the published settings.

  In other words, to enable this new behavior for a current integration, you'll need to remove the `theme`, `locale`, and/or `images` properties from the `MagicBell` component and publish the settings from the dashboard.

  When all three props are provided, remote settings will not be fetched.

  ```tsx
  <MagicBell
    apiKey="..."
    userEmail="..."
    locale={customLocale}
    theme={{
      header: {
        backgroundColor: 'lightblue',
      },
    }}
    images={{}}
  >
    {(props) => <FloatingNotificationInbox height={450} {...props} isOpen />}
  </MagicBell>
  ```

### Patch Changes

- [`772bd16`](https://github.com/magicbell/magicbell-js/commit/772bd16862c3ae3202eb66f864cde0a66aee1489) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@emotion/cache` to `^11.11.0`.
  - updated `@emotion/react` to `^11.11.3`.

- [`805c275`](https://github.com/magicbell/magicbell-js/commit/805c275906c17e7f655722f153ccb991b5d594ca) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `react-use` to `^17.5.0`.

- [#246](https://github.com/magicbell/magicbell-js/pull/246) [`ce7bc6f`](https://github.com/magicbell/magicbell-js/commit/ce7bc6fb02e54f68e2f0dbd1545b53af9354a079) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `react` to `>= 18.2.0`.
  - updated `react-dom` to `^18.2.0`.

- [`464b168`](https://github.com/magicbell/magicbell-js/commit/464b168994ab8927f1d79e2c8c75d7c496608591) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `tslib` to `^2.6.2`.

- Updated dependencies [[`ce7bc6f`](https://github.com/magicbell/magicbell-js/commit/ce7bc6fb02e54f68e2f0dbd1545b53af9354a079), [`464b168`](https://github.com/magicbell/magicbell-js/commit/464b168994ab8927f1d79e2c8c75d7c496608591), [`e6f514e`](https://github.com/magicbell/magicbell-js/commit/e6f514e008d5300ce8a7ba192dbb3a9aed137206)]:
  - @magicbell/react-headless@4.5.0

## 10.9.11

### Patch Changes

- [`681ed7b`](https://github.com/magicbell/magicbell-js/commit/681ed7b45380812c3627baeb090d4d97b4ab2558) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `react-use` to `^17.4.2`.

- [`fdb6953`](https://github.com/magicbell/magicbell-js/commit/fdb695389abc7c881518ea746ad55e84cc90f83d) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `tinycolor2` to `^1.6.0`.

- Updated dependencies []:
  - @magicbell/react-headless@4.4.9

## 10.9.10

### Patch Changes

- [`1ed7ce5`](https://github.com/magicbell/magicbell-js/commit/1ed7ce52f27569e06878d6fcac42531055b57fc1) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@size-limit/preset-small-lib` to `^8.2.6`.

- [`aa44b32`](https://github.com/magicbell/magicbell-js/commit/aa44b32184e05526a5b0b1af6fa5f580d322aefe) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@types/react` to `^18.2.39`.
  - updated `@types/react-dom` to `^18.2.17`.
  - updated `react` to `>= 16.14.0`.

- [#223](https://github.com/magicbell/magicbell-js/pull/223) [`ec0fb02`](https://github.com/magicbell/magicbell-js/commit/ec0fb023e9c59452f5c05d9c1254b764aef98b21) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `typescript` to `^4.9.5`.

- [`184de06`](https://github.com/magicbell/magicbell-js/commit/184de06495eeb2643916246c31ea25250da3fabb) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `size-limit` to `^8.2.6`.

- [`7dbb225`](https://github.com/magicbell/magicbell-js/commit/7dbb225f654995e04eaacce6d67105f825f53857) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@babel/core` to `^7.23.5`.

- [`ab7782a`](https://github.com/magicbell/magicbell-js/commit/ab7782a7373fadd647bca138fa164b2a84d53639) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `react-use` to `^17.4.1`.

- Updated dependencies [[`1ed7ce5`](https://github.com/magicbell/magicbell-js/commit/1ed7ce52f27569e06878d6fcac42531055b57fc1), [`aa44b32`](https://github.com/magicbell/magicbell-js/commit/aa44b32184e05526a5b0b1af6fa5f580d322aefe), [`184de06`](https://github.com/magicbell/magicbell-js/commit/184de06495eeb2643916246c31ea25250da3fabb), [`8649b12`](https://github.com/magicbell/magicbell-js/commit/8649b122832af97b250471fc2ee54b0977cf0027)]:
  - @magicbell/react-headless@4.4.8

## 10.9.9

### Patch Changes

- [`9be10f5`](https://github.com/magicbell/magicbell-js/commit/9be10f5f641888f4431b8c112155c5b9b3f0731b) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.202`.

- [`d29b034`](https://github.com/magicbell/magicbell-js/commit/d29b034767ba539164b330f0b3fd94822b8817ff) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `rosie` to `^2.1.1`.

- Updated dependencies [[`9be10f5`](https://github.com/magicbell/magicbell-js/commit/9be10f5f641888f4431b8c112155c5b9b3f0731b), [`d29b034`](https://github.com/magicbell/magicbell-js/commit/d29b034767ba539164b330f0b3fd94822b8817ff)]:
  - @magicbell/react-headless@4.4.7

## 10.9.8

### Patch Changes

- [#210](https://github.com/magicbell/magicbell-js/pull/210) [`9280ca7`](https://github.com/magicbell/magicbell-js/commit/9280ca79f6a51936cccaeb61cb78f0eabfb5c656) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/rosie` to `^0.0.45`.

- [`d199c74`](https://github.com/magicbell/magicbell-js/commit/d199c74d38c4dfe6e7d0bdcf63a4e8e19da9dda9) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.201`.

- [`8649613`](https://github.com/magicbell/magicbell-js/commit/864961352717771f8676c87d793e2ab26720cd5d) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@types/sinon` to `^10.0.20`.

- Updated dependencies [[`ad7250e`](https://github.com/magicbell/magicbell-js/commit/ad7250edf64d2c80b3d80aa352dc9b32c83817b2), [`9280ca7`](https://github.com/magicbell/magicbell-js/commit/9280ca79f6a51936cccaeb61cb78f0eabfb5c656), [`d199c74`](https://github.com/magicbell/magicbell-js/commit/d199c74d38c4dfe6e7d0bdcf63a4e8e19da9dda9)]:
  - @magicbell/webpush@1.4.1
  - @magicbell/react-headless@4.4.6

## 10.9.7

### Patch Changes

- [#206](https://github.com/magicbell/magicbell-js/pull/206) [`22a17bb`](https://github.com/magicbell/magicbell-js/commit/22a17bb0d1ee8fdfb76ab139c4a9f1243a2280b5) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `react-use` to `^17.4.0`.

- [#207](https://github.com/magicbell/magicbell-js/pull/207) [`f694679`](https://github.com/magicbell/magicbell-js/commit/f6946794d559d7479288616dd69ae7d20d857ab8) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `tiny-invariant` to `^1.3.1`.

- [#205](https://github.com/magicbell/magicbell-js/pull/205) [`430ea0b`](https://github.com/magicbell/magicbell-js/commit/430ea0b48adf863a8a1abd19cc5575bb5397624c) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@babel/core` to `^7.23.3`.

- Updated dependencies [[`ef5248c`](https://github.com/magicbell/magicbell-js/commit/ef5248ce58525ac9f7113a5070822945b18a67cc), [`f694679`](https://github.com/magicbell/magicbell-js/commit/f6946794d559d7479288616dd69ae7d20d857ab8)]:
  - @magicbell/react-headless@4.4.5

## 10.9.6

### Patch Changes

- Updated dependencies []:
  - @magicbell/react-headless@4.4.4

## 10.9.5

### Patch Changes

- Updated dependencies [[`669e353`](https://github.com/magicbell/magicbell-js/commit/669e353af6facb124e1e608e23c69e46ff56a736), [`947f177`](https://github.com/magicbell/magicbell-js/commit/947f17789da9508f6ed561e1e6666964068e98ad)]:
  - @magicbell/webpush@1.4.0

## 10.9.4

### Patch Changes

- [#191](https://github.com/magicbell/magicbell-js/pull/191) [`9c30c22`](https://github.com/magicbell/magicbell-js/commit/9c30c22f9f0a7e9facf10e89d8777a1eed4ce03d) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/rosie` to `^0.0.43`.

- Updated dependencies [[`9c30c22`](https://github.com/magicbell/magicbell-js/commit/9c30c22f9f0a7e9facf10e89d8777a1eed4ce03d)]:
  - @magicbell/react-headless@4.4.3

## 10.9.3

### Patch Changes

- [#194](https://github.com/magicbell/magicbell-js/pull/194) [`12dbaed`](https://github.com/magicbell/magicbell-js/commit/12dbaed2ce4d8b19d7090b568a1ce0e9e510b1e6) Thanks [@smeijer](https://github.com/smeijer)! - Add `isOpen` prop to `MagicBell` provider, together with the existing `onToggle` prop, this allows for controlled open/closed states.

  ```tsx
  function App() {
    const [isOpen, setIsOpen] = React.useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen((open) => !open);

    return (
      <>
        <button type="button" onClick={open}>
          open
        </button>
        <button type="button" onClick={close}>
          close
        </button>
        <button type="button" onClick={toggle}>
          toggle
        </button>

        <MagicBell apiKey="__API_KEY__" userEmail="__USER_EMAIL__" onToggle={toggle} isOpen={isOpen}>
          {(props) => <FloatingNotificationInbox height={450} {...props} />}
        </MagicBell>
      </>
    );
  }
  ```

## 10.9.2

### Patch Changes

- Updated dependencies []:
  - @magicbell/react-headless@4.4.2

## 10.9.1

### Patch Changes

- [#189](https://github.com/magicbell/magicbell-js/pull/189) [`c6054af`](https://github.com/magicbell/magicbell-js/commit/c6054afd4db0879b51ee4142d8295766cf983043) Thanks [@smeijer](https://github.com/smeijer)! - support react strict mode

- Updated dependencies []:
  - @magicbell/react-headless@4.4.1

## 10.9.0

### Minor Changes

- [#185](https://github.com/magicbell/magicbell-js/pull/185) [`78b62cb`](https://github.com/magicbell/magicbell-js/commit/78b62cb571aba9d5eeb96015491b1cfbbb1c7fb8) Thanks [@smeijer](https://github.com/smeijer)! - Listen to realtime events using SSE, and drop the Ably dependency

### Patch Changes

- [#188](https://github.com/magicbell/magicbell-js/pull/188) [`f12d410`](https://github.com/magicbell/magicbell-js/commit/f12d4107bca195936832a466ec846fe0b657871a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `dayjs` to `^1.11.10`.

- Updated dependencies [[`78b62cb`](https://github.com/magicbell/magicbell-js/commit/78b62cb571aba9d5eeb96015491b1cfbbb1c7fb8), [`f12d410`](https://github.com/magicbell/magicbell-js/commit/f12d4107bca195936832a466ec846fe0b657871a)]:
  - @magicbell/react-headless@4.4.0

## 10.8.3

### Patch Changes

- [`79d3019`](https://github.com/magicbell/magicbell-js/commit/79d3019482c53644e44b016b41bad723ddd1bd49) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `immer` to `^9.0.21`.

- [`0a40f2d`](https://github.com/magicbell/magicbell-js/commit/0a40f2d5f4eded31784caf7476771b90694684f2) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.198`.

- [`ffb1b21`](https://github.com/magicbell/magicbell-js/commit/ffb1b213607f1ba5ff0d86c9478d758f89924a68) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `sinon` to `^13.0.2`.

- [`39ad36e`](https://github.com/magicbell/magicbell-js/commit/39ad36ed59f0949f7b06810534560a61e27f3d25) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `react-infinite-scroll-component` to `^6.1.0`.

- [`0b63278`](https://github.com/magicbell/magicbell-js/commit/0b6327842b529efcd7de89825f9a51015d34dcd3) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@types/sinon` to `^10.0.16`.

- [`5088009`](https://github.com/magicbell/magicbell-js/commit/50880093f31b88e34a74d2f75b7860de1ac4b88d) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `dayjs` to `^1.11.9`.

- Updated dependencies [[`79d3019`](https://github.com/magicbell/magicbell-js/commit/79d3019482c53644e44b016b41bad723ddd1bd49), [`0a40f2d`](https://github.com/magicbell/magicbell-js/commit/0a40f2d5f4eded31784caf7476771b90694684f2), [`6159725`](https://github.com/magicbell/magicbell-js/commit/6159725eddf22be5787ae1441131ef7aad97632e), [`ffb1b21`](https://github.com/magicbell/magicbell-js/commit/ffb1b213607f1ba5ff0d86c9478d758f89924a68), [`f83b52c`](https://github.com/magicbell/magicbell-js/commit/f83b52ccec1bf7479709252ccdda83522e736840), [`cda7f21`](https://github.com/magicbell/magicbell-js/commit/cda7f215d8d5cc71faf150ebc6843805a1572fb5), [`5088009`](https://github.com/magicbell/magicbell-js/commit/50880093f31b88e34a74d2f75b7860de1ac4b88d)]:
  - @magicbell/react-headless@4.3.2

## 10.8.2

### Patch Changes

- Updated dependencies [[`4b458f8`](https://github.com/magicbell/magicbell-js/commit/4b458f85ae019acb57dd3b82539f32f89a4a96e7)]:
  - @magicbell/webpush@1.3.1

## 10.8.1

### Patch Changes

- Updated dependencies []:
  - @magicbell/react-headless@4.3.1

## 10.8.0

### Minor Changes

- [#168](https://github.com/magicbell/magicbell-js/pull/168) [`ce6ecc2`](https://github.com/magicbell/magicbell-js/commit/ce6ecc2cb207effe9755ea1883f696dcf5d5aad5) Thanks [@smeijer](https://github.com/smeijer)! - Use `magicbell` client for api requests. This change includes the addition of automatic retry of failed requests. Requests are retried up to 3 times with exponential backoff.

### Patch Changes

- [#168](https://github.com/magicbell/magicbell-js/pull/168) [`ce6ecc2`](https://github.com/magicbell/magicbell-js/commit/ce6ecc2cb207effe9755ea1883f696dcf5d5aad5) Thanks [@smeijer](https://github.com/smeijer)! - Mark `apiKey` and either `userEmail` or `userExternalId` as required. Note that this is an update in type definitions only, the implementation is not changed.

- Updated dependencies [[`ce6ecc2`](https://github.com/magicbell/magicbell-js/commit/ce6ecc2cb207effe9755ea1883f696dcf5d5aad5), [`b835ff3`](https://github.com/magicbell/magicbell-js/commit/b835ff33aa3f19d1855d69235db70ff4774c2770), [`b835ff3`](https://github.com/magicbell/magicbell-js/commit/b835ff33aa3f19d1855d69235db70ff4774c2770), [`ce6ecc2`](https://github.com/magicbell/magicbell-js/commit/ce6ecc2cb207effe9755ea1883f696dcf5d5aad5)]:
  - @magicbell/react-headless@4.3.0

## 10.7.5

### Patch Changes

- [#160](https://github.com/magicbell/magicbell-js/pull/160) [`cb7c02a`](https://github.com/magicbell/magicbell-js/commit/cb7c02aaf3f1f22e43367b3a10e29393a36827a6) Thanks [@moxley01](https://github.com/moxley01)! - Updates React package README with minor fixes

## 10.7.4

### Patch Changes

- [#153](https://github.com/magicbell/magicbell-js/pull/153) [`6aa5cee`](https://github.com/magicbell/magicbell-js/commit/6aa5cee31e0a413207007803e7ad6a109a664cd8) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.195`.

- Updated dependencies [[`6aa5cee`](https://github.com/magicbell/magicbell-js/commit/6aa5cee31e0a413207007803e7ad6a109a664cd8), [`2c7ba0c`](https://github.com/magicbell/magicbell-js/commit/2c7ba0c652317b626708561c1436f0439efe22fd)]:
  - @magicbell/react-headless@4.2.8
  - @magicbell/webpush@1.3.0

## 10.7.3

### Patch Changes

- Updated dependencies [[`03f2d30`](https://github.com/magicbell/magicbell-js/commit/03f2d3077a8e2affd02c8f2eb9e67253e793bb63)]:
  - @magicbell/webpush@1.2.0

## 10.7.2

### Patch Changes

- [#113](https://github.com/magicbell/magicbell-js/pull/113) [`6e5297e`](https://github.com/magicbell/magicbell-js/commit/6e5297e06b70df0c66af346953ca2bfd56aadc80) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/sinon` to `^10.0.15`.

- [#111](https://github.com/magicbell/magicbell-js/pull/111) [`8987a92`](https://github.com/magicbell/magicbell-js/commit/8987a92fe0d48999514228d09a2c89cfcc6e4716) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.194`.

- [#120](https://github.com/magicbell/magicbell-js/pull/120) [`9e98288`](https://github.com/magicbell/magicbell-js/commit/9e982889f37e70702f24dcc87296406d25623a8c) Thanks [@smeijer](https://github.com/smeijer)! - Updates the `PushNotificationsSubscriber` component to use our `@magicbell/webpush`
  SDK. This change makes it compatible with the latest browsers and our updated API.

  ```jsx
  import { PushNotificationsSubscriber } from '@magicbell/magicbell-react';

  function MyComponent() {
    return (
      <PushNotificationsSubscriber serviceWorkerPath="/service-worker.js">
        {({ createSubscription }) => <button onClick={createSubscription}>Enable push notifications</button>}
      </PushNotificationsSubscriber>
    );
  }
  ```

- Updated dependencies [[`c030ce4`](https://github.com/magicbell/magicbell-js/commit/c030ce41e094c19b62cbabbbe62f8e3b0ceeb31f), [`8987a92`](https://github.com/magicbell/magicbell-js/commit/8987a92fe0d48999514228d09a2c89cfcc6e4716), [`5bd3ac7`](https://github.com/magicbell/magicbell-js/commit/5bd3ac767602d06409dafcd9a144e5c18fbfd55c), [`549c8a9`](https://github.com/magicbell/magicbell-js/commit/549c8a911bdb8bb4467c90398de6d130451be818)]:
  - @magicbell/react-headless@4.2.7
  - @magicbell/webpush@1.0.0

## 10.7.1

### Patch Changes

- [#107](https://github.com/magicbell/magicbell-js/pull/107) [`eb256a1`](https://github.com/magicbell/magicbell-js/commit/eb256a1d0bc11f628975d5ce1e40e20c97fc0d47) Thanks [@smeijer](https://github.com/smeijer)! - fix: use accent color for dialog buttons

## 10.7.0

### Minor Changes

- [#103](https://github.com/magicbell/magicbell-js/pull/103) [`e83a694`](https://github.com/magicbell/magicbell-js/commit/e83a694e3f681e3edd6aeb7708e430811e14bc15) Thanks [@smeijer](https://github.com/smeijer)! - feat: Add support for theming the enable-push-subscriptions dialog.

  ```typescript jsx
  const theme = {
    dialog: {
      backgroundColor: '#FFFFFF',
      textColor: '#3A424D',
      accentColor: '#5225C1',
    }
  }

  <MagicBell theme={theme} apiKey={...} userEmail={...}>
      {() => <NotificationInbox height={500} />}
  </MagicBell>
  ```

## 10.6.0

### Minor Changes

- [#88](https://github.com/magicbell/magicbell-js/pull/88) [`7f9ecbc`](https://github.com/magicbell/magicbell-js/commit/7f9ecbc3594af2035b4fa063adc593a7fe4c722c) Thanks [@TD-4242](https://github.com/TD-4242)! - feat: support css variables as theme color value

  ```tsx
  import MagicBell, { NotificationInbox } from '@magicbell/magicbell-react';

  const customTheme = {
    icon: {
      borderColor: 'var(--magicbell-icon-border-color)',
    },
  };

  <MagicBell theme={customTheme} apiKey={...} userEmail={...}>
      {() => <NotificationInbox height={500} />}
  </MagicBell>
  ```

## 10.5.2

### Patch Changes

- Updated dependencies [[`fbbbae7`](https://github.com/magicbell/magicbell-js/commit/fbbbae744e0b39b9caca32fd329b148709749529)]:
  - @magicbell/react-headless@4.2.6

## 10.5.1

### Patch Changes

- Updated dependencies [[`6eb5705`](https://github.com/magicbell/magicbell-js/commit/6eb5705c502ab64caa32ce1d5ffa79d1fd671b06)]:
  - @magicbell/react-headless@4.2.5

## 10.5.0

### Minor Changes

- [#62](https://github.com/magicbell/magicbell-js/pull/62) [`2d96a3d`](https://github.com/magicbell/magicbell-js/commit/2d96a3d5426f62dd3a89c286f0c6c2d7195de612) Thanks [@pianomansam](https://github.com/pianomansam)! - feat: don't open action-url when notification click handler returns false

## 10.4.0

### Minor Changes

- [`4347cf3`](https://github.com/magicbell/magicbell-js/commit/4347cf322d7b057769771fd3f06dad60b98d18aa) Thanks [@smeijer](https://github.com/smeijer)! - feat: category labels in the preferences pane are now translatable.

  ```typescript jsx
  const customLocale = {
    name: 'en',
    translations: {
      preferences: {
        categories: { // mapping from slug > label
          billing: 'My Billing',
        },
      },
    },
  };

  function MyComponent() {
    return (
      <MagicBell locale={customLocale} apiKey={MAGICBELL_API_KEY} userEmail="john@example.com" />
        {(props) => <FloatingNotificationInbox height={450} {...props} />}
      </MagicBell>
    );
  }
  ```

## 10.3.5

### Patch Changes

- [#46](https://github.com/magicbell/magicbell-js/pull/46) [`017b0cd`](https://github.com/magicbell/magicbell-js/commit/017b0cd52ed004de24d98d3a99ac5503031d4e66) Thanks [@smeijer](https://github.com/smeijer)! - fix: wait for `markAsRead` before opening notification `action_url`.

  This fixes a race-condition where the page reload and fetching new notifications is faster than marking the notification as read, which would result in showing the notification as 'unread' upon page (re)load.

- Updated dependencies [[`8d30258`](https://github.com/magicbell/magicbell-js/commit/8d302586175a1219c743b0135038538a591e0a0c)]:
  - @magicbell/react-headless@4.2.4

## 10.3.4

### Patch Changes

- [#26](https://github.com/magicbell/magicbell-js/pull/26) [`2f295b0`](https://github.com/magicbell/magicbell-js/commit/2f295b0a02bf735e0f594f0bd0985b1523615ac7) Thanks [@smeijer](https://github.com/smeijer)! - Remove react-dom from peer-dependencies, so we don't cause trouble in react-native projects.

- Updated dependencies [[`2f295b0`](https://github.com/magicbell/magicbell-js/commit/2f295b0a02bf735e0f594f0bd0985b1523615ac7)]:
  - @magicbell/react-headless@4.2.3

## 10.3.3

### Patch Changes

- [#13](https://github.com/magicbell/magicbell-js/pull/13) [`1cb984c`](https://github.com/magicbell/magicbell-js/commit/1cb984cfac485254c286385d8a750bc3c62cfbbb) Thanks [@3v0k4](https://github.com/3v0k4)! - Fix embeddable web notifications: since embeddable aliases axios (redaxios) and redaxios does not implement `.getUri`, the code was failing for the embeddable package (that uses redaxios) but not for the react package (that uses axios).

## 10.3.2

### Patch Changes

- Updated dependencies [[`08f4abb`](https://github.com/magicbell/magicbell-js/commit/08f4abb6605de603688e970c49218e5aa41ebc08)]
  - @magicbell/react-headless@4.2.2

## 10.3.1

### Patch Changes

- [`36d7ef7`](https://github.com/magicbell/magicbell-js/commit/36d7ef726317efac1cbe30a97afdf26c5a4e7cd5) Thanks [@smeijer](https://github.com/smeijer)! - ensure that the notification click handler does not get invoked when clicking buttons and links inside the notification content.

- Updated dependencies [[`36d7ef7`](https://github.com/magicbell/magicbell-js/commit/36d7ef726317efac1cbe30a97afdf26c5a4e7cd5)]:
  - @magicbell/react-headless@4.2.1
