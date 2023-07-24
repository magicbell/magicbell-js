# @magicbell/magicbell-react

## 10.8.1

### Patch Changes

- Updated dependencies []:
  - @magicbell/react-headless@4.3.1

## 10.8.0

### Minor Changes

- [#168](https://github.com/magicbell-io/magicbell-js/pull/168) [`ce6ecc2`](https://github.com/magicbell-io/magicbell-js/commit/ce6ecc2cb207effe9755ea1883f696dcf5d5aad5) Thanks [@smeijer](https://github.com/smeijer)! - Use `magicbell` client for api requests. This change includes the addition of automatic retry of failed requests. Requests are retried up to 3 times with exponential backoff.

### Patch Changes

- [#168](https://github.com/magicbell-io/magicbell-js/pull/168) [`ce6ecc2`](https://github.com/magicbell-io/magicbell-js/commit/ce6ecc2cb207effe9755ea1883f696dcf5d5aad5) Thanks [@smeijer](https://github.com/smeijer)! - Mark `apiKey` and either `userEmail` or `userExternalId` as required. Note that this is an update in type definitions only, the implementation is not changed.

- Updated dependencies [[`ce6ecc2`](https://github.com/magicbell-io/magicbell-js/commit/ce6ecc2cb207effe9755ea1883f696dcf5d5aad5), [`b835ff3`](https://github.com/magicbell-io/magicbell-js/commit/b835ff33aa3f19d1855d69235db70ff4774c2770), [`b835ff3`](https://github.com/magicbell-io/magicbell-js/commit/b835ff33aa3f19d1855d69235db70ff4774c2770), [`ce6ecc2`](https://github.com/magicbell-io/magicbell-js/commit/ce6ecc2cb207effe9755ea1883f696dcf5d5aad5)]:
  - @magicbell/react-headless@4.3.0

## 10.7.5

### Patch Changes

- [#160](https://github.com/magicbell-io/magicbell-js/pull/160) [`cb7c02a`](https://github.com/magicbell-io/magicbell-js/commit/cb7c02aaf3f1f22e43367b3a10e29393a36827a6) Thanks [@moxley01](https://github.com/moxley01)! - Updates React package README with minor fixes

## 10.7.4

### Patch Changes

- [#153](https://github.com/magicbell-io/magicbell-js/pull/153) [`6aa5cee`](https://github.com/magicbell-io/magicbell-js/commit/6aa5cee31e0a413207007803e7ad6a109a664cd8) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.195`.

- Updated dependencies [[`6aa5cee`](https://github.com/magicbell-io/magicbell-js/commit/6aa5cee31e0a413207007803e7ad6a109a664cd8), [`2c7ba0c`](https://github.com/magicbell-io/magicbell-js/commit/2c7ba0c652317b626708561c1436f0439efe22fd)]:
  - @magicbell/react-headless@4.2.8
  - @magicbell/webpush@1.3.0

## 10.7.3

### Patch Changes

- Updated dependencies [[`03f2d30`](https://github.com/magicbell-io/magicbell-js/commit/03f2d3077a8e2affd02c8f2eb9e67253e793bb63)]:
  - @magicbell/webpush@1.2.0

## 10.7.2

### Patch Changes

- [#113](https://github.com/magicbell-io/magicbell-js/pull/113) [`6e5297e`](https://github.com/magicbell-io/magicbell-js/commit/6e5297e06b70df0c66af346953ca2bfd56aadc80) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/sinon` to `^10.0.15`.

- [#111](https://github.com/magicbell-io/magicbell-js/pull/111) [`8987a92`](https://github.com/magicbell-io/magicbell-js/commit/8987a92fe0d48999514228d09a2c89cfcc6e4716) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.194`.

- [#120](https://github.com/magicbell-io/magicbell-js/pull/120) [`9e98288`](https://github.com/magicbell-io/magicbell-js/commit/9e982889f37e70702f24dcc87296406d25623a8c) Thanks [@smeijer](https://github.com/smeijer)! - Updates the `PushNotificationsSubscriber` component to use our `@magicbell/webpush`
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

- Updated dependencies [[`c030ce4`](https://github.com/magicbell-io/magicbell-js/commit/c030ce41e094c19b62cbabbbe62f8e3b0ceeb31f), [`8987a92`](https://github.com/magicbell-io/magicbell-js/commit/8987a92fe0d48999514228d09a2c89cfcc6e4716), [`5bd3ac7`](https://github.com/magicbell-io/magicbell-js/commit/5bd3ac767602d06409dafcd9a144e5c18fbfd55c), [`549c8a9`](https://github.com/magicbell-io/magicbell-js/commit/549c8a911bdb8bb4467c90398de6d130451be818)]:
  - @magicbell/react-headless@4.2.7
  - @magicbell/webpush@1.0.0

## 10.7.1

### Patch Changes

- [#107](https://github.com/magicbell-io/magicbell-js/pull/107) [`eb256a1`](https://github.com/magicbell-io/magicbell-js/commit/eb256a1d0bc11f628975d5ce1e40e20c97fc0d47) Thanks [@smeijer](https://github.com/smeijer)! - fix: use accent color for dialog buttons

## 10.7.0

### Minor Changes

- [#103](https://github.com/magicbell-io/magicbell-js/pull/103) [`e83a694`](https://github.com/magicbell-io/magicbell-js/commit/e83a694e3f681e3edd6aeb7708e430811e14bc15) Thanks [@smeijer](https://github.com/smeijer)! - feat: Add support for theming the enable-push-subscriptions dialog.

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

- [#88](https://github.com/magicbell-io/magicbell-js/pull/88) [`7f9ecbc`](https://github.com/magicbell-io/magicbell-js/commit/7f9ecbc3594af2035b4fa063adc593a7fe4c722c) Thanks [@TD-4242](https://github.com/TD-4242)! - feat: support css variables as theme color value

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

- Updated dependencies [[`fbbbae7`](https://github.com/magicbell-io/magicbell-js/commit/fbbbae744e0b39b9caca32fd329b148709749529)]:
  - @magicbell/react-headless@4.2.6

## 10.5.1

### Patch Changes

- Updated dependencies [[`6eb5705`](https://github.com/magicbell-io/magicbell-js/commit/6eb5705c502ab64caa32ce1d5ffa79d1fd671b06)]:
  - @magicbell/react-headless@4.2.5

## 10.5.0

### Minor Changes

- [#62](https://github.com/magicbell-io/magicbell-js/pull/62) [`2d96a3d`](https://github.com/magicbell-io/magicbell-js/commit/2d96a3d5426f62dd3a89c286f0c6c2d7195de612) Thanks [@pianomansam](https://github.com/pianomansam)! - feat: don't open action-url when notification click handler returns false

## 10.4.0

### Minor Changes

- [`4347cf3`](https://github.com/magicbell-io/magicbell-js/commit/4347cf322d7b057769771fd3f06dad60b98d18aa) Thanks [@smeijer](https://github.com/smeijer)! - feat: category labels in the preferences pane are now translatable.

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

- [#46](https://github.com/magicbell-io/magicbell-js/pull/46) [`017b0cd`](https://github.com/magicbell-io/magicbell-js/commit/017b0cd52ed004de24d98d3a99ac5503031d4e66) Thanks [@smeijer](https://github.com/smeijer)! - fix: wait for `markAsRead` before opening notification `action_url`.

  This fixes a race-condition where the page reload and fetching new notifications is faster than marking the notification as read, which would result in showing the notification as 'unread' upon page (re)load.

- Updated dependencies [[`8d30258`](https://github.com/magicbell-io/magicbell-js/commit/8d302586175a1219c743b0135038538a591e0a0c)]:
  - @magicbell/react-headless@4.2.4

## 10.3.4

### Patch Changes

- [#26](https://github.com/magicbell-io/magicbell-js/pull/26) [`2f295b0`](https://github.com/magicbell-io/magicbell-js/commit/2f295b0a02bf735e0f594f0bd0985b1523615ac7) Thanks [@smeijer](https://github.com/smeijer)! - Remove react-dom from peer-dependencies, so we don't cause trouble in react-native projects.

- Updated dependencies [[`2f295b0`](https://github.com/magicbell-io/magicbell-js/commit/2f295b0a02bf735e0f594f0bd0985b1523615ac7)]:
  - @magicbell/react-headless@4.2.3

## 10.3.3

### Patch Changes

- [#13](https://github.com/magicbell-io/magicbell-js/pull/13) [`1cb984c`](https://github.com/magicbell-io/magicbell-js/commit/1cb984cfac485254c286385d8a750bc3c62cfbbb) Thanks [@3v0k4](https://github.com/3v0k4)! - Fix embeddable web notifications: since embeddable aliases axios (redaxios) and redaxios does not implement `.getUri`, the code was failing for the embeddable package (that uses redaxios) but not for the react package (that uses axios).

## 10.3.2

### Patch Changes

- Updated dependencies [[`08f4abb`](https://github.com/magicbell-io/magicbell-js/commit/08f4abb6605de603688e970c49218e5aa41ebc08)]
  - @magicbell/react-headless@4.2.2

## 10.3.1

### Patch Changes

- [`36d7ef7`](https://github.com/magicbell-io/magicbell-js/commit/36d7ef726317efac1cbe30a97afdf26c5a4e7cd5) Thanks [@smeijer](https://github.com/smeijer)! - ensure that the notification click handler does not get invoked when clicking buttons and links inside the notification content.

- Updated dependencies [[`36d7ef7`](https://github.com/magicbell-io/magicbell-js/commit/36d7ef726317efac1cbe30a97afdf26c5a4e7cd5)]:
  - @magicbell/react-headless@4.2.1
