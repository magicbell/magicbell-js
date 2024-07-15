---
'@magicbell/in-app': minor
---

This adds the `@magicbell/in-app` package, a component library for web browsers, which focuses on the MagicBell v2 API.

Note that these are native web components. Frameworks that do not support web components on the server side need to be instructed to render the components on the client only.

```astro
---
import '@magicbell/in-app/css/core.css';
import '@magicbell/in-app/css/theme.css';
import '@magicbell/in-app/components/mb-webpush-button.js';
---

<mb-webpush-button access-token="{USER_AUTH_TOKEN}">subscribe</mb-webpush-button>
```
