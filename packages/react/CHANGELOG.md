# @magicbell/magicbell-react

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
