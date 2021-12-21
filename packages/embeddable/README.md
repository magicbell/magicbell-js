# MagicBell Notification Inbox

This package contains a notification inbox for your site powered by [MagicBell](https://magicbell.com).

## Quick Start

```sh
npm i @magicbell/embeddable
# or
yarn add @magicbell/embeddable
```

```html
<div id="notifications"></div>
<script>
  // prettier-ignore
  (function(i,s,o,g,r,a,m) {i['MagicBellObject'] = r;(i[r] =i[r] ||function() {
      (i[r].q = i[r].q || []).push(arguments);}),(i[r].l = 1 * new Date());(a = s.createElement(o)), (
      m = s.getElementsByTagName(o)[0]);a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
      })(window, document, 'script', window.location.href + 'magicbell.min.js', 'magicbell');

  magicbell('render', document.getElementById('#notifications'), {
    apiKey: 'MAGICBELL_API_KEY',
    userEmail: 'USER_EMAIL',
  });
</script>
```
