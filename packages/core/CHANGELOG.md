# @magicbell/core

## 5.4.0

### Minor Changes

- [#549](https://github.com/magicbell/magicbell-js/pull/549) [`f710971`](https://github.com/magicbell/magicbell-js/commit/f7109713acf554c82921a94d722a43c06befee94) Thanks [@smeijer](https://github.com/smeijer)! - This package is deprecated. Please use [`magicbell-js`](https://www.magicbell.com/docs/libraries/magicbell-js) instead.

  ```diff
  - import MagicBellClient from '@magicbell/core';
  + import { Client } from 'magicbell-js/project-client';

  - const client = await MagicBellClient.createInstance({
  -   apiKey: 'MAGICBELL_API_KEY',
  -   userEmail: 'customer@example.com',
  - });

  + const client = new Client({
  +   token: 'your-access-token',
  + });
  ```

## 5.3.0

### Minor Changes

- [`a145e67`](https://github.com/magicbell/magicbell-js/commit/a145e673306d0c4a986c2e86e66c6ce9535f71c9) Thanks [@smeijer](https://github.com/smeijer)! - update dependency axios to v1.8.4

## 5.2.0

### Minor Changes

- [#478](https://github.com/magicbell/magicbell-js/pull/478) [`0e8d41b`](https://github.com/magicbell/magicbell-js/commit/0e8d41bf764fc0e904d3022e2c536407c0164f5e) Thanks [@smeijer](https://github.com/smeijer)! - Swap mitt with mittly, for better esm/cjs support

## 5.1.0

### Minor Changes

- [#399](https://github.com/magicbell/magicbell-js/pull/399) [`8d2bd6b`](https://github.com/magicbell/magicbell-js/commit/8d2bd6b2ba7374069e7a52bc055a199e33988ed5) Thanks [@smeijer](https://github.com/smeijer)! - improve cjs/esm dual module support.

## 5.0.16

### Patch Changes

- [#311](https://github.com/magicbell/magicbell-js/pull/311) [`eb8e699`](https://github.com/magicbell/magicbell-js/commit/eb8e699d5c9402924368d39fa917978fac24637c) Thanks [@smeijer](https://github.com/smeijer)! - update repository in package.json

## 5.0.15

### Patch Changes

- [`40601b6`](https://github.com/magicbell/magicbell-js/commit/40601b647b90736f30f6945b5b8c6066f4e26c44) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `dompurify` to `^3.1.3`.

## 5.0.14

### Patch Changes

- [#256](https://github.com/magicbell/magicbell-js/pull/256) [`816be82`](https://github.com/magicbell/magicbell-js/commit/816be82fc1296f2ee27e2e650a94b04cdc527987) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `dompurify` to `^3.0.11`.

## 5.0.13

### Patch Changes

- [#247](https://github.com/magicbell/magicbell-js/pull/247) [`9e55676`](https://github.com/magicbell/magicbell-js/commit/9e55676f6c252728e941c224f4dd3a486bb646cc) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `axios` to `^0.28.0`.

- [`464b168`](https://github.com/magicbell/magicbell-js/commit/464b168994ab8927f1d79e2c8c75d7c496608591) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `tslib` to `^2.6.2`.

## 5.0.12

### Patch Changes

- [`f3c4ce3`](https://github.com/magicbell/magicbell-js/commit/f3c4ce30b65352e3ae312faedf04ad8a05a66c1b) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `ably` to `^1.2.48`.

## 5.0.11

### Patch Changes

- [#216](https://github.com/magicbell/magicbell-js/pull/216) [`6b97a7c`](https://github.com/magicbell/magicbell-js/commit/6b97a7c6076185c9e8f995745a69f3c5da5952b1) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `miragejs` to `^0.1.48`.

- [`9be10f5`](https://github.com/magicbell/magicbell-js/commit/9be10f5f641888f4431b8c112155c5b9b3f0731b) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.202`.

- [`d29b034`](https://github.com/magicbell/magicbell-js/commit/d29b034767ba539164b330f0b3fd94822b8817ff) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `rosie` to `^2.1.1`.

## 5.0.10

### Patch Changes

- [#210](https://github.com/magicbell/magicbell-js/pull/210) [`9280ca7`](https://github.com/magicbell/magicbell-js/commit/9280ca79f6a51936cccaeb61cb78f0eabfb5c656) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/rosie` to `^0.0.45`.

- [`d199c74`](https://github.com/magicbell/magicbell-js/commit/d199c74d38c4dfe6e7d0bdcf63a4e8e19da9dda9) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.201`.

- [`8649613`](https://github.com/magicbell/magicbell-js/commit/864961352717771f8676c87d793e2ab26720cd5d) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@types/sinon` to `^10.0.20`.

## 5.0.9

### Patch Changes

- [#191](https://github.com/magicbell/magicbell-js/pull/191) [`9c30c22`](https://github.com/magicbell/magicbell-js/commit/9c30c22f9f0a7e9facf10e89d8777a1eed4ce03d) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/rosie` to `^0.0.43`.

## 5.0.8

### Patch Changes

- [#188](https://github.com/magicbell/magicbell-js/pull/188) [`f12d410`](https://github.com/magicbell/magicbell-js/commit/f12d4107bca195936832a466ec846fe0b657871a) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `dayjs` to `^1.11.10`.

## 5.0.7

### Patch Changes

- [`0a40f2d`](https://github.com/magicbell/magicbell-js/commit/0a40f2d5f4eded31784caf7476771b90694684f2) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.198`.

- [`ffb1b21`](https://github.com/magicbell/magicbell-js/commit/ffb1b213607f1ba5ff0d86c9478d758f89924a68) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `sinon` to `^13.0.2`.

- [#183](https://github.com/magicbell/magicbell-js/pull/183) [`e1e7518`](https://github.com/magicbell/magicbell-js/commit/e1e7518564378b39a5bc2848d329f7f4236b2ea3) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `miragejs` to `^0.1.47`.

- [`f83b52c`](https://github.com/magicbell/magicbell-js/commit/f83b52ccec1bf7479709252ccdda83522e736840) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `mitt` to `^3.0.1`.

- [#179](https://github.com/magicbell/magicbell-js/pull/179) [`cda7f21`](https://github.com/magicbell/magicbell-js/commit/cda7f215d8d5cc71faf150ebc6843805a1572fb5) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `ably` to `^1.2.44`.

- [`0b63278`](https://github.com/magicbell/magicbell-js/commit/0b6327842b529efcd7de89825f9a51015d34dcd3) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@types/sinon` to `^10.0.16`.

- [`5088009`](https://github.com/magicbell/magicbell-js/commit/50880093f31b88e34a74d2f75b7860de1ac4b88d) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `dayjs` to `^1.11.9`.

## 5.0.6

### Patch Changes

- [#153](https://github.com/magicbell/magicbell-js/pull/153) [`6aa5cee`](https://github.com/magicbell/magicbell-js/commit/6aa5cee31e0a413207007803e7ad6a109a664cd8) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.195`.

## 5.0.5

### Patch Changes

- [#113](https://github.com/magicbell/magicbell-js/pull/113) [`6e5297e`](https://github.com/magicbell/magicbell-js/commit/6e5297e06b70df0c66af346953ca2bfd56aadc80) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/sinon` to `^10.0.15`.

- [#111](https://github.com/magicbell/magicbell-js/pull/111) [`8987a92`](https://github.com/magicbell/magicbell-js/commit/8987a92fe0d48999514228d09a2c89cfcc6e4716) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `@types/lodash` to `^4.14.194`.

## 5.0.4

### Patch Changes

- [`fbbbae7`](https://github.com/magicbell/magicbell-js/commit/fbbbae744e0b39b9caca32fd329b148709749529) Thanks [@smeijer](https://github.com/smeijer)! - deps: bump ably to 1.2.39 to fix CVE-2022-33987
