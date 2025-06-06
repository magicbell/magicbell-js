# @magicbell/project-client

## 0.14.1

### Patch Changes

- [#530](https://github.com/magicbell/magicbell-js/pull/530) [`ef6bacd`](https://github.com/magicbell/magicbell-js/commit/ef6bacd77028ae472a06f68cfe956a61b968eda5) Thanks [@smeijer](https://github.com/smeijer)! - The `@magicbell/project-client` and `@magicbell/user-client` packages are now deprecated. Please migrate to `magicbell-js` instead. Migration is trivial, and should be as simple as updating your import statements.

  ```diff
  - import { Client } from '@magicbell/project-client';
  + import { Client } from 'magicbell-js/project-client';

  - import { Client } from '@magicbell/project-client';
  + import { Client } from 'magicbell-js/project-client';
  ```

## 0.14.0

### Minor Changes

- [#526](https://github.com/magicbell/magicbell-js/pull/526) [`1918be5`](https://github.com/magicbell/magicbell-js/commit/1918be58536be1f08c3d4653fa479016ee8ee5d9) Thanks [@MagicBella](https://github.com/MagicBella)! - Automatic minor version bump for changes in `@magicbell/project-client`.

## 0.13.0

### Minor Changes

- [#508](https://github.com/magicbell/magicbell-js/pull/508) [`f3f1833`](https://github.com/magicbell/magicbell-js/commit/f3f1833927fa9aa5c3e261af552007c7db600cb3) Thanks [@MagicBella](https://github.com/MagicBella)! - Automatic minor version bump for changes in `@magicbell/project-client`.

## 0.12.0

### Minor Changes

- [#505](https://github.com/magicbell/magicbell-js/pull/505) [`0d55fc6`](https://github.com/magicbell/magicbell-js/commit/0d55fc6caca2e83a27788014a21fe4231f4eca10) Thanks [@MagicBella](https://github.com/MagicBella)! - Automatic minor version bump for changes in `@magicbell/project-client`.

## 0.11.0

### Minor Changes

- [#494](https://github.com/magicbell/magicbell-js/pull/494) [`93d3b08`](https://github.com/magicbell/magicbell-js/commit/93d3b0804f4f3e7c105cfb3d13f2add144ef8413) Thanks [@MagicBella](https://github.com/MagicBella)! - Automatic minor version bump for changes in `@magicbell/project-client`.

## 0.10.0

### Minor Changes

- [#480](https://github.com/magicbell/magicbell-js/pull/480) [`beda014`](https://github.com/magicbell/magicbell-js/commit/beda014abb848d22135dc2644d3f4d5daffa789e) Thanks [@MagicBella](https://github.com/MagicBella)! - Automatic minor version bump for changes in `@magicbell/project-client`.

## 0.9.0

### Minor Changes

- [#472](https://github.com/magicbell/magicbell-js/pull/472) [`02f70b0`](https://github.com/magicbell/magicbell-js/commit/02f70b0f3e5bda7b8ee1d39d68269b40e3b361a3) Thanks [@MagicBella](https://github.com/MagicBella)! - Automatic minor version bump for changes in `@magicbell/project-client`.

## 0.8.0

### Minor Changes

- [#467](https://github.com/magicbell/magicbell-js/pull/467) [`fc280e0`](https://github.com/magicbell/magicbell-js/commit/fc280e077a71a76b9b9f909d5ff4d21f39ff1746) Thanks [@MagicBella](https://github.com/MagicBella)! - Automatic minor version bump for changes in `@magicbell/project-client`.

## 0.7.0

### Minor Changes

- [#459](https://github.com/magicbell/magicbell-js/pull/459) [`6688f1c`](https://github.com/magicbell/magicbell-js/commit/6688f1ced10daa74d4953042fe7de12554d88156) Thanks [@MagicBella](https://github.com/MagicBella)! - Automatic minor version bump for changes in `@magicbell/project-client`.

## 0.6.0

### Minor Changes

- [#453](https://github.com/magicbell/magicbell-js/pull/453) [`5e06ee7`](https://github.com/magicbell/magicbell-js/commit/5e06ee7cc69dae3660a48cf80265462ff128c95e) Thanks [@MagicBella](https://github.com/MagicBella)! - Automatic minor version bump for changes in `@magicbell/project-client`.

## 0.5.4

### Patch Changes

- [#433](https://github.com/magicbell/magicbell-js/pull/433) [`d0f7bae`](https://github.com/magicbell/magicbell-js/commit/d0f7bae98a7a05c375c78bb354778376fffadde1) Thanks [@stigi](https://github.com/stigi)! - Correctly flagging nullable properties. All of them were optional before so they are likely handled correctly already and this is just affecting response validation.

## 0.5.3

### Patch Changes

- [#428](https://github.com/magicbell/magicbell-js/pull/428) [`b2cb190`](https://github.com/magicbell/magicbell-js/commit/b2cb190bb8a541a6305108548e9f5f97edf8d15e) Thanks [@smeijer](https://github.com/smeijer)! - regen project client

## 0.5.1

### Patch Changes

- [#417](https://github.com/magicbell/magicbell-js/pull/417) [`a910be1`](https://github.com/magicbell/magicbell-js/commit/a910be1a7a520f998f2a1de8477ec8377b02cc9d) Thanks [@smeijer](https://github.com/smeijer)! - add discarded_at to jwt tokens

## 0.5.0

### Minor Changes

- [#415](https://github.com/magicbell/magicbell-js/pull/415) [`84f8f8d`](https://github.com/magicbell/magicbell-js/commit/84f8f8d0a311301137f030bea350eae313c4f5de) Thanks [@smeijer](https://github.com/smeijer)! - regen client to match spec

## 0.4.0

### Minor Changes

- [#374](https://github.com/magicbell/magicbell-js/pull/374) [`535534f`](https://github.com/magicbell/magicbell-js/commit/535534f91034ce88a1a9cc4280cb872102db1665) Thanks [@smeijer](https://github.com/smeijer)! - add deliveryconfig endpoints

## 0.3.0

### Minor Changes

- [#378](https://github.com/magicbell/magicbell-js/pull/378) [`4e28dba`](https://github.com/magicbell/magicbell-js/commit/4e28dba24f4022717f4a8a5dbf1ef4152e6228a6) Thanks [@smeijer](https://github.com/smeijer)! - fix cjs/esm dual module support

## 0.2.0

### Minor Changes

- [#363](https://github.com/magicbell/magicbell-js/pull/363) [`036278a`](https://github.com/magicbell/magicbell-js/commit/036278ac94df336514454ecee4f5e4cdc1dc75da) Thanks [@smeijer](https://github.com/smeijer)! - use fetch as http client

- [#358](https://github.com/magicbell/magicbell-js/pull/358) [`726be74`](https://github.com/magicbell/magicbell-js/commit/726be74fa92eb729113eec25a6852f4c8a2b7698) Thanks [@smeijer](https://github.com/smeijer)! - An early release of @magicbell/project-client, a project/admin facing client, to be used on the server, focussing on the MagicBell v2 API.

### Patch Changes

- [#362](https://github.com/magicbell/magicbell-js/pull/362) [`8f20ec9`](https://github.com/magicbell/magicbell-js/commit/8f20ec9bbea55371b27cf59b22501dcbf758e8e1) Thanks [@smeijer](https://github.com/smeijer)! - fix package.json#exports
