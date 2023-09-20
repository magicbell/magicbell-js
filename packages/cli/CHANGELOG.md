# @magicbell/cli

## 2.2.1

### Patch Changes

- [`b29dc74`](https://github.com/magicbell-io/magicbell-js/commit/b29dc7480f855913060257f692f786c563d4598e) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `commander` to `^9.5.0`.

- Updated dependencies [[`3f7ab5a`](https://github.com/magicbell-io/magicbell-js/commit/3f7ab5a532ec5c02e7f8ff41261548c0accd78ca)]:
  - magicbell@2.3.0

## 2.2.0

### Minor Changes

- [#173](https://github.com/magicbell-io/magicbell-js/pull/173) [`1f40263`](https://github.com/magicbell-io/magicbell-js/commit/1f40263c112dcf5a05cac3d59661c7b8ddc41858) Thanks [@smeijer](https://github.com/smeijer)! - Add [EventSource](https://www.npmjs.com/package/eventsource) polyfill for the `listen` methods. This polyfill is removed from the `magicbell` package, to avoid bundling it in the browser SDKs.

### Patch Changes

- Updated dependencies [[`1f40263`](https://github.com/magicbell-io/magicbell-js/commit/1f40263c112dcf5a05cac3d59661c7b8ddc41858)]:
  - magicbell@2.2.0

## 2.1.0

### Minor Changes

- [#171](https://github.com/magicbell-io/magicbell-js/pull/171) [`666d2bb`](https://github.com/magicbell-io/magicbell-js/commit/666d2bbefe2365b6691607a38514d51d302e8248) Thanks [@smeijer](https://github.com/smeijer)! - We've added a method to list the registered push subscriptions for a given user using user credentials.

  ```shell
  magicbell user push-subscriptions list \
    --user-email person@example.com
  ```

  Note that this method returns the same data as the project scoped `magicbell users push-subscriptions <user-id>`.

### Patch Changes

- [#170](https://github.com/magicbell-io/magicbell-js/pull/170) [`87d84e8`](https://github.com/magicbell-io/magicbell-js/commit/87d84e8bf934bcf3a176f08a3129ce91e18d3da3) Thanks [@smeijer](https://github.com/smeijer)! - Improve `--help` by being more specific about the json type some arguments expect. For example, we used to show `--overrides <json>`, but json can also be an array, while we do expect an object. Now, those arguments are shown as `<object>`.

- Updated dependencies [[`998008a`](https://github.com/magicbell-io/magicbell-js/commit/998008a04f40833954ec9a47bfe447989f7079aa), [`24c00f4`](https://github.com/magicbell-io/magicbell-js/commit/24c00f400f571ab0518f3ece7601f99360f85f68), [`998008a`](https://github.com/magicbell-io/magicbell-js/commit/998008a04f40833954ec9a47bfe447989f7079aa), [`998008a`](https://github.com/magicbell-io/magicbell-js/commit/998008a04f40833954ec9a47bfe447989f7079aa), [`ce6ecc2`](https://github.com/magicbell-io/magicbell-js/commit/ce6ecc2cb207effe9755ea1883f696dcf5d5aad5), [`666d2bb`](https://github.com/magicbell-io/magicbell-js/commit/666d2bbefe2365b6691607a38514d51d302e8248)]:
  - magicbell@2.1.0

## 2.0.3

### Patch Changes

- [#161](https://github.com/magicbell-io/magicbell-js/pull/161) [`4ef2b07`](https://github.com/magicbell-io/magicbell-js/commit/4ef2b07e31922ebe83a443b1732390b79b7af141) Thanks [@smeijer](https://github.com/smeijer)! - Use a fork of ky that includes commonjs support

## 2.0.2

### Patch Changes

- [#158](https://github.com/magicbell-io/magicbell-js/pull/158) [`d0121d9`](https://github.com/magicbell-io/magicbell-js/commit/d0121d9eb85528604e6765b679a896570eaee3ee) Thanks [@smeijer](https://github.com/smeijer)! - inject ky during build for a dep free install

## 2.0.1

### Patch Changes

- [`125c9d2`](https://github.com/magicbell-io/magicbell-js/commit/125c9d238dfb088b5482fd5fa8447b8a0c990da8) Thanks [@smeijer](https://github.com/smeijer)! - - updated `magicbell` to `2.0.1`

## 2.0.0

### Major Changes

- [#154](https://github.com/magicbell-io/magicbell-js/pull/154) [`da22233`](https://github.com/magicbell-io/magicbell-js/commit/da22233fca83398cc33e4732172eebde96ad1140) Thanks [@smeijer](https://github.com/smeijer)! - **Breaking Changes** - please read carefully.

  We've separated the project from user resources. All user resources have been moved under the `user` namespace. This is a virtual path, that does not translate one-on-one to the REST api. All user resources require a `--user-email` or `--user-external-id` option to be provided.

  **Project Resources**

  The project resources have been left untouched, and work as before. This includes the commands as below. Note that `magicbell notifications` was a mixture of project and user scoped resources, and has been split into `magicbell notifications` and `magicbell user notifications`. On the project scope, only `magicbell notifications create` remains.

  ```shell
  magicbell broadcasts
  magicbell imports
  magicbell metrics
  magicbell notifications
  magicbell users
  ```

  **User Resources**

  User resources include all API endpoints that do not require the api secret key, but use the api key and user email or user external id to authenticate the user. This includes the resources as below. Please note that all user scoped commands require a `--user-email` or `--user-external-id` option to be provided. If you're authenticated with `api-secret` we'll compute the `--user-hmac` for you. Otherwise, you'll have to provide it manually with the `--user-hmac` option if HMAC is enabled for your project.

  ```shell
  magicbell user listen
  magicbell user notification-preferences
  magicbell user notifications
  magicbell user push-subscriptions
  magicbell user subscriptions
  ```

### Minor Changes

- [#149](https://github.com/magicbell-io/magicbell-js/pull/149) [`3cd329b`](https://github.com/magicbell-io/magicbell-js/commit/3cd329bd76377d144dd8dd79a66f8b909591533c) Thanks [@smeijer](https://github.com/smeijer)! - The CLI now accepts the global `--print-request curl` option that prints the request object to the console. When that option is provided, the request will be printed in the requested format, and no network requests will be made. We'll add more formats in the future.

  ```shell
  magicbell notifications list --print-request curl
  magicbell notifications create --title hi --print-request curl
  ```

- [#152](https://github.com/magicbell-io/magicbell-js/pull/152) [`035b9e8`](https://github.com/magicbell-io/magicbell-js/commit/035b9e851951379dbea82dbc2380d6e9d500198a) Thanks [@smeijer](https://github.com/smeijer)! - We now use [debug] for logging, and have dropped support for the `debug` property that could be provided to `Client`. Debugging can be enabled via the `DEBUG` environment variable.

  We're using the namespaces `magicbell:debug`, `magicbell:log` and `magicbell:error`.

  ```shell
  DEBUG=magicbell:* node my-app.js
  DEBUG=magicbell:debug node my-app.js
  ```

  [debug]: https://npmjs.com/debug

### Patch Changes

- [#148](https://github.com/magicbell-io/magicbell-js/pull/148) [`f6558fb`](https://github.com/magicbell-io/magicbell-js/commit/f6558fb04fbcfbdea14839f9c6e3972eed60a65e) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `esbuild` to `^0.18.11`.

## 1.3.0

### Minor Changes

- [#147](https://github.com/magicbell-io/magicbell-js/pull/147) [`b2f240a`](https://github.com/magicbell-io/magicbell-js/commit/b2f240ad00b71261f8133ffd1612826b26b14f7d) Thanks [@smeijer](https://github.com/smeijer)! - add `--host` flag so the cli can be used against other environments, such as localhost, staging and review.

  ```shell
  magicbell --host localhost:3000
  magicbell --host localhost:3000/api/v1
  ```

  When an alternative host is provided during login, the host gets bound to that session. Meaning, the profile will use that host as default.

  ```shell
  magicbell login
  magicbell users list # run against production

  # or export MAGICBELL_PROFILE=dev
  magicbell login -p dev -h localhost:3000
  magicbell users list -p dev # run against localhost:3000
  ```

### Patch Changes

- [#145](https://github.com/magicbell-io/magicbell-js/pull/145) [`871c9f4`](https://github.com/magicbell-io/magicbell-js/commit/871c9f4e7a6d9f5e289a2ff32e7498a072e34dbd) Thanks [@smeijer](https://github.com/smeijer)! - remove `-v` and `-h` alias. Use `--version` and `--help` instead.

## 1.2.0

### Minor Changes

- [#143](https://github.com/magicbell-io/magicbell-js/pull/143) [`26e9e1a`](https://github.com/magicbell-io/magicbell-js/commit/26e9e1a737d946d4fc42b81a126f9b2c794cb8f4) Thanks [@smeijer](https://github.com/smeijer)! - Add `--max-items` to methods supporting `--paginate`. This way it's trivial to auto paginate over records at MagicBell, till a certain reasonable limit is reached. By default, `--paginate` iterates over every single record potentially hitting, but respecting, API rate limits.

  ```shell
  $ magicbell broadcasts list --paginate --max-items 1000
  ```

## 1.1.0

### Minor Changes

- [`963fcc1`](https://github.com/magicbell-io/magicbell-js/commit/963fcc1030f1cbcb621a19dc0b446558fedee790) Thanks [@smeijer](https://github.com/smeijer)! - feat: add user options to listen

  ```shell
  magicbell listen --user-email person@example.com
  magicbell listen --user-external-id usr_123
  ```

## 1.0.0

### Major Changes

- [#139](https://github.com/magicbell-io/magicbell-js/pull/139) [`22f7267`](https://github.com/magicbell-io/magicbell-js/commit/22f72679b65405e79a5a4a80d112678c3080ddc5) Thanks [@smeijer](https://github.com/smeijer)! - Work with MagicBell from the command line!

  ```shell
  npm i -g @magicbell/cli

  magicbell login
  magicbell --help
  ```

  Example output of `magicbell --help`:

  ```shell
  Usage
    magicbell [options] [command]

  Resource commands
    broadcasts                Manage broadcasts
    imports                   Manage imports
    listen                    Listen to events for a users inbox
    metrics                   Manage metrics
    notification-preferences  Manage notification preferences
    notifications             Send and retrieve notifications
    push-subscriptions        Manage push subscriptions
    subscriptions             Manage subscriptions
    users                     Manage all known users

  Other commands
    config                    Manage configuration for magicbell
    login                     Login to your MagicBell account
    logout                    Logout of your MagicBell account

  Options
    -v, --version             Show magicbell version
    -p, --profile <string>    Profile to use (default: "default")
    --no-color                Color output
    -h, --help                Show help for command
  ```
