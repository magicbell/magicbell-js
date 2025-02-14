# magicbell

## 4.2.0

### Minor Changes

- [#459](https://github.com/magicbell/magicbell-js/pull/459) [`6688f1c`](https://github.com/magicbell/magicbell-js/commit/6688f1ced10daa74d4953042fe7de12554d88156) Thanks [@MagicBella](https://github.com/MagicBella)! - Automatic minor version bump for changes in `magicbell`.

## 4.1.0

### Minor Changes

- [#376](https://github.com/magicbell/magicbell-js/pull/376) [`71815e7`](https://github.com/magicbell/magicbell-js/commit/71815e770145bbd1efc81b041f6d5d6a968033dc) Thanks [@smeijer](https://github.com/smeijer)! - publish proper cjs and esm type definitions

## 4.0.0

### Major Changes

- [#361](https://github.com/magicbell/magicbell-js/pull/361) [`e5027a8`](https://github.com/magicbell/magicbell-js/commit/e5027a817d7e85d3291099e4df93bd5b409be44b) Thanks [@smeijer](https://github.com/smeijer)! - **Breaking Change**!

  We've renamed the `categories` property to `category` and the `topics` property to `topic`, to reflect that these properties only support a single value. We haven't been supporting multiple categories or topics for a while now, and believe that renaming this property is the right thing to do. It requires a small change on your end, but the clear naming reduces the number of potential bugs caused by misunderstanding.

  If you use `topics` or `categories` filters in the `UserClient`, you'll need to update those params to their singular variant.

  ```diff
  import { UserClient } from 'magicbell/user-client';

  const magicbell = new UserClient({
    apiKey: 'your-api-key',
    userEmail: 'you@example.com',
  });

  const notifications = await magicbell.notifications.list({
  -  categories: ['billing'],
  +  category: 'billing',
  -  topics: ['invoice-1'],
  +  topic: 'invoice-1',
  });
  ```

### Minor Changes

- [#360](https://github.com/magicbell/magicbell-js/pull/360) [`95bd18d`](https://github.com/magicbell/magicbell-js/commit/95bd18dd99be576321a947cacad407679501385a) Thanks [@smeijer](https://github.com/smeijer)! - Auth tokens are now prioritized over api keys.

- [#349](https://github.com/magicbell/magicbell-js/pull/349) [`13e54bc`](https://github.com/magicbell/magicbell-js/commit/13e54bcea17510814685c32bc6cd0f6f34b360d6) Thanks [@smeijer](https://github.com/smeijer)! - define more notification delivery statuses, added `skipped`, `dropped`, `failed`, and `delivered`.

### Patch Changes

- [#348](https://github.com/magicbell/magicbell-js/pull/348) [`39832a3`](https://github.com/magicbell/magicbell-js/commit/39832a3f5d35ee4c3aba7b0788a7cfc893c07b08) Thanks [@smeijer](https://github.com/smeijer)! - removed function to delete push subscriptions, as it doesn't exist on our v1 (current) api.

## 3.3.0

### Minor Changes

- [#319](https://github.com/magicbell/magicbell-js/pull/319) [`e439f60`](https://github.com/magicbell/magicbell-js/commit/e439f60567e987d692eebea503ba2569ab94f54a) Thanks [@smeijer](https://github.com/smeijer)! - Add support for token based authorization.

### Patch Changes

- [#320](https://github.com/magicbell/magicbell-js/pull/320) [`2e3e7de`](https://github.com/magicbell/magicbell-js/commit/2e3e7de2ac9b29b0cec91db31b6164d299d431ca) Thanks [@smeijer](https://github.com/smeijer)! - We now only include the `accept-version` header for endpoints that consume it.

## 3.2.1

### Patch Changes

- [#311](https://github.com/magicbell/magicbell-js/pull/311) [`eb8e699`](https://github.com/magicbell/magicbell-js/commit/eb8e699d5c9402924368d39fa917978fac24637c) Thanks [@smeijer](https://github.com/smeijer)! - update repository in package.json

## 3.2.0

### Minor Changes

- [#297](https://github.com/magicbell/magicbell-js/pull/297) [`feb3dd6`](https://github.com/magicbell/magicbell-js/commit/feb3dd69260d58e7ec0afa2c59b9466cfdfa7101) Thanks [@smeijer](https://github.com/smeijer)! - add description to recipients field

## 3.1.4

### Patch Changes

- [#281](https://github.com/magicbell/magicbell-js/pull/281) [`c16e604`](https://github.com/magicbell/magicbell-js/commit/c16e6040dfe8268f41a592c50a4c1aa2caad7189) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `json-schema-to-ts` to `3.1.0`.

## 3.1.3

### Patch Changes

- [#265](https://github.com/magicbell/magicbell-js/pull/265) [`3982658`](https://github.com/magicbell/magicbell-js/commit/3982658e38647dccf8e8d1e2c39b44844df74e60) Thanks [@smeijer](https://github.com/smeijer)! - Don't mix headers for different authentication scopes.

## 3.1.2

### Patch Changes

- [#259](https://github.com/magicbell/magicbell-js/pull/259) [`30ed933`](https://github.com/magicbell/magicbell-js/commit/30ed93388b2b5018bd0224892be69028a7632245) Thanks [@smeijer](https://github.com/smeijer)! - Only include `user-email` header when no `external-id` is provided

## 3.1.1

### Patch Changes

- [#242](https://github.com/magicbell/magicbell-js/pull/242) [`840263b`](https://github.com/magicbell/magicbell-js/commit/840263bd2921abc46d62732d5188c71a9fecf675) Thanks [@smeijer](https://github.com/smeijer)! - use `eventSource.addEventListener` instead of `eventSource.onmessage` to maximize compatibility with different environments.

- [`aee799d`](https://github.com/magicbell/magicbell-js/commit/aee799deebd15f904153cbc4a7c3ff5dca9accc4) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `json-schema-to-ts` to `2.12.0`.

## 3.1.0

### Minor Changes

- [#233](https://github.com/magicbell/magicbell-js/pull/233) [`8bee76e`](https://github.com/magicbell/magicbell-js/commit/8bee76eff4f35a55c5b50e25c0f143bd49c5ae3e) Thanks [@smeijer](https://github.com/smeijer)! - Add support for nested paths in `host` option.

  ```ts
  import { ProjectClient } from 'magicbell/project-client';

  const magicbell = new ProjectClient({
    apiKey: 'your-api-key',
    apiSecret: 'your-api-secret',
    host: 'https://example.com/api/mocks/magicbell',
  });
  ```

### Patch Changes

- [`1041cdf`](https://github.com/magicbell/magicbell-js/commit/1041cdf10f7ae87413ca5c00236d8a9ac8d33183) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `json-schema-to-ts` to `2.9.2`.

## 3.0.1

### Patch Changes

- [`1ed7ce5`](https://github.com/magicbell/magicbell-js/commit/1ed7ce52f27569e06878d6fcac42531055b57fc1) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `@size-limit/preset-small-lib` to `^8.2.6`.

- [`5a3443f`](https://github.com/magicbell/magicbell-js/commit/5a3443f814323352b35eab36d87dbf9e3aa1cba0) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `openapi-types` to `^12.1.3`.

- [`33d2cab`](https://github.com/magicbell/magicbell-js/commit/33d2cabca427e4ea9bc00b2e6304b57d6b7191f6) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `tsx` to `^3.14.0`.

- [#222](https://github.com/magicbell/magicbell-js/pull/222) [`444e653`](https://github.com/magicbell/magicbell-js/commit/444e653a435255d5ffcd10257f595cf496e3d1c8) Thanks [@renovate](https://github.com/apps/renovate)! - Updated dependencies:

  - updated `recast` to `^0.23.4`.

## 3.0.0

### Major Changes

- [#208](https://github.com/magicbell/magicbell-js/pull/208) [`62eae8f`](https://github.com/magicbell/magicbell-js/commit/62eae8f23ac7bbcdc3a600d514969bd7ba459722) Thanks [@smeijer](https://github.com/smeijer)! - We've removed `magicbell.notifications.create`, please use `magicbell.broadcasts.create` instead.

### Minor Changes

- [#208](https://github.com/magicbell/magicbell-js/pull/208) [`62eae8f`](https://github.com/magicbell/magicbell-js/commit/62eae8f23ac7bbcdc3a600d514969bd7ba459722) Thanks [@smeijer](https://github.com/smeijer)! - Add `broadcasts.create` method to the project client.

  ```js
  await magicbell.broadcasts.create({
    title: "We're processing your order",
    content: "<p>Thank you for your order. We'll notify you when these items are ready.</p>",
    category: 'order_created',
    topic: 'order:33098',
    recipients: [
      {
        email: 'dan@example.com',
      },
      {
        external_id: '83d987a-83fd034',
        first_name: 'Person',
        last_name: 'Doe',
        custom_attributes: {
          plan: 'enterprise',
          pricing_version: 'v10',
          preferred_pronoun: 'They',
        },
        phone_numbers: ['+1 5005550001'],
      },
    ],
  });
  ```

## 2.4.1

### Patch Changes

- [#201](https://github.com/magicbell/magicbell-js/pull/201) [`5c8f4c9`](https://github.com/magicbell/magicbell-js/commit/5c8f4c902294c68a002d55c2e3ee340ffb30758c) Thanks [@smeijer](https://github.com/smeijer)! - ensure request uses custom timeout

## 2.4.0

### Minor Changes

- [#192](https://github.com/magicbell/magicbell-js/pull/192) [`725ab1a`](https://github.com/magicbell/magicbell-js/commit/725ab1ad14619341beee9d4422da9ecce27a7e7e) Thanks [@smeijer](https://github.com/smeijer)! - Custom errors now include a `responseBody` property that holds the returned response
  from the API, when available. Custom errors are now also exported so they can be
  used with comparisons like `err instanceof MagicBellError`. Note that all errors
  extend the `MagicBellError` base class.

  They're exported from the root and `/errors`. For the sake of tree shaking, we
  recommend using the latter.

  ```ts
  import { MagicBellError, UnauthorizedError } from 'magicbell';
  import { MagicBellError, UnauthorizedError } from 'magicbell/errors';
  ```

## 2.3.1

### Patch Changes

- [#189](https://github.com/magicbell/magicbell-js/pull/189) [`c6054af`](https://github.com/magicbell/magicbell-js/commit/c6054afd4db0879b51ee4142d8295766cf983043) Thanks [@smeijer](https://github.com/smeijer)! - support react strict mode

## 2.3.0

### Minor Changes

- [#182](https://github.com/magicbell/magicbell-js/pull/182) [`3f7ab5a`](https://github.com/magicbell/magicbell-js/commit/3f7ab5a532ec5c02e7f8ff41261548c0accd78ca) Thanks [@smeijer](https://github.com/smeijer)! - move uuidv4 helper function to different file for better tree shaking

## 2.2.0

### Minor Changes

- [#173](https://github.com/magicbell/magicbell-js/pull/173) [`1f40263`](https://github.com/magicbell/magicbell-js/commit/1f40263c112dcf5a05cac3d59661c7b8ddc41858) Thanks [@smeijer](https://github.com/smeijer)! - Remove [EventSource](https://www.npmjs.com/package/eventsource) polyfill to avoid bundling it in the browser SDKs. If you're using the `listen` methods in an environment that does not support `eventsource`, you'll need to include the polyfill yourself.

## 2.1.0

### Minor Changes

- [#171](https://github.com/magicbell/magicbell-js/pull/171) [`666d2bb`](https://github.com/magicbell/magicbell-js/commit/666d2bbefe2365b6691607a38514d51d302e8248) Thanks [@smeijer](https://github.com/smeijer)! - We've added a method to the `UserClient` to list the registered push notifications for the authenticated user.

  ```js
  const magicbell = new UserClient({ ... });
  await magicbell.pushSubscriptions.list();
  ```

  This method returns the same data as `users.pushSubscriptions.list` on the `Projectclient`, but using user credentials instead of the secret key. Thereby, it's safe to use this method on the frontend to offer a way to the user to manage their push subscriptions.

### Patch Changes

- [#165](https://github.com/magicbell/magicbell-js/pull/165) [`998008a`](https://github.com/magicbell/magicbell-js/commit/998008a04f40833954ec9a47bfe447989f7079aa) Thanks [@smeijer](https://github.com/smeijer)! - Optional client options can now be `undefined` or `null`, rather than enforced to be absent. This eases initialization where options come from other configuration sources.

  ```ts
  const client = new UserClient({
    apiKey: '...',
    userEmail: 'person@example.com',
    userExternalId: undefined, // no longer throws
  });
  ```

- [#172](https://github.com/magicbell/magicbell-js/pull/172) [`24c00f4`](https://github.com/magicbell/magicbell-js/commit/24c00f400f571ab0518f3ece7601f99360f85f68) Thanks [@smeijer](https://github.com/smeijer)! - Fixed a few misconfigured types:

  - import `status` is now an enum with the values `enqueued | processing | processed`
  - import `failures` now has the users array items typed as `object` with the properties `email` and `external_id` and `errors`
  - the `total` and `total_pages` props are removed from the `users.pushSubscriptions.list` response.

- [#165](https://github.com/magicbell/magicbell-js/pull/165) [`998008a`](https://github.com/magicbell/magicbell-js/commit/998008a04f40833954ec9a47bfe447989f7079aa) Thanks [@smeijer](https://github.com/smeijer)! - The EventSource polyfill is now only applied when the `EventSource` is not supported in your environment.

- [#165](https://github.com/magicbell/magicbell-js/pull/165) [`998008a`](https://github.com/magicbell/magicbell-js/commit/998008a04f40833954ec9a47bfe447989f7079aa) Thanks [@smeijer](https://github.com/smeijer)! - A bug where the eventsource was closed before opened is now fixed. This race condition occurred when closing the stream while the token request was still pending.

- [#168](https://github.com/magicbell/magicbell-js/pull/168) [`ce6ecc2`](https://github.com/magicbell/magicbell-js/commit/ce6ecc2cb207effe9755ea1883f696dcf5d5aad5) Thanks [@smeijer](https://github.com/smeijer)! - don't throw on empty response

## 2.0.2

### Patch Changes

- [#161](https://github.com/magicbell/magicbell-js/pull/161) [`4ef2b07`](https://github.com/magicbell/magicbell-js/commit/4ef2b07e31922ebe83a443b1732390b79b7af141) Thanks [@smeijer](https://github.com/smeijer)! - Use a fork of ky that includes commonjs support

## 2.0.1

### Patch Changes

- [#156](https://github.com/magicbell/magicbell-js/pull/156) [`16016dc`](https://github.com/magicbell/magicbell-js/commit/16016dc5d3cd69d86c28e3e9920fe8e41e123406) Thanks [@smeijer](https://github.com/smeijer)! - declare exports in package.json

## 2.0.0

### Major Changes

- [#154](https://github.com/magicbell/magicbell-js/pull/154) [`da22233`](https://github.com/magicbell/magicbell-js/commit/da22233fca83398cc33e4732172eebde96ad1140) Thanks [@smeijer](https://github.com/smeijer)! - **Breaking Changes** - please read carefully.

  We've separated the project from user resources. There are now two API clients exposed that can be used independently. A `ProjectClient` and a `UserClient`.

  **Project Client**

  The `ProjectClient` provides access to all our API endpoints that require the api secret key. It's the same client as in v1, but with all user scoped endpoints removed.

  In most cases, you'll only have to change the import statements to use the new client.

  ```diff
  - import { Client } from 'magicbell';
  + import { ProjectClient } from 'magicbell/project-client';

  - const magicbell = new Client({
  + const magicbell = new ProjectClient({
    apiKey: 'your-api-key', // required
    apiSecret: 'your-secret-key', // required
  });

  magicbell.users.list();
  ```

  **User Client**

  The `UserClient` provides access to all our API endpoints that require the user email or user external id. As the user client only supports user scoped APIs and does not require or accept the api secret key, it's safe to use in the browser.

  If you've used the client scoped resources before, you'll have to migrate those calls to the user client. Note that if you provided the `apiSecret` to the old client, you'll have to remove it from the new one. User credentials are now provided in the constructor, and no longer overridable on a per request basis.

  ```diff
  - import { Client } from 'magicbell';
  + import { UserClient } from 'magicbell/user-client';

  - const magicbell = new Client({
  + const magicbell = new UserClient({
    apiKey: 'your-api-key', // required
  - apiSecret: 'your-secret-key',
  + userEmail: 'you@example.com', // required if userExternalId is not set
  + userExternalId: 'your-external-id', // required if userEmail is not set
  + userHmac: 'your-user-hmac', // required if HMAC is enabled
  });

  magicbell.notifications.list();
  ```

  **User HMAC**

  As the `UserClient` does not have access to your api secret key, `userHmac` keys are no longer automatically generated. You'll have to generate them yourself and provide them to the client. This is a necessary change to make the client safe to use in the browser without exposing your api secret key.

  We've exported a `createHmac` util for you to generate the HMAC keys. You can use it in your backend to generate the HMAC keys.

  ```js
  import { createHmac } from 'magicbell/crypto';

  const userHmac = createHmac(process.env.MAGICBELL_API_KEY, user);
  ```

  We've made the `createHmac` util as flexible as possible. It accepts MagicBell user objects with properties as `userEmail` and/or `userExternalId`, as well as objects with `id`, `_id`, or `email` properties. When providing the `id`, we assume that it maps to our `userExternalId`. If none of those properties work for you, it's possible to provide a string as second argument.

  ```js
  // these are all supported and the same
  const userHmac = createHmac('secret-key', 'value');
  const userHmac = createHmac('secret-key', { userExternalId: 'value' });
  const userHmac = createHmac('secret-key', { userEmail: 'value' });
  const userHmac = createHmac('secret-key', { id: 'value' });
  const userHmac = createHmac('secret-key', { _id: 'value' });
  const userHmac = createHmac('secret-key', { email: 'value' });
  ```

- [#152](https://github.com/magicbell/magicbell-js/pull/152) [`035b9e8`](https://github.com/magicbell/magicbell-js/commit/035b9e851951379dbea82dbc2380d6e9d500198a) Thanks [@smeijer](https://github.com/smeijer)! - We're now using [ky] instead of [axios] for making HTTP requests. This is a breaking change, as ky is build around the fetch module. Fetch is natively supported in all modern browsers, and is also available in Node.js since version 18.13.0.

  If you're using an older version of node, we recommend you to upgrade to the latest LTS version. Alternatively, include a fetch polyfill such as [isomorphic-fetch].

  [axios]: https://npmjs.com/axios
  [ky]: https://npmjs.com/ky
  [isomorphic-fetch]: https://npmjs.com/isomorphic-fetch

### Minor Changes

- [#152](https://github.com/magicbell/magicbell-js/pull/152) [`035b9e8`](https://github.com/magicbell/magicbell-js/commit/035b9e851951379dbea82dbc2380d6e9d500198a) Thanks [@smeijer](https://github.com/smeijer)! - The magicbell client now supports lifecycle hooks. This way you can add custom logic to the client when certain events occur. For example to add logging, or to wrap requests with timing information.

  Your hooks will be passed directly to ky, so please see [ky/hooks] for more information.

  ```js
  const magicbell = new Client({
    hooks: {
      beforeRequest: [(request) => {}],
      beforeRetry: [(request, options, error, retryCount) => {}],
      beforeError: [(error) => error],
      afterResponse: [(request, options, response) => response],
    },
  });
  ```

  [ky/hooks]: https://github.com/sindresorhus/ky#hooks

- [#152](https://github.com/magicbell/magicbell-js/pull/152) [`035b9e8`](https://github.com/magicbell/magicbell-js/commit/035b9e851951379dbea82dbc2380d6e9d500198a) Thanks [@smeijer](https://github.com/smeijer)! - We now use [debug] for logging, and have dropped support for the `debug` property that could be provided to `Client`. Debugging can be enabled via the `DEBUG` environment variable.

  We're using the namespaces `magicbell:debug`, `magicbell:log` and `magicbell:error`.

  ```shell
  DEBUG=magicbell:* node my-app.js
  DEBUG=magicbell:debug node my-app.js
  ```

  [debug]: https://npmjs.com/debug

## 1.8.0

### Minor Changes

- [#131](https://github.com/magicbell/magicbell-js/pull/131) [`ac58966`](https://github.com/magicbell/magicbell-js/commit/ac589661e0035aca4345c7d10dfed9f53028188a) Thanks [@smeijer](https://github.com/smeijer)! - Added a `users.notifications` resource which can be used to iterate notifications for a given user.

  ```ts
  const notifications = magicbell.users.notifications.list(userId, { per_page: 10 });

  for await (const notification of notifications) {
    console.log(notification.title);
  }
  ```

- [#134](https://github.com/magicbell/magicbell-js/pull/134) [`66dae2e`](https://github.com/magicbell/magicbell-js/commit/66dae2ee1fb2a6cb043b8160f918dc1be1c0e0b7) Thanks [@smeijer](https://github.com/smeijer)! - Added the `metrics` resource. The metrics resource contains a collection of endpoints that return metrics about the sent Notifications. All metrics are for the last 30 days. The following endpoints are available:

  ```ts
  const notificationCounts = await magicbell.metrics.get();

  const countsPerCategory = await magicbell.metrics.categories.get();

  const countsPerTopic = await magicbell.metrics.topics.get();
  ```

- [#136](https://github.com/magicbell/magicbell-js/pull/136) [`0e08df7`](https://github.com/magicbell/magicbell-js/commit/0e08df7a8fc7c36f44aa7f83101673c72f6d12f6) Thanks [@smeijer](https://github.com/smeijer)! - Release the [users.pushSubscriptions resource](https://www.magicbell.com/docs/rest-api/reference#fetch-user's-push-subscriptions) as stable. This includes the following apis:

  **Fetch user's push subscriptions**

  Fetch a user's push subscriptions. Returns a paginated list of web and mobile push subscriptions for all platforms.

  ```js
  await magicbell.users.pushSubscriptions.list('{user_id}', {
    page: 1,
    per_page: 1,
  });
  ```

  **Delete user's push subscription**

  Delete a user's push subscriptions. Identifies the user by the user's ID and the push subscription by the subscription's ID.

  ```js
  await magicbell.users.pushSubscriptions.delete('{user_id}', '{subscription_id}');
  ```

- [#138](https://github.com/magicbell/magicbell-js/pull/138) [`18e0e49`](https://github.com/magicbell/magicbell-js/commit/18e0e497d52f8a70b474983b1d7d330e2400aa16) Thanks [@smeijer](https://github.com/smeijer)! - Release the [imports resource](https://www.magicbell.com/docs/rest-api/reference#imports-create) as stable. This includes the following apis:

  **Create a import**

  Enqueues an import - currently only supported for users.

  ```js
  await magicbell.imports.create({
    users: [
      {
        external_id: 'ugiabqertz',
        email: 'johndoe@example.com',
        first_name: 'John',
        last_name: 'Doe',
        custom_attributes: {
          age: 32,
          country: 'Spain',
        },
      },
    ],
  });
  ```

  **Get the status of an import**

  Query the status of the import for a summary of imported records and failures for each record that could not be imported successfully.

  ```js
  await magicbell.imports.get('{import_id}');
  ```

- [#130](https://github.com/magicbell/magicbell-js/pull/130) [`0491ba2`](https://github.com/magicbell/magicbell-js/commit/0491ba255b4010f91944cecde639fb14c100a6b7) Thanks [@smeijer](https://github.com/smeijer)! - Added support for per-request header overrides

  ```js
  const magicbell = new Client({
    headers: {
      'x-custom-header-one': 'one',
    },
  });

  await client.request({
    path: '/me',
    headers: {
      'x-custom-header-two': 'two',
    },
  });

  // request is made using the following headers:
  //   x-custom-header-one: one
  //   x-custom-header-two: two
  ```

- [#135](https://github.com/magicbell/magicbell-js/pull/135) [`7038d80`](https://github.com/magicbell/magicbell-js/commit/7038d80e619cfd8a9c7b06bcc5a111452a0dc203) Thanks [@smeijer](https://github.com/smeijer)! - Release [broadcasts resource](https://www.magicbell.com/docs/rest-api/reference#list-notification-broadcasts) as stable. This includes the following apis:

  **List notification broadcasts**

  ```js
  await magicbell.broadcasts.list({
    page: 1,
    per_page: 1,
  });
  ```

  **Fetch a notification broadcast by its ID**

  ```js
  await magicbell.broadcasts.get('{broadcast_id}');
  ```

  **Fetch notifications by broadcast id.**

  ```js
  await magicbell.broadcasts.notifications.list('{broadcast_id}', {
    page: 1,
    per_page: 1,
  });
  ```

## 1.7.2

### Patch Changes

- [`e78af04`](https://github.com/magicbell/magicbell-js/commit/e78af04eb97aebffe8fa41e088890364cb5367ad) Thanks [@renovate[bot]](https://github.com/renovate%5Bbot%5D)! - Updated dependencies:

  - updated `json5` to `^2.2.3`.

## 1.7.1

### Patch Changes

- [#97](https://github.com/magicbell/magicbell-js/pull/97) [`9af0890`](https://github.com/magicbell/magicbell-js/commit/9af0890bae5668f24e69ef167aea5dfa413cede9) Thanks [@smeijer](https://github.com/smeijer)! - fix: correct response type for `users.list()` by renaming `user` prop to `users`.

## 1.7.0

### Minor Changes

- [#95](https://github.com/magicbell/magicbell-js/pull/95) [`87b781b`](https://github.com/magicbell/magicbell-js/commit/87b781be77fd66d89ae46567d0f8a5788acd588e) Thanks [@smeijer](https://github.com/smeijer)! - The `total` and `total_pages` props are removed from the following method return types:

  - `magicbell.broadcasts.list()`
  - `magicbell.broadcasts.notifications.list()`
  - `magicbell.users.list()`

  The [auto pagination](https://github.com/magicbell/magicbell-js/tree/main/packages/magicbell#using-promises) methods are updated to support the paginated responses that do not have those fields. Thereby, pagination helpers like `.list().forEach()`, `.list().toArray()` and the iterator in `for await (const node of method.list())` keep working as before.

## 1.6.0

### Minor Changes

- [#90](https://github.com/magicbell/magicbell-js/pull/90) [`ea0a9ca`](https://github.com/magicbell/magicbell-js/commit/ea0a9ca456cb9c82f6e6d4b9d0add512bce22a0e) Thanks [@smeijer](https://github.com/smeijer)! - update broadcast > notification response schema to include the fields:

  - `created_at`; datetime when notification was created
  - `updated_at`; datetime when notification was last updated
  - `seen_at`; datetime when notification was first seen
  - `read_at`; datetime when notification was first read
  - `status`; enum showing current state, current values: `unseen`, `unread`, `read`, `archived`

  Further changes are:

  - `recipient`; is marked as non-nullable
  - `deliveries`; is marked as non-nullable

- [#92](https://github.com/magicbell/magicbell-js/pull/92) [`530476e`](https://github.com/magicbell/magicbell-js/commit/530476e3d8f79c8c5176661316d2cdb46e424236) Thanks [@smeijer](https://github.com/smeijer)! - Rename `users.fetch` to `users.get`. Tho it's in theory a breaking change, the users api is relatively new, and the convention in this sdk is to use `get` for single entity retrieval, and not `fetch`. So we're going with a `minor` instead to get this fixed.

## 1.5.0

### Minor Changes

- [#83](https://github.com/magicbell/magicbell-js/pull/83) [`94cbb92`](https://github.com/magicbell/magicbell-js/commit/94cbb927bbc88791100dbb10c5be519d1f598a72) Thanks [@smeijer](https://github.com/smeijer)! - feat: add broadcasts.list method to the client.

  ```ts
  const broadcasts = magicbell.broadcasts.list({ per_page: 10 });

  await broadcasts.forEach((broadcast) => {
    console.log(broadcast.id);
  });
  ```

- [#84](https://github.com/magicbell/magicbell-js/pull/84) [`b0a809d`](https://github.com/magicbell/magicbell-js/commit/b0a809db0fbc074a5a10b011bc84561285def6c4) Thanks [@smeijer](https://github.com/smeijer)! - feat: add `broadcasts.get` method to the client.

  ```ts
  const broadcasts = await magicbell.broadcasts.get(broadcastId);
  console.log(broadcast.id);
  ```

- [#86](https://github.com/magicbell/magicbell-js/pull/86) [`073e3f8`](https://github.com/magicbell/magicbell-js/commit/073e3f840932ccad8a63ba390c1ebaf59e95903e) Thanks [@smeijer](https://github.com/smeijer)! - feat: add `broadcasts.notifications.list` method to the client.

  ```ts
  const notifications = magicbell.broadcasts.notifications.list(broadcastId, { per_page: 10 });

  await notifications.forEach((notification) => {
    console.log(notification.id);
  });
  ```

- [#87](https://github.com/magicbell/magicbell-js/pull/87) [`f0ec9a5`](https://github.com/magicbell/magicbell-js/commit/f0ec9a5258d2053a0f9d87108308808b6f1f1411) Thanks [@smeijer](https://github.com/smeijer)! - Update schemas for broadcast methods.

  - dropped `broadcast.recipients_count`, use `broadcast.status.summary.total` instead.
  - broadcast notification `status` is now an enum string.
  - changed `sent_at` timestamps to be iso-strings.
  - added `created_at` to broadcast.
  - added `title` to broadcast notification

## 1.4.4

### Patch Changes

- [#76](https://github.com/magicbell/magicbell-js/pull/76) [`fe450c8`](https://github.com/magicbell/magicbell-js/commit/fe450c884900e1d42b8ae868710742c2fea61256) Thanks [@smeijer](https://github.com/smeijer)! - Feature flags are now typed, making it easier to enable beta features, and harder to forget removing flags when beta features turned stable.

- [#77](https://github.com/magicbell/magicbell-js/pull/77) [`9f4be9a`](https://github.com/magicbell/magicbell-js/commit/9f4be9ace0123ce8de710b8af4683d5a3c0b27fe) Thanks [@smeijer](https://github.com/smeijer)! - return the full response data from users.push_subscriptions.list()

## 1.4.3

### Patch Changes

- [#75](https://github.com/magicbell/magicbell-js/pull/75) [`14c30fe`](https://github.com/magicbell/magicbell-js/commit/14c30fe7855adf55096f4a9f8a63f1f4240f6dac) Thanks [@smeijer](https://github.com/smeijer)! - fix: handle network level request errors

## 1.4.2

### Patch Changes

- [#70](https://github.com/magicbell/magicbell-js/pull/70) [`3590285`](https://github.com/magicbell/magicbell-js/commit/3590285471b80559f20308e2bbccfd244f6682fa) Thanks [@smeijer](https://github.com/smeijer)! - fix: add types for listener close method

## 1.4.1

### Patch Changes

- [#68](https://github.com/magicbell/magicbell-js/pull/68) [`8ae8b38`](https://github.com/magicbell/magicbell-js/commit/8ae8b38189171188f78b767f63f4e34583abd6fb) Thanks [@smeijer](https://github.com/smeijer)! - fix typescript issue that showed arguments in camelCase vs snake_case.

## 1.4.0

### Minor Changes

- [#59](https://github.com/magicbell/magicbell-js/pull/59) [`6d7e434`](https://github.com/magicbell/magicbell-js/commit/6d7e4343d997ee845ad54b41cb9ca1171019764b) Thanks [@unamashana](https://github.com/unamashana)!
  - remove beta flag from `pushSubscriptions`
  - move `imports` method behind feature flag
  - add `users.list` method to list all users
  - add `users.fetch` method to fetch a single user
  - add `users.pushSubscriptions` resource to manage users push subscriptions
  - add `users.pushSubscriptions.list` method to list all push subscriptions for a user
  - add `users.pushSubscriptions.delete` method to delete a single push subscription for a user

## 1.3.0

### Minor Changes

- [#64](https://github.com/magicbell/magicbell-js/pull/64) [`1676fd3`](https://github.com/magicbell/magicbell-js/commit/1676fd3f5a93a8a5f8dd3319f84173e6d0b9df95) Thanks [@smeijer](https://github.com/smeijer)! - feat: support custom request headers

  Custom request headers can be used to decorate requests for logs and metrics or for example to instruct proxy servers.

  ```ts
  import MagicBell from 'magicbell';

  const magicbell = new MagicBell({
    apiKey: 'my-api-key',
    headers: {
      'X-Custom-Header': 'foo',
    },
  });
  ```

## 1.2.0

### Minor Changes

- [#56](https://github.com/magicbell/magicbell-js/pull/56) [`8139792`](https://github.com/magicbell/magicbell-js/commit/81397920b118f4d3dd9bda9153f931516f9f712c) Thanks [@smeijer](https://github.com/smeijer)! - feat: add close method to realtime listener

  ```ts
  const listener = magicbell.listen();

  listener.forEach((notification) => {
    console.log(notification.data.id);
  });

  // stop listening after 5 seconds
  setTimeout(() => {
    listener.close();
  }, 5_000);
  ```

## 1.1.0

### Minor Changes

- [#39](https://github.com/magicbell/magicbell-js/pull/39) [`68b2fbd`](https://github.com/magicbell/magicbell-js/commit/68b2fbd28fc1a0ca2b182611bc62fdc56a2e3f13) Thanks [@smeijer](https://github.com/smeijer)! - Add support for usage in browsers.

  - Stop tracking `client-id`. Client id was a random token stored on the filesystem, so we could identify origins across session.
  - Don't generate HMAC if no `api-secret` is provided, or if HMAC is already provided via request options.
  - Export `createHmac`, a util that generates MagicBell compatible HMAC digests.

    ```js
    import { createHmac } from 'magicbell';
    createHmac(process.env.MAGICBELL_API_SECRET, user.email);
    ```

## 1.0.1

### Patch Changes

- [#29](https://github.com/magicbell/magicbell-js/pull/29) [`1640aef`](https://github.com/magicbell/magicbell-js/commit/1640aeff3f6158047883c999fa580202651b067b) Thanks [@smeijer](https://github.com/smeijer)! - fix: be forgiving about `undefined` arguments

## 1.0.0

### Major Changes

- [#27](https://github.com/magicbell/magicbell-js/pull/27) [`c698320`](https://github.com/magicbell/magicbell-js/commit/c69832021cba9a0686a14be22dd7f46c613b954d) Thanks [@smeijer](https://github.com/smeijer)! - improve types for `notifications`, `push-subscriptions`, `imports` and `users` resources.

## 0.3.0

### Minor Changes

- [#22](https://github.com/magicbell/magicbell-js/pull/22) [`366adc6`](https://github.com/magicbell/magicbell-js/commit/366adc6af3ee2d198f5f9ad3507deee93dd88ebb) Thanks [@smeijer](https://github.com/smeijer)! - Add the `magicbell.imports` resource to import users in bulk, and query the status of import jobs. Methods that have been made available are `magicbell.imports.create` and `magicbell.imports.get`.

  See [#imports](https://github.com/magicbell/magicbell-js/blob/main/packages/magicbell/README.md#imports) for more information.

- [#24](https://github.com/magicbell/magicbell-js/pull/24) [`6cf938c`](https://github.com/magicbell/magicbell-js/commit/6cf938c384ea4db6e3260f8c35f9af762edc48a7) Thanks [@smeijer](https://github.com/smeijer)! - Released the `.listen` method. With this method you can listen to server sent events in realtime. For example, to do something when new notifications come in, or to trigger an event when a user marks a notification as read.

  The following events are currently emitted. Please note that all events are bound to a specific user. See [#realtime](https://github.com/magicbell/magicbell-js/blob/main/packages/magicbell/README.md#realtime) for more information.

  | event.name               | description                                |
  | ------------------------ | ------------------------------------------ |
  | `notifications/new`      | a new notification has been created        |
  | `notifications/read`     | a notification has been read               |
  | `notifications/unread`   | a notification has been marked as unread   |
  | `notifications/delete`   | a notification has been deleted            |
  | `notifications/read/all` | all notifications have been marked as read |
  | `notifications/seen/all` | all notifications have been marked as seen |

- [#16](https://github.com/magicbell/magicbell-js/pull/16) [`615b2fa`](https://github.com/magicbell/magicbell-js/commit/615b2faa558c19a2a50c0cb2b67b95ad3b5e68e3) Thanks [@smeijer](https://github.com/smeijer)! - Loads the axios http adapter when `XMLHttpRequest` is unsupported. This allows `magicbell` to be used in for example vscode extensions.

  - Don't persist config if `os.homedir` is unavailable, which is for example the case in vscode extensions.
  - Add support for authentication using `x-magicbell-user-external-id` header.
  - Allow specifying the `userKey`. This allows users to use `magicbell`, without the need to provide the `apiSecret` key to generate the HMAC at runtime.

- [#25](https://github.com/magicbell/magicbell-js/pull/25) [`13ee1d2`](https://github.com/magicbell/magicbell-js/commit/13ee1d242baddc97c0eabd3bf49867c3280432c5) Thanks [@smeijer](https://github.com/smeijer)! - Add type coverage to all resource methods.

  - Payload and Response types are driven by json schemas, which are stored under `/schemas`.
  - Requests now use the `accept-version: v2` header, so we use the latest version of our preferences api.
  - Failed requests now log a curl command when `debug: true` is provided to the client.
  - Requests no longer include empty headers.
  - Requests no longer include empty wrapping entities in the body.

- [#23](https://github.com/magicbell/magicbell-js/pull/23) [`bb857a7`](https://github.com/magicbell/magicbell-js/commit/bb857a738d5abfda805fecdd1154027a8077d3ed) Thanks [@smeijer](https://github.com/smeijer)! - Add the `magicbell.pushSubscriptions` resource to manage mobile devices / push subscriptions. Methods that have been made available are `magicbell.pushSubscriptions.create` and `magicbell.pushSubscriptions.delete`. Note that these methods are currently in beta, and need to be enabled via [feature flags](https://github.com/magicbell/magicbell-js/tree/main/packages/magicbell#feature-flags).

  See [#pushSubscriptions](https://github.com/magicbell/magicbell-js/blob/main/packages/magicbell/README.md#pushSubscriptions) for more information.

## 0.2.0

### Minor Changes

- [`3c04a70`](https://github.com/magicbell/magicbell-js/commit/3c04a70972a4983b5bd07bc62c4aa7ddd2607106) Thanks [@smeijer](https://github.com/smeijer)! - rename `.retrieve()` methods to `.get()` and remove pushSubscriptions for the time being.

## 0.1.0

### Minor Changes

- [`29c4bca`](https://github.com/magicbell/magicbell-js/commit/29c4bca92847ad5975b03ab006835a2210b2842f) Thanks [@smeijer](https://github.com/smeijer)! - Added the `magicbell` package - an api wrapper for node. Please see the readme at [packages/magicbell](https://github.com/magicbell/magicbell-js/tree/main/packages/magicbell) for more.
