# MagicBell Notification Inbox

This package contains a notification inbox for your site powered by [MagicBell](https://magicbell.com).

> **Note**
>
> Don't use this package when you're using React. Use [@magicbell/magicbell-react](https://github.com/magicbell-io/magicbell-js/tree/main/packages/react) or [@magicbell/react-headless](https://github.com/magicbell-io/magicbell-js/tree/main/packages/react-headless) instead.

## Quick Start

```sh
npm i @magicbell/embeddable
```

```html
<div id="notifications-inbox" />

<script type="module">
  import { renderWidget } from '@magicbell/embeddable';

  const targetElement = document.getElementById('notifications-inbox');
  const options = {
    apiKey: MAGICBELL_API_KEY,
    userEmail: CURRENT_USER_EMAIL,
    height: 500,
  };

  renderWidget(targetElement, options);
</script>
```

## Documentation

Please see the [MagicBell documentation](https://magicbell.com/docs/sdks/embeddable) for more information about this SDK.
