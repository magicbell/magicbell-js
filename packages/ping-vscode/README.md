# MagicBell Ping VSCode Extension

Show GitHub notifications in VSCode.

> **Note**
>
> This package is in early alpha and is subject to change.

## Requirements

- Node 18.9 or higher
- VSCode 1.73 or higher

## Setup

Run `yarn` in the repo root to install all dependencies, and `yarn start` in to start all package builders in watch mode.

```sh
yarn
yarn start
```

Next, `cd` into `packages/ping-vscode` and run `yarn code:dev` to start vscode with this extension installed.

```sh
yarn code:dev
```

## Configuration

Open Settings in VSCode, and search for "ping". Please enter:

- Ping: **Api Key**; Your MagicBell API Key
- Ping: **User Hmac**; Your MagicBell HMAC, which is a hash based on your GitHub username and the MagicBell project secret key.
- Ping: **Username**: Your GitHub username

It might be necessary to reload the window after changing the configuration.
