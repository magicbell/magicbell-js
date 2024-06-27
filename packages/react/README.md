[![codecov](https://codecov.io/gh/magicbell/magicbell-react/branch/main/graph/badge.svg?token=T3u1e0sLpC)](https://codecov.io/gh/magicbell/magicbell-react)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![minified](https://badgen.net/bundlephobia/min/@magicbell/magicbell-react@latest)](https://bundlephobia.com/result?p=@magicbell/magicbell-react)
[![minified + gzip](https://badgen.net/bundlephobia/minzip/@magicbell/magicbell-react@latest)](https://bundlephobia.com/result?p=@magicbell/magicbell-react)
[![npm version](https://badgen.net/npm/v/@magicbell/magicbell-react)](https://www.npmjs.com/package/@magicbell/magicbell-react)

# MagicBell-React

This package contains React components to build a notification inbox for your site powered by [MagicBell](https://magicbell.com).

## Quick Start

```shell
npm i @magicbell/magicbell-react
```

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import MagicBell, { FloatingNotificationInbox } from '@magicbell/magicbell-react';

ReactDOM.render(
  <MagicBell apiKey={MAGICBELL_API_KEY} userEmail="john@example.com">
    {(props) => <FloatingNotificationInbox height={300} {...props} />}
  </MagicBell>,
  document.body,
);
```

## Documentation

Please see the [MagicBell documentation](https://magicbell.com/docs/libraries/react) for more information about this SDK.
