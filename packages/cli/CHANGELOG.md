# @magicbell/cli

## 3.4.1

### Patch Changes

- Updated dependencies [[`c16e604`](https://github.com/magicbell-io/magicbell-js/commit/c16e6040dfe8268f41a592c50a4c1aa2caad7189)]:
  - magicbell@3.1.4

## 3.4.0

### Minor Changes

- [#276](https://github.com/magicbell-io/magicbell-js/pull/276) [`702ee27`](https://github.com/magicbell-io/magicbell-js/commit/702ee27f7309666c98dc6804e9b152599d357e4c) Thanks [@smeijer](https://github.com/smeijer)! - Support reading email or external id for user commands from profile. With this change, instead of running `magicbell user notifications list --user-email person@example.com`, one can run also run:

  ```shell
  # magicbell user notifications list --user-email person@example.com
  magicbell config set userEmail person@example.com
  magicbell user notifications list
  ```

  or

  ```shell
  # magicbell user notifications list --user-external-id abc
  magicbell config set userExternalId abc
  magicbell user notifications list
  ```

  Note that the arguments still take precedence when provided.

- [#277](https://github.com/magicbell-io/magicbell-js/pull/277) [`8f20dec`](https://github.com/magicbell-io/magicbell-js/commit/8f20decaebaf02c426335a8d072cc0e9980ced63) Thanks [@smeijer](https://github.com/smeijer)! - Show command description in the help for that specific command.

### Patch Changes

- [#278](https://github.com/magicbell-io/magicbell-js/pull/278) [`feea558`](https://github.com/magicbell-io/magicbell-js/commit/feea55883db7725ee4f861a4814db21d248aff86) Thanks [@smeijer](https://github.com/smeijer)! - support `api --request GET` for curl compat

- [#274](https://github.com/magicbell-io/magicbell-js/pull/274) [`34a4fd7`](https://github.com/magicbell-io/magicbell-js/commit/34a4fd7655e537857913fe386a76e9012974c340) Thanks [@smeijer](https://github.com/smeijer)! - Restore `magicbell config unset {key}`.

## 3.3.1

### Patch Changes

- [#271](https://github.com/magicbell-io/magicbell-js/pull/271) [`f57ed5e`](https://github.com/magicbell-io/magicbell-js/commit/f57ed5e0ddfaa22d60338973843c5a039772ebc0) Thanks [@smeijer](https://github.com/smeijer)! - Restore `magicbell config unset {key}`.

## 3.3.0

### Minor Changes

- [#266](https://github.com/magicbell-io/magicbell-js/pull/266) [`3ba8477`](https://github.com/magicbell-io/magicbell-js/commit/3ba84779599f1c6e10e3e09c0dae634c6187ace2) Thanks [@smeijer](https://github.com/smeijer)! - Add credential option to switch authentication scope for `magicbell api` requests

  ```shell
  # include user credential headers (x-magicbell-user-email)
  magicbell api /some-endpoint -r curl -c user
  magicbell api /some-endpoint -r curl --credentials user

  # include project credential headers (x-magicbell-api-secret)
  magicbell api /some-endpoint -r curl -c project
  magicbell api /some-endpoint -r curl --credentials project
  ```

- [#267](https://github.com/magicbell-io/magicbell-js/pull/267) [`9b41a69`](https://github.com/magicbell-io/magicbell-js/commit/9b41a69a63832f878f266d84768cb806ed9514b5) Thanks [@smeijer](https://github.com/smeijer)! - Also accept lowercase method names in the `magicbell api -X {method}` command.

  These commands are now the same:

  ```shell
  magicbell api /integrations -X POST -d '{ ... }'
  magicbell api /integrations -X post -d '{ ... }'
  ```

### Patch Changes

- [#269](https://github.com/magicbell-io/magicbell-js/pull/269) [`ccc6ee7`](https://github.com/magicbell-io/magicbell-js/commit/ccc6ee7a08195c7f08a473f7d572977e8ffb6491) Thanks [@smeijer](https://github.com/smeijer)! - Restore `magicbell config set {key} {value}`.

- Updated dependencies [[`3982658`](https://github.com/magicbell-io/magicbell-js/commit/3982658e38647dccf8e8d1e2c39b44844df74e60)]:
  - magicbell@3.1.3

## 3.2.4

### Patch Changes

- Updated dependencies [[`30ed933`](https://github.com/magicbell-io/magicbell-js/commit/30ed93388b2b5018bd0224892be69028a7632245)]:
  - magicbell@3.1.2

## 3.2.3

### Patch Changes

- [#241](https://github.com/magicbell-io/magicbell-js/pull/241) [`1afb5b1`](https://github.com/magicbell-io/magicbell-js/commit/1afb5b104c518e8927f416af9602a1e2ab6210a6) Thanks [@smeijer](https://github.com/smeijer)! - don't parse response body when it's empty

- [#242](https://github.com/magicbell-io/magicbell-js/pull/242) [`840263b`](https://github.com/magicbell-io/magicbell-js/commit/840263bd2921abc46d62732d5188c71a9fecf675) Thanks [@smeijer](https://github.com/smeijer)! - ensure listeners use node native https module

- Updated dependencies [[`840263b`](https://github.com/magicbell-io/magicbell-js/commit/840263bd2921abc46d62732d5188c71a9fecf675), [`aee799d`](https://github.com/magicbell-io/magicbell-js/commit/aee799deebd15f904153cbc4a7c3ff5dca9accc4)]:
  - magicbell@3.1.1

## 3.2.2

### Patch Changes

- Updated dependencies [[`8bee76e`](https://github.com/magicbell-io/magicbell-js/commit/8bee76eff4f35a55c5b50e25c0f143bd49c5ae3e), [`1041cdf`](https://github.com/magicbell-io/magicbell-js/commit/1041cdf10f7ae87413ca5c00236d8a9ac8d33183)]:
  - magicbell@3.1.0

## 3.2.1

### Patch Changes

- [`33d2cab`](https://github.com/magicbell-io/magicbell-js/commit/33d2cabca427e4ea9bc00b2e6304b57d6b7191f6) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `tsx` to `^3.14.0`.

- Updated dependencies [[`1ed7ce5`](https://github.com/magicbell-io/magicbell-js/commit/1ed7ce52f27569e06878d6fcac42531055b57fc1), [`5a3443f`](https://github.com/magicbell-io/magicbell-js/commit/5a3443f814323352b35eab36d87dbf9e3aa1cba0), [`33d2cab`](https://github.com/magicbell-io/magicbell-js/commit/33d2cabca427e4ea9bc00b2e6304b57d6b7191f6), [`444e653`](https://github.com/magicbell-io/magicbell-js/commit/444e653a435255d5ffcd10257f595cf496e3d1c8)]:
  - magicbell@3.0.1

## 3.2.0

### Minor Changes

- [`a044146`](https://github.com/magicbell-io/magicbell-js/commit/a0441465e0dd0faa850dad4aa81df91a48484a17) Thanks [@smeijer](https://github.com/smeijer)! - only show cli help when invalid arguments were provided

## 3.1.1

### Patch Changes

- [`d813bac`](https://github.com/magicbell-io/magicbell-js/commit/d813bac4c050ab5c2540734717394c94fe81cb50) Thanks [@smeijer](https://github.com/smeijer)! - fix issue when no hooks were provided

## 3.1.0

### Minor Changes

- [#218](https://github.com/magicbell-io/magicbell-js/pull/218) [`943a52b`](https://github.com/magicbell-io/magicbell-js/commit/943a52be4208d2b6ab843d76fcaf4dee9e428b01) Thanks [@smeijer](https://github.com/smeijer)! - Add `magicbell api` method to make an authenticated HTTP request to the MagicBell API and print the response. This will be useful for debugging purposes or advanced users, though other existing commands are recommended for day-to-day use.

  **Examples**

  ```shell
  magicbell api broadcasts --data @broadcast.json
  magicbell api broadcasts --data '{ broadcast: { title: "Hello World" } }' -i
  magicbell api broadcasts -f 'broadcast={ title: "Hello World" }' -s
  ```

  **All options:**

  ```shell
  Arguments
    endpoint                      The API path to request

  Options
    -H, --header <string...>      Add a HTTP request header in key:value format
    -X, --method <string>         The HTTP method for the request (default "POST" when data is provided, "GET"
                                  otherwise)
    -d, --data <string>           HTTP POST data (can also come from stdin)
    -f, --field <string...>       Add a field parameter in key=value format
    -i, --include                 Include HTTP response status line and headers in the output
    -s, --silent                  Do not print the response body
  ```

## 3.0.1

### Patch Changes

- [#213](https://github.com/magicbell-io/magicbell-js/pull/213) [`0f2ae1a`](https://github.com/magicbell-io/magicbell-js/commit/0f2ae1a71b125d77edf0497e3fd0345902186a3f) Thanks [@smeijer](https://github.com/smeijer)! - Add more info to login error messages, in case login fails.

## 3.0.0

### Major Changes

- [#208](https://github.com/magicbell-io/magicbell-js/pull/208) [`62eae8f`](https://github.com/magicbell-io/magicbell-js/commit/62eae8f23ac7bbcdc3a600d514969bd7ba459722) Thanks [@smeijer](https://github.com/smeijer)! - We've removed `magicbell notifications create`, please use `broadcasts create` instead.

### Minor Changes

- [#208](https://github.com/magicbell-io/magicbell-js/pull/208) [`62eae8f`](https://github.com/magicbell-io/magicbell-js/commit/62eae8f23ac7bbcdc3a600d514969bd7ba459722) Thanks [@smeijer](https://github.com/smeijer)! - Add `magicbell broadcasts create` command.

  ```shell
  magicbell broadcasts create  \
    --title 'We\'re processing your order'  \
    --content '<p>Thank you for your order. We\'ll notify you when these items are ready.</p>'  \
    --category 'order_created'  \
    --topic 'order:33098'  \
    --recipients 'dan@example.com'
  ```

### Patch Changes

- Updated dependencies [[`62eae8f`](https://github.com/magicbell-io/magicbell-js/commit/62eae8f23ac7bbcdc3a600d514969bd7ba459722), [`62eae8f`](https://github.com/magicbell-io/magicbell-js/commit/62eae8f23ac7bbcdc3a600d514969bd7ba459722)]:
  - magicbell@3.0.0

## 2.2.4

### Patch Changes

- Updated dependencies [[`5c8f4c9`](https://github.com/magicbell-io/magicbell-js/commit/5c8f4c902294c68a002d55c2e3ee340ffb30758c)]:
  - magicbell@2.4.1

## 2.2.3

### Patch Changes

- Updated dependencies [[`725ab1a`](https://github.com/magicbell-io/magicbell-js/commit/725ab1ad14619341beee9d4422da9ecce27a7e7e)]:
  - magicbell@2.4.0

## 2.2.2

### Patch Changes

- Updated dependencies [[`c6054af`](https://github.com/magicbell-io/magicbell-js/commit/c6054afd4db0879b51ee4142d8295766cf983043)]:
  - magicbell@2.3.1

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
