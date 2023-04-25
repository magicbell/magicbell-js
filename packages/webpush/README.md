# MagicBell WebPush Library

This package provides a convenient interface to subscribe to browser/web push notifications using [MagicBell](https://magicbell.com).

## Installation

Install the package with npm:

```sh
npm install @magicbell/webpush --save
```

or yarn:

```sh
yarn add @magicbell/webpush
```

## Usage

```js
import { subscribe } from '@magicbell/webpush';

subscribe({
  token: 'jwt-token',
  host: 'https://api.magicbell.com',
});
```

### Options

**token** _String_

The JWT token you received from the MagicBell API. This token is used to authenticate the request.

**host** _String_

Optional. The host of the MagicBell API. Defaults to `https://api.magicbell.com`.

## Support

New features and bug fixes are released on the latest major version of the `magicbell` package. If you are on an older major version, we recommend that you upgrade to the latest in order to use the new features and bug fixes including those for security vulnerabilities. Older major versions of the package will continue to be available for use, but will not be receiving any updates.

## Credits

Credit where credits due, this package is inspired by and based on the [Stripe Node.js SDK](https://github.com/stripe/stripe-node).

[dashboard]: https://app.magicbell.com
[idempotent-requests]: https://www.magicbell.com/docs/rest-api/idempotent-requests
[hmac-authentication]: https://www.magicbell.com/docs/hmac-authentication
[api-reference]: https://www.magicbell.com/docs/rest-api/reference
