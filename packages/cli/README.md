# MagicBell CLI

This package provides a convenient interface to query the [MagicBell](https://magicbell.com) API. Note that as some methods depend on the project's secret key.

## Requirements

Node 14 or higher.

## Installation

Install the package with npm:

```sh
npm install -g @magicbell/cli
```

or yarn:

```sh
yarn global add @magicbell/cli
```

## Usage

The app needs to be configured with your project's secret key & api key, which are
available in the [MagicBell Dashboard][dashboard].

```shell
magicbell config set --api-key {your-api-key} --secret-key {your-secret-key}
```

Some commands, like `notifications list` are user oriented, and require the `user-email` option to be set. 

```shell
magicbell config set --user-email {your-email-key}
```

## Support

New features and bug fixes are released on the latest major version of the `@magicbell/cli` package. If you are on an older major version, we recommend that you upgrade to the latest in order to use the new features and bug fixes including those for security vulnerabilities. Older major versions of the package will continue to be available for use, but will not be receiving any updates.

[dashboard]: https://app.magicbell.com
[idempotent-requests]: https://www.magicbell.com/docs/rest-api/idempotent-requests
[hmac-authentication]: https://www.magicbell.com/docs/hmac-authentication
[api-reference]: https://www.magicbell.com/docs/rest-api/reference
