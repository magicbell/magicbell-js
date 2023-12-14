[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![minified](https://badgen.net/bundlephobia/min/@magicbell/react-headless@latest)](https://bundlephobia.com/result?p=@magicbell/react-headless)
[![minified + gzip](https://badgen.net/bundlephobia/minzip/@magicbell/react-headless@latest)](https://bundlephobia.com/result?p=@magicbell/react-headless)
[![npm version](https://badgen.net/npm/v/@magicbell/react-headless)](https://www.npmjs.com/package/@magicbell/react-headless)

# React headless components for MagicBell

This package contains React headless components and hooks to build a
notification inbox for your site powered by [MagicBell](https://magicbell.com).

## Quick Start

```shell
npm i @magicbell/react-headless
```

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { MagicBellProvider } from '@magicbell/react-headless';

ReactDOM.render(
  <MagicBellProvider apiKey={MAGICBELL_API_KEY} userEmail="john@example.com">
    <App />
  </MagicBellProvider>,
  document.body,
);
```

## Documentation

Please see the [MagicBell documentation](https://magicbell.com/docs/libraries/react-headless) for more information about this SDK.
