# @magicbell/magicbell-react

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
