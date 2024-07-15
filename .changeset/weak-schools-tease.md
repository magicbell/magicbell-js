---
'@magicbell/inapp': minor
---

This adds the `@magicbell/in-app` package, a component library for web browsers, which focuses on the MagicBell v2 API.

Note that these are native web components. Frameworks that do not support web components on the server side need to be instructed to render the components on the client only.

```astro
---
import '@magicbell/inapp/css/core.css';
import '@magicbell/inapp/css/theme.css';
import '@magicbell/inapp/components/mb-webpush-button.js';
---

<mb-webpush-button access-token="{USER_AUTH_TOKEN}">subscribe</mb-webpush-button>
```
