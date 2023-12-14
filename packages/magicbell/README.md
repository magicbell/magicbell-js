# MagicBell Node.js/JavaScript Library

This package provides a convenient interface to query the [MagicBell](https://magicbell.com) API. Note that some methods depend on your secret key, those methods are not to be used in browsers, as your secret key must be kept secret.

## Requirements

Node 18.13 or higher.

When using older versions, you might need to polyfill `fetch`. See [isomorphic-fetch](https://npmjs.com/isomorphic-fetch) for more information.

You also might need to polyfill `eventsource` when using the `listen` method in an environment that doesn't support it. See [eventsource](https://npmjs.com/eventsource) for more information.

## Installation

Install the package with npm:

```sh
npm install magicbell --save
```

or yarn:

```sh
yarn add magicbell
```

## Usage

The package needs to be configured with your project's secret key & api key, which are
available in the [MagicBell Dashboard][dashboard].

```js
import { ProjectClient } from 'magicbell/project-client';

const magicbell = new ProjectClient({
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
});

try {
  const broadcast = await magicbell.broadcasts.create({
    title: 'Sweet!',
    content: 'When you see it, you know it!',
    recipients: [{ email: 'customer@example.com' }],
  });
  console.log(broadcast.id);
} catch (error) {
  console.error(error);
}
```

## Documentation

Please see the [MagicBell documentation](https://magicbell.com/docs/libraries/javascript) for more information about this SDK.
