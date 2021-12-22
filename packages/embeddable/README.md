# MagicBell Notification Inbox

This package contains a notification inbox for your site powered by [MagicBell](https://magicbell.com).

## Quick Start

```sh
npm i @magicbell/embeddable
# or
yarn add @magicbell/embeddable
```

```html
<div id="notifications-inbox" />
<script type="module">
  import { renderWidget } from '@magicbell/embeddable';

  let targetEl = document.getElementById('notifications-inbox');
  let options = {
    apiKey: MAGICBELL_API_KEY,
    userEmail: CURRENT_USER_EMAIL,
    height: 500,
  };

  renderWidget(targetEl, options);
</script>
```
