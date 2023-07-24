---
'magicbell': minor
---

Remove [EventSource](https://www.npmjs.com/package/eventsource) polyfill to avoid bundling it in the browser SDKs. If you're using the `listen` methods in an environment that does not support `eventsource`, you'll need to include the polyfill yourself.
